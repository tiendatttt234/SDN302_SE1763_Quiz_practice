import React, { useState } from "react";

// BirthdaySelector Component (no changes here)
const BirthdaySelector = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 124 }, (_, i) => currentYear - i);

  const handleUpdate = () => {
    console.log(`Selected Birthday: ${day}/${month}/${year}`);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#4A4A4A" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            color: "#4A4A4A",
          }}
        >
          Ngày/Tháng/Năm Sinh{" "}
          <i
            className="fas fa-info-circle"
            style={{ marginLeft: "5px", fontSize: "12px", color: "#4A4A4A" }}
          ></i>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div
            style={{
              padding: "10px",
              border: "1px solid #D1D1D1",
              borderRadius: "5px",
              backgroundColor: "#F9F9F9",
              color: "#4A4A4A",
              fontSize: "14px",
              width: "100px",
              textAlign: "left",
            }}
          >
            <select
              style={{
                border: "none",
                background: "transparent",
                fontSize: "14px",
                color: "#4A4A4A",
                width: "100%",
                cursor: "pointer",
              }}
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="">Ngày</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              padding: "10px",
              border: "1px solid #D1D1D1",
              borderRadius: "5px",
              backgroundColor: "#F9F9F9",
              color: "#4A4A4A",
              fontSize: "14px",
              width: "100px",
              textAlign: "left",
            }}
          >
            <select
              style={{
                border: "none",
                background: "transparent",
                fontSize: "14px",
                color: "#4A4A4A",
                width: "100%",
                cursor: "pointer",
              }}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">Tháng</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              padding: "10px",
              border: "1px solid #D1D1D1",
              borderRadius: "5px",
              backgroundColor: "#F9F9F9",
              color: "#4A4A4A",
              fontSize: "14px",
              width: "100px",
              textAlign: "left",
            }}
          >
            <select
              style={{
                border: "none",
                background: "transparent",
                fontSize: "14px",
                color: "#4A4A4A",
                width: "100%",
                cursor: "pointer",
              }}
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">Năm</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <button
            style={{
              padding: "10px 15px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleUpdate}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

// PasswordChange Component
const PasswordChange = () => {
  const [showInputs, setShowInputs] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    // Add password change logic here
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {/* Button to show/hide password inputs */}
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => setShowInputs(!showInputs)}
      >
        Đổi mật khẩu
      </button>

      {/* Conditionally render password input fields */}
      {showInputs && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="password"
            placeholder="Mật khẩu hiện tại"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handlePasswordChange}
          >
            Đổi mật khẩu
          </button>
        </div>
      )}
    </div>
  );
};

// Main Profile Component
const Profile = () => {
  return (
    <div
      style={{
        width: "60%",
        margin: "50px auto",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Ảnh hồ sơ</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            alt="Profile picture 1"
            src="http://pm1.aminoapps.com/7239/b508c8e2b879561f650574466b86531cc90138d9r1-768-768v2_uhq.jpg"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              margin: "10px",
            }}
          />
          <span style={{ color: "#007bff", cursor: "pointer" }}>Chỉnh sửa</span>
          <div>
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
          Thông tin cá nhân
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <label style={{ flex: 1 }}>Email:</label>
          <span style={{ flex: 10 }}>email@example.com</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <label style={{ flex: 1 }}>Tên:</label>
          <span style={{ flex: 9 }}>Nguyễn Văn A</span>
          <span style={{ color: "#007bff", cursor: "pointer" }}>Chỉnh sửa</span>
        </div>
        <BirthdaySelector />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
          Thiết lập khác
        </h2>
        <PasswordChange />
      </div>
    </div>
  );
};

export default Profile;
