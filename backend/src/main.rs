mod app_state;
mod handlers;
mod models;
mod routes;
mod utils;

use std::env;

use app_state::AppState;
use dotenvy::dotenv;
use sqlx::postgres::PgPoolOptions;
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to connect to PostgreSQL");

    println!("Connected to PostgreSQL successfully");

    let state = AppState { db: pool };

    let cors = CorsLayer::permissive();
    let app = routes::create_router()
        .with_state(state)
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    println!("server running on http://127.0.0.1:3000");

    axum::serve(listener, app).await.unwrap();
}