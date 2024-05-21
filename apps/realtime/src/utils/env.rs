use std::{env, fmt};

#[derive(PartialEq)]
enum AppEnv {
    Dev,
    Prod,
    Preview,
}

impl fmt::Display for AppEnv {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppEnv::Dev => write!(f, "dev"),
            AppEnv::Prod => write!(f, "production"),
            AppEnv::Preview => write!(f, "preview"),
        }
    }
}

pub fn load_env() {
    let app_env = match env::var("APP_ENV") {
        Ok(v) if v == "production" => AppEnv::Prod,
        Ok(v) if v == "preview" => AppEnv::Preview,
        _ => AppEnv::Dev,
    };

    println!("Running in {app_env} mode");

    if app_env == AppEnv::Dev {
        match dotenvy::from_filename(".env.development") {
            Ok(path) => println!(".env read successfully from {}", path.display()),
            Err(e) => {
                println!("Could not load .env file: {e}");
            }
        };
    }
}
