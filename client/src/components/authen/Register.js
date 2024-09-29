import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

const BirthdaySelector = () => {
  // States for day, month, year selection
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Generate days (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Generate months (1-12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Generate years (1900-2023 or whatever range you need)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 124 }, (_, i) => currentYear - i);

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
        <div style={{ display: "flex", gap: "10px" }}>
          {/* Day Dropdown */}
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
          {/* Month Dropdown */}
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

          {/* Year Dropdown */}
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
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className="register-left-section">
        <h1>Cách tốt nhất để học. Đăng ký miễn phí.</h1>
        <img
          alt="Colorful notebooks and white headphones"
          height="00"
          src="https://th.bing.com/th/id/OIG4._8czaS_hxnpxvorG7z_D?w=1024&h=1024&rs=1&pid=ImgDetMain"
          width="800"
        />
      </div>
      <div className="register-right-section">
        <div className="register-login-container">
          <div className="register-tabs">
            <h2 className="register-active">Đăng ký</h2>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <h2>Đăng nhập</h2>
            </Link>
          </div>

          <div className="register-email-login">
            <BirthdaySelector />
            <p>Email</p>
            <input placeholder="Nhập địa chỉ email của bạn" type="email" />
            <p>Tên người dùng</p>
            <input placeholder="Nhập tên người dùng của bạn" type="text" />
            <p>Mật khẩu</p>
            <input placeholder="Nhập mật khẩu của bạn" type="password" />
          </div>
          <button
            className="register-login-button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
            }}
          >
            Đăng ký
          </button>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <button
              className="register-login-button"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                backgroundColor: "#008CBA",
                color: "white",
                border: "none",
              }}
            >
              Bạn đã có tài khoản? Đăng nhập
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
