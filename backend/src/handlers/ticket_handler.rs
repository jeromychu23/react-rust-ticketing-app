use axum::{
    Json,
    extract::{Path, State},
};

use crate::{
    app_state::AppState,
    models::ticket::{CreateTicketRequest, Ticket},
    utils::serial_no::generate_serial_no,
};

pub async fn get_recent_tickets(State(state): State<AppState>) -> Json<Vec<Ticket>> {
    let tickets = sqlx::query_as::<_, Ticket>(
        r#"
        SELECT
            serial_no,
            name,
            reason,
            created_at::text AS created_at,
            updated_at::text AS updated_at
        FROM tickets
        ORDER BY created_at DESC
        LIMIT 5
        "#,
    )
    .fetch_all(&state.db)
    .await
    .unwrap();

    Json(tickets)
}

pub async fn create_ticket(
    State(state): State<AppState>,
    Json(payload): Json<CreateTicketRequest>,
) -> Json<Ticket> {
    let serial_no = generate_serial_no(&state.db).await.unwrap();

    let ticket = sqlx::query_as::<_, Ticket>(
        r#"
        INSERT INTO tickets (serial_no, name, reason, created_at, updated_at)
        VALUES ($1, $2, $3, NOW(), NOW())
        RETURNING
            serial_no,
            name,
            reason,
            created_at::text AS created_at,
            updated_at::text AS updated_at
        "#,
    )
    .bind(serial_no)
    .bind(payload.name)
    .bind(payload.reason)
    .fetch_one(&state.db)
    .await
    .unwrap();

    Json(ticket)
}

pub async fn get_ticket_by_serial_no(
    State(state): State<AppState>,
    Path(serial_no): Path<String>,
) -> Json<Option<Ticket>> {
    let ticket = sqlx::query_as::<_, Ticket>(
        r#"
        SELECT
            serial_no,
            name,
            reason,
            created_at::text AS created_at,
            updated_at::text AS updated_at
        FROM tickets
        WHERE serial_no = $1
        "#,
    )
    .bind(serial_no)
    .fetch_optional(&state.db)
    .await
    .unwrap();

    Json(ticket)
}
