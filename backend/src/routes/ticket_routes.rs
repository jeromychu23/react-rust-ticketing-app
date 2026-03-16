use axum::{
    Router,
    routing::{get, post},
};

use crate::handlers::ticket_handler::{create_ticket, get_recent_tickets};

pub fn ticket_router() -> Router {
    Router::new()
        .route("/api/tickets/recent", get(get_recent_tickets))
        .route("/api/tickets", post(create_ticket))
}
