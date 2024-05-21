use axum::{
    extract::{
        rejection::JsonRejection,
        ws::{Message, WebSocket, WebSocketUpgrade},
        Path, Query,
    },
    http::StatusCode,
    response::IntoResponse,
    routing::{get, put},
    Extension, Json, Router,
};
use axum_extra::extract::WithRejection;
use clerk_rs::{clerk::Clerk, ClerkConfiguration};
use futures_util::{SinkExt, StreamExt};
use serde::Deserialize;
use serde_json::json;
use std::{
    collections::HashMap,
    env,
    sync::{Arc, Mutex},
};
use tokio::sync::mpsc;

use crate::utils::auth::get_auth;

mod utils;

type Sender = mpsc::UnboundedSender<String>;
type ClientList = Arc<Mutex<HashMap<String, Vec<Sender>>>>;

struct APIError {
    message: String,
}

impl IntoResponse for APIError {
    fn into_response(self) -> axum::response::Response {
        println!("Error parsing JSON payload");
        (
            StatusCode::BAD_REQUEST,
            Json(json!({
                "error": "error parsing JSON",
            })),
        )
            .into_response()
    }
}

impl From<JsonRejection> for APIError {
    fn from(rejection: JsonRejection) -> Self {
        Self {
            message: format!("Invalid JSON: {:?}", rejection),
        }
    }
}

#[derive(Deserialize)]
struct UpdatePayload {
    waitlist_id: String,
    update: String,
}

#[tokio::main]
async fn main() {
    utils::env::load_env();

    let clerk_secret_key = env::var("CLERK_SECRET_KEY").expect("CLERK_SECRET_KEY not set");

    let connected_waitlists: ClientList = Arc::new(Mutex::new(HashMap::new()));
    let config: ClerkConfiguration =
        ClerkConfiguration::new(None, None, Some(clerk_secret_key), None);
    let clerk_client = Clerk::new(config.clone());

    let app = Router::new()
        .route("/:id/ws", get(ws_handler))
        .route("/receive", put(update_handler))
        .route(
            "/health",
            get(|| async {
                println!("[/health] Health check");
                "OK"
            }),
        )
        .layer(Extension(connected_waitlists))
        .layer(Extension(clerk_client));

    println!("Server running on http://localhost:9999");

    let listener = tokio::net::TcpListener::bind("0.0.0.0:9999").await.unwrap();

    let server = axum::serve(listener, app.into_make_service()).await;

    match server {
        Ok(_) => println!("Server stopped"),
        Err(e) => println!("Error: {:?}", e),
    }
}

async fn ws_handler(
    Path(id): Path<String>,
    ws: WebSocketUpgrade,
    Query(query_params): Query<HashMap<String, String>>,
    Extension(connected_waitlists): Extension<ClientList>,
    Extension(clerk_client): Extension<Clerk>,
) -> impl IntoResponse {
    let token = query_params.get("token").unwrap();

    let user_id = match get_auth(clerk_client, token).await {
        Ok(val) => val,
        Err(_) => {
            return (StatusCode::UNAUTHORIZED, "Unauthorized").into_response();
        }
    };

    println!("User ID: {:?}", user_id);

    println!(
        "[/:id/ws] WebSocket connection established for waitlist {}",
        id
    );
    ws.on_upgrade(move |socket| handle_socket(socket, id, connected_waitlists))
        .into_response()
}

async fn handle_socket(socket: WebSocket, id: String, connected_waitlists: ClientList) {
    let (sender, mut receiver) = mpsc::unbounded_channel();
    let (mut ws_sender, mut ws_receiver) = socket.split();

    {
        let mut waitlists = connected_waitlists.lock().unwrap();
        if let Some(clients) = waitlists.get_mut(&id) {
            clients.push(sender);
        } else {
            waitlists.insert(id.clone(), vec![sender]);
        }
    }

    tokio::spawn(async move {
        while let Some(message) = receiver.recv().await {
            if ws_sender.send(Message::Text(message)).await.is_err() {
                break;
            }
        }
    });

    while let Some(msg) = ws_receiver.next().await {
        match msg {
            Ok(Message::Text(text)) => println!("Received message: {}", text),
            Ok(Message::Close(_)) | Err(_) => {
                println!("Connection closed");
                break;
            }
            _ => {}
        }
    }

    let mut waitlists = connected_waitlists.lock().unwrap();
    if let Some(clients) = waitlists.get_mut(&id) {
        clients.retain(|s| !s.is_closed());
    }
}

async fn update_handler(
    Extension(connected_waitlists): Extension<ClientList>,
    WithRejection(Json(payload), _): WithRejection<Json<UpdatePayload>, APIError>,
) -> impl IntoResponse {
    println!("[/recieve]: Received update: {:?}", payload.update);
    let mut waitlists = connected_waitlists.lock().unwrap();
    if let Some(clients) = waitlists.get_mut(&payload.waitlist_id) {
        for sender in clients {
            if sender.send(payload.update.clone()).is_err() {}
        }
        (
            StatusCode::OK,
            format!("Update sent to waitlist {}", payload.waitlist_id),
        )
    } else {
        println!("Waitlist ID not found");
        (StatusCode::NOT_FOUND, "Waitlist ID not found".to_string())
    }
}
