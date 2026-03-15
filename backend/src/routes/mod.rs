use axum::{
    routing::get,
    Router,
};

use crate::handlers::health_handler::health_check;

pub fn create_router() -> Router {
    Router::new()
        .route("/", get(root))
        .route("/api/health", get(health_check))
}

async fn root() -> &'static str {
    "Backend is running"
}