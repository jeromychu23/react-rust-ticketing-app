use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Ticket {
    pub serial_no: String,
    pub name: String,
    pub reason: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateTicketRequest {
    pub name: String,
    pub reason: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdateTicketRequest {
    pub name: String,
    pub reason: String,
}