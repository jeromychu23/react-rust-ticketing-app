use axum::{
    routing::get,
    Router,
};

use crate::handlers::ticket_handler::get_recent_tickets;

pub fn ticket_router() -> Router {
    Router::new()
        .route("/api/tickets/recent", get(get_recent_tickets))
}