# React + Rust 線上取號系統

使用 `React + TypeScript`（前端）與 `Rust + Axum + SQLx`（後端）打造的全端取號系統。  
支援建立取號、查詢單筆、更新資料，以及顯示最新 5 筆紀錄。

English version: [README.md](./README.md)

## 功能特色

- 建立取號（姓名、事由）
- 自動產生流水號：`ADOYYYYMMDD-XXX`
- 每日流水號從 `001` 重新開始
- 顯示最新 5 筆資料
- 依流水號查詢單筆資料
- 更新姓名與事由（同步更新 `updated_at`）

## 技術棧

- Frontend: React, TypeScript, Vite
- Backend: Rust, Axum, Tokio, SQLx
- Database: PostgreSQL

## 系統架構

- 前端預設執行於 `http://localhost:5173`
- 後端預設執行於 `http://127.0.0.1:3000`
- 前端直接呼叫後端 API（目前 API URL 為程式內寫死）

## 快速開始

### 1) 安裝需求

- Node.js 20+（建議 LTS）
- Rust 1.85+（支援 Edition 2024）
- PostgreSQL 14+（或相容版本）

### 2) 下載專案

```bash
git clone https://github.com/your-username/react-rust-ticketing-app.git
cd react-rust-ticketing-app
```

### 3) 建立資料庫與資料表

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

### 4) 設定後端環境變數

在 `backend/.env` 設定：

```env
DATABASE_URL=postgres://postgres:your_password@localhost:5432/ticket_system
```

### 5) 啟動後端

```bash
cd backend
cargo run
```

看到以下訊息代表成功：

```text
Connected to PostgreSQL successfully
server running on http://127.0.0.1:3000
```

### 6) 啟動前端

```bash
cd frontend
npm install
npm run dev
```

開啟 `http://localhost:5173` 即可使用。

## API 文件

Base URL: `http://127.0.0.1:3000`

### Health Check

- `GET /api/health`

Response:

```text
OK
```

### 建立取號

- `POST /api/tickets`
- `Content-Type: application/json`

Request:

```json
{
  "name": "Jeremy",
  "reason": "Document submission"
}
```

### 最新 5 筆

- `GET /api/tickets/recent`

### 查詢單筆

- `GET /api/tickets/:serial_no`
- 範例：`GET /api/tickets/ADO20260316-001`

### 更新單筆

- `PUT /api/tickets/:serial_no`
- `Content-Type: application/json`

Request:

```json
{
  "name": "Jeremy Chu",
  "reason": "Update reason"
}
```

## 流水號規則

- 格式：`ADOYYYYMMDD-XXX`
- `ADO` 為固定前綴
- `YYYYMMDD` 為後端當地日期
- `XXX` 為當日遞增序號（3 碼，從 `001` 開始）
- 日期變更時重新從 `001` 計算

範例：`ADO20260316-001`

## 專案結構

```text
react-rust-ticketing-app/
  README.md
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

## 開發指令

Frontend（`frontend/`）：

- `npm run dev`：啟動開發伺服器
- `npm run build`：打包
- `npm run lint`：執行 ESLint
- `npm run preview`：預覽 build 結果

Backend（`backend/`）：

- `cargo run`：啟動後端
- `cargo check`：快速型別檢查
- `cargo test`：執行測試（若有）

## 後續可改進方向

- 前端 API URL 改為 `.env` 可設定
- 表單驗證與錯誤訊息優化
- 增加 migration（例如使用 `sqlx migrate`）
- 增加整合測試與單元測試
- Docker 化部署

## 備註

此專案主要用於學習與作品展示。
