use axum::{
    Router,
    routing::{get, post, put},
};

use crate::{
    app_state::AppState,
    handlers::ticket_handler::{
        create_ticket, get_recent_tickets, get_ticket_by_serial_no, update_ticket_by_serial_no,
    },
};

pub fn ticket_router() -> Router<AppState> {
    Router::new()
        .route("/api/tickets/recent", get(get_recent_tickets))
        .route(
            "/api/tickets/:serial_no",
            get(get_ticket_by_serial_no).put(update_ticket_by_serial_no),
        )
        .route("/api/tickets", post(create_ticket))
}
