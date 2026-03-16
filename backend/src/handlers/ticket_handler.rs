use axum::Json;

use crate::models::ticket::{CreateTicketRequest, Ticket};

pub async fn get_recent_tickets() -> Json<Vec<Ticket>> {
    let tickets = vec![
        Ticket {
            serial_no: "ADO20260316-001".to_string(),
            name: "Jeremy".to_string(),
            reason: "Document submission".to_string(),
            created_at: "2026-03-16T10:00:00+08:00".to_string(),
            updated_at: "2026-03-16T10:00:00+08:00".to_string(),
        },
        Ticket {
            serial_no: "ADO20260316-002".to_string(),
            name: "Amy".to_string(),
            reason: "Interview".to_string(),
            created_at: "2026-03-16T10:05:00+08:00".to_string(),
            updated_at: "2026-03-16T10:05:00+08:00".to_string(),
        },
    ];

    Json(tickets)
}

pub async fn create_ticket(Json(payload): Json<CreateTicketRequest>) -> Json<Ticket> {
    let ticket = Ticket {
        serial_no: "ADO20260316-003".to_string(),
        name: payload.name,
        reason: payload.reason,
        created_at: "2026-03-16T10:10:00+08:00".to_string(),
        updated_at: "2026-03-16T10:10:00+08:00".to_string(),
    };

    Json(ticket)
}
