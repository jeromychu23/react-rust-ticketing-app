# React + Rust Online Ticketing System

A full-stack online ticketing app built with `React + TypeScript` (frontend) and `Rust + Axum + SQLx` (backend).
It supports ticket creation, record lookup, updates, and showing the latest 5 tickets.

Chinese version: [README.md](./README.cn.md)

## Features

- Create a ticket with name and reason
- Auto-generate serial numbers in the format `ADOYYYYMMDD-XXX`
- Reset sequence to `001` every day
- Show the latest 5 ticket records
- Search a ticket by serial number
- Update name and reason (also updates `updated_at`)

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: Rust, Axum, Tokio, SQLx
- Database: PostgreSQL

## Architecture

- Frontend default URL: `http://localhost:5173`
- Backend default URL: `http://127.0.0.1:3000`
- Frontend currently calls backend APIs via hardcoded URLs in code

## Quick Start

### 1) Requirements

- Node.js 20+ (LTS recommended)
- Rust 1.85+ (Edition 2024 support)
- PostgreSQL 14+ (or compatible versions)

### 2) Clone the repository

```bash
git clone https://github.com/your-username/react-rust-ticketing-app.git
cd react-rust-ticketing-app
```

### 3) Create database and table

```sql
CREATE DATABASE ticket_system;

\c ticket_system;

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    serial_no VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

### 4) Configure backend environment variable

Set `backend/.env`:

```env
DATABASE_URL=postgres://postgres:your_password@localhost:5432/ticket_system
```

### 5) Start backend

```bash
cd backend
cargo run
```

Expected output:

```text
Connected to PostgreSQL successfully
server running on http://127.0.0.1:3000
```

### 6) Start frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## API Reference

Base URL: `http://127.0.0.1:3000`

### Health Check

- `GET /api/health`

Response:

```text
OK
```

### Create Ticket

- `POST /api/tickets`
- `Content-Type: application/json`

Request:

```json
{
  "name": "Jeremy",
  "reason": "Document submission"
}
```

### Get Latest 5 Tickets

- `GET /api/tickets/recent`

### Get Ticket By Serial Number

- `GET /api/tickets/:serial_no`
- Example: `GET /api/tickets/ADO20260316-001`

### Update Ticket By Serial Number

- `PUT /api/tickets/:serial_no`
- `Content-Type: application/json`

Request:

```json
{
  "name": "Jeremy Chu",
  "reason": "Update reason"
}
```

## Serial Number Rule

- Format: `ADOYYYYMMDD-XXX`
- `ADO` is a fixed prefix
- `YYYYMMDD` is the backend local date
- `XXX` is a zero-padded daily sequence starting from `001`
- Sequence resets to `001` when the date changes

Example: `ADO20260316-001`

## Project Structure

```text
react-rust-ticketing-app/
  README.md
  README.en.md
  frontend/
    src/
    package.json
    vite.config.ts
  backend/
    src/
      main.rs
      app_state.rs
      handlers/
      models/
      routes/
      utils/
    Cargo.toml
```

## Development Commands

Frontend (`frontend/`):

- `npm run dev`: start dev server
- `npm run build`: build production assets
- `npm run lint`: run ESLint
- `npm run preview`: preview built assets

Backend (`backend/`):

- `cargo run`: start backend server
- `cargo check`: fast compile/type check
- `cargo test`: run tests (if available)

## Possible Improvements

- Move frontend API URLs to environment variables
- Improve form validation and user-facing error messages
- Add migrations (for example, `sqlx migrate`)
- Add unit and integration tests
- Add Docker support

## Note

This project is mainly for learning and portfolio demonstration.
