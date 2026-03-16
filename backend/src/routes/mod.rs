use axum::{
    routing::get,
    Router,
};

use crate::{
    app_state::AppState,
    handlers::health_handler::health_check,
};

pub mod ticket_routes;

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/", get(root))
        .route("/api/health", get(health_check))
        .merge(ticket_routes::ticket_router())
}

async fn root() -> &'static str {
    "Backend is running"
}