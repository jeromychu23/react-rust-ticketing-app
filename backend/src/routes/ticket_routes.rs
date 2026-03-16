use axum::{
    routing::{get, post},
    Router,
};

use crate::{
    app_state::AppState,
    handlers::ticket_handler::{
        create_ticket,
        get_recent_tickets,
        get_ticket_by_serial_no,
    },
};

pub fn ticket_router() -> Router<AppState> {
    Router::new()
        .route("/api/tickets/recent", get(get_recent_tickets))
        .route("/api/tickets/:serial_no", get(get_ticket_by_serial_no))
        .route("/api/tickets", post(create_ticket))
}