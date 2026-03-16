import { useEffect, useState } from "react";

type Ticket = {
  serial_no: string;
  name: string;
  reason: string;
  created_at: string;
  updated_at: string;
};

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [latestTicket, setLatestTicket] = useState<Ticket | null>(null);

  const [searchSerialNo, setSearchSerialNo] = useState("");
  const [searchResult, setSearchResult] = useState<Ticket | null>(null);
  const [searchMessage, setSearchMessage] = useState("");

  const [editName, setEditName] = useState("");
  const [editReason, setEditReason] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    fetchRecentTickets();
  }, []);

  const fetchRecentTickets = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/tickets/recent");
      const data = await response.json();
      setTickets(data);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
  };

  const handleTakeTicket = async () => {
    if (!name.trim()) {
      setErrorMessage("請輸入姓名");
      return;
    }

    if (!reason.trim()) {
      setErrorMessage("請輸入取號原因");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch("http://127.0.0.1:3000/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          reason,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      const newTicket: Ticket = await response.json();

      setLatestTicket(newTicket);
      setTickets((prev) => [newTicket, ...prev].slice(0, 5));
      setName("");
      setReason("");
    } catch (error) {
      console.error(error);
      setErrorMessage("取號失敗，請稍後再試");
    }
  };

  const handleSearchTicket = async () => {
    if (!searchSerialNo.trim()) {
      setSearchMessage("請輸入流水號");
      setSearchResult(null);
      setEditName("");
      setEditReason("");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/tickets/${searchSerialNo}`
      );

      if (!response.ok) {
        throw new Error("Failed to search ticket");
      }

      const data: Ticket | null = await response.json();

      if (!data) {
        setSearchMessage("查無資料");
        setSearchResult(null);
        setEditName("");
        setEditReason("");
        return;
      }

      setSearchMessage("");
      setUpdateMessage("");
      setSearchResult(data);
      setEditName(data.name);
      setEditReason(data.reason);
    } catch (error) {
      console.error(error);
      setSearchMessage("搜尋失敗，請稍後再試");
      setSearchResult(null);
      setEditName("");
      setEditReason("");
    }
  };

  const handleUpdateTicket = async () => {
    if (!searchResult) return;

    if (!editName.trim()) {
      setUpdateMessage("請輸入姓名");
      return;
    }

    if (!editReason.trim()) {
      setUpdateMessage("請輸入取號原因");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/tickets/${searchResult.serial_no}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editName,
            reason: editReason,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update ticket");
      }

      const updatedTicket: Ticket | null = await response.json();

      if (!updatedTicket) {
        setUpdateMessage("更新失敗，查無資料");
        return;
      }

      setSearchResult(updatedTicket);
      setEditName(updatedTicket.name);
      setEditReason(updatedTicket.reason);
      setUpdateMessage("更新成功");

      await fetchRecentTickets();

      if (latestTicket?.serial_no === updatedTicket.serial_no) {
        setLatestTicket(updatedTicket);
      }
    } catch (error) {
      console.error(error);
      setUpdateMessage("更新失敗，請稍後再試");
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>Online Ticket System</h1>

      <div style={cardStyle}>
        <h2>取號</h2>

        <div style={{ marginBottom: "12px" }}>
          <label style={labelStyle}>姓名</label>
          <input
            style={inputStyle}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="請輸入姓名"
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={labelStyle}>取號原因</label>
          <textarea
            style={textareaStyle}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="請輸入取號原因"
          />
        </div>

        {errorMessage && (
          <p style={{ color: "red", marginBottom: "12px" }}>{errorMessage}</p>
        )}

        <button style={buttonStyle} type="button" onClick={handleTakeTicket}>
          取號
        </button>
      </div>

      {latestTicket && (
        <div style={successCardStyle}>
          <h2>最新取號結果</h2>
          <p>
            您的號碼是：<strong>{latestTicket.serial_no}</strong>
          </p>
          <p>姓名：{latestTicket.name}</p>
          <p>取號原因：{latestTicket.reason}</p>
        </div>
      )}

      <div style={cardStyle}>
        <h2>搜尋流水號</h2>

        <div style={{ marginBottom: "12px" }}>
          <label style={labelStyle}>流水號</label>
          <input
            style={inputStyle}
            type="text"
            value={searchSerialNo}
            onChange={(e) => setSearchSerialNo(e.target.value)}
            placeholder="例如 ADO20260316-001"
          />
        </div>

        {searchMessage && (
          <p style={{ color: "red", marginBottom: "12px" }}>{searchMessage}</p>
        )}

        <button style={buttonStyle} type="button" onClick={handleSearchTicket}>
          搜尋
        </button>

        {searchResult && (
          <div
            style={{
              marginTop: "16px",
              borderTop: "1px solid #ddd",
              paddingTop: "16px",
            }}
          >
            <p>
              <strong>流水號：</strong>
              {searchResult.serial_no}
            </p>
            <p>
              <strong>取號時間：</strong>
              {searchResult.created_at}
            </p>
            <p>
              <strong>更新時間：</strong>
              {searchResult.updated_at}
            </p>

            <div style={{ marginTop: "16px" }}>
              <label style={labelStyle}>姓名</label>
              <input
                style={inputStyle}
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>

            <div style={{ marginTop: "12px" }}>
              <label style={labelStyle}>取號原因</label>
              <textarea
                style={textareaStyle}
                value={editReason}
                onChange={(e) => setEditReason(e.target.value)}
              />
            </div>

            {updateMessage && (
              <p
                style={{
                  color: updateMessage === "更新成功" ? "green" : "red",
                  marginTop: "12px",
                }}
              >
                {updateMessage}
              </p>
            )}

            <button
              style={{ ...buttonStyle, marginTop: "12px" }}
              type="button"
              onClick={handleUpdateTicket}
            >
              更新
            </button>
          </div>
        )}
      </div>

      <h2>最近 5 筆取號紀錄</h2>

      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "16px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>流水號</th>
              <th style={thStyle}>姓名</th>
              <th style={thStyle}>取號原因</th>
              <th style={thStyle}>取號時間</th>
              <th style={thStyle}>更新時間</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.serial_no}>
                <td style={tdStyle}>{ticket.serial_no}</td>
                <td style={tdStyle}>{ticket.name}</td>
                <td style={tdStyle}>{ticket.reason}</td>
                <td style={tdStyle}>{ticket.created_at}</td>
                <td style={tdStyle}>{ticket.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
  backgroundColor: "#fafafa",
};

const successCardStyle: React.CSSProperties = {
  border: "1px solid #b7eb8f",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
  backgroundColor: "#f6ffed",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "bold",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "100px",
  padding: "10px",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 16px",
  cursor: "pointer",
};

const thStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "12px",
  textAlign: "left",
  backgroundColor: "#f5f5f5",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "12px",
  textAlign: "left",
};

export default App;