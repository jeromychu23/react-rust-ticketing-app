mod handlers;
mod models;
mod routes;

use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() {
    let cors = CorsLayer::permissive();

    let app = routes::create_router().layer(cors);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    println!("server running on http://127.0.0.1:3000");

    axum::serve(listener, app).await.unwrap();
}
