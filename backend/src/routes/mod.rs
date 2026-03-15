use axum::{
    routing::get,
    Router,
};

use crate::handlers::health_handler::health_check;

pub mod ticket_routes;

pub fn create_router() -> Router {
    Router::new()
        .route("/", get(root))
        .route("/api/health", get(health_check))
        .merge(ticket_routes::ticket_router())
}

async fn root() -> &'static str {
    "Backend is running"
}