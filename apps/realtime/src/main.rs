use axum::{
    extract::{
        ws::{Message, WebSocket, WebSocketUpgrade},
        Path,
    },
    http::StatusCode,
    response::IntoResponse,
    routing::{get, put},
    Extension, Json, Router,
};
use futures_util::{SinkExt, StreamExt};
use serde::Deserialize;
use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
};
use tokio::sync::mpsc;

type Sender = mpsc::UnboundedSender<String>;
type ClientList = Arc<Mutex<HashMap<String, Vec<Sender>>>>;

#[derive(Deserialize)]
struct UpdatePayload {
    waitlist_id: String,
    update: String,
}

#[tokio::main]
async fn main() {
    let connected_waitlists: ClientList = Arc::new(Mutex::new(HashMap::new()));

    let app = Router::new()
        .route("/:id/ws", get(ws_handler))
        .route("/receive", put(update_handler))
        .route("/health", get(|| async { "OK" }))
        .layer(Extension(connected_waitlists));

    println!("Server running on http://localhost:9999");

    let listener = tokio::net::TcpListener::bind("0.0.0.0:9999")
        .await
        .unwrap();

    let server = axum::serve(listener, app.into_make_service()).await;

    match server {
        Ok(_) => println!("Server stopped"),
        Err(e) => println!("Error: {:?}", e),
    }
}

async fn ws_handler(
    Path(id): Path<String>,
    ws: WebSocketUpgrade,
    Extension(connected_waitlists): Extension<ClientList>,
) -> impl IntoResponse {
    println!("WebSocket connection established for waitlist {}", id);
    ws.on_upgrade(move |socket| handle_socket(socket, id, connected_waitlists))
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
    Json(payload): Json<UpdatePayload>,
) -> impl IntoResponse {
    println!("Received update: {:?}", payload.update);
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
