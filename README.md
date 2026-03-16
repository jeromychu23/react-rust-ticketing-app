# React + Rust Online Ticket System

A full-stack online ticketing system built with **React**, **Rust (Axum)**, and **PostgreSQL**.

This project allows users to take a queue number online, search ticket records by serial number, and update ticket information. It is designed as a learning project to practice full-stack development, API design, and database integration.

---

## Features

- Create a new ticket with:
  - Name
  - Reason
- Generate daily serial numbers in the format:

  `ADOYYYYMMDD-XXX`

  Example:

  `ADO20260316-001`

- Reset daily sequence from `001` every new day
- Save ticket records into PostgreSQL
- Show the latest 5 ticket records
- Search ticket by serial number
- Update:
  - Name
  - Reason
  - Updated time

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite

### Backend
- Rust
- Axum
- Tokio
- SQLx

### Database
- PostgreSQL

---

## Project Structure

```text
react-rust-ticketing-app/
├─ frontend/
│  ├─ src/
│  ├─ package.json
│  └─ vite.config.ts
│
├─ backend/
│  ├─ src/
│  │  ├─ app_state.rs
│  │  ├─ main.rs
│  │  ├─ handlers/
│  │  ├─ models/
│  │  ├─ routes/
│  │  └─ utils/
│  ├─ Cargo.toml
│  └─ .env
│
└─ README.md

Main Functions
1. Create Ticket

Users enter:

Name

Reason

Then the backend generates a serial number and stores the record in PostgreSQL.

2. Serial Number Rule

Format:

ADOYYYYMMDD-XXX

Rules:

ADO is fixed

YYYYMMDD is the current date

XXX is the sequence number of that day

Sequence resets every day from 001

3. Recent 5 Records

The frontend fetches and displays the latest 5 records from the backend.

4. Search by Serial Number

Users can search for a specific record by entering a serial number.

5. Update Ticket Info

Users can update:

Name

Reason

When updated, the backend also updates updated_at.

API Endpoints
Health Check
GET /api/health
Get Recent 5 Tickets
GET /api/tickets/recent
Create Ticket
POST /api/tickets
Content-Type: application/json

Request body:

{
  "name": "Jeremy",
  "reason": "Document submission"
}
Search Ticket by Serial Number
GET /api/tickets/:serial_no

Example:

GET /api/tickets/ADO20260316-001
Update Ticket
PUT /api/tickets/:serial_no
Content-Type: application/json

Request body:

{
  "name": "Jeremy Chu",
  "reason": "Update reason"
}
Database Schema
tickets
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    serial_no VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
Local Setup
1. Clone Repository
git clone https://github.com/your-username/react-rust-ticketing-app.git
cd react-rust-ticketing-app
2. Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
3. Backend Setup
cd backend
cargo run

Backend runs at:

http://127.0.0.1:3000
4. PostgreSQL Setup

Create a database named:

ticket_system

Then create the tickets table using the SQL above.

5. Environment Variable

Create backend/.env:

DATABASE_URL=postgres://postgres:your_password@localhost:5432/ticket_system
Development Notes
CORS

Since the frontend and backend run on different ports during local development, CORS is enabled in the backend.

Current Status

This project currently supports:

Ticket creation

Recent ticket listing

Ticket search

Ticket update

PostgreSQL integration

Learning Goals

This project was built to practice:

Frontend and backend integration

RESTful API design

Rust backend development with Axum

PostgreSQL CRUD operations

Serial number generation logic

Full-stack project structure

Future Improvements

Possible next steps:

Better UI styling

Form validation improvements

Loading / success / error states

Docker support

Authentication / admin mode

Pagination

Unit tests

Deployment

Screenshots

You can add screenshots here later:

Home page

Ticket creation

Search result

Update result

Example:

![Home Page](./docs/home.png)
Author

Jeremy

This project is built for learning purposes and portfolio demonstration.