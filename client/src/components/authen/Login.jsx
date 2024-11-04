import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Google, Facebook } from "react-bootstrap-icons";
import "./Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div style={{ display: "flex", height: "100vh", margin: 0 }}>
      <div className="login-left">
        <h1>Học hiệu quả mà thật thoải mái.</h1>
        <img
          alt="Colorful notebooks and white headphones"
          height="00"
          src="https://th.bing.com/th/id/OIG4._8czaS_hxnpxvorG7z_D?w=1024&h=1024&rs=1&pid=ImgDetMain"
          width="800"
        />
      </div>
      <div className="login-right">
        <div className="login-container">
          <h2>
            <Link to="/Register" style={{ textDecoration: "none" }}>
              <span
                className={isLogin ? "" : "login-active"}
                onClick={() => setIsLogin(false)}
              >
                Đăng ký
              </span>
            </Link>
            <span
              className={isLogin ? "login-active" : ""}
              onClick={() => setIsLogin(true)}
              style={{ borderBottom: "2px solid #6a1b9a" }}
            >
              Đăng nhập
            </span>
          </h2>
          <button className="login-google">
            Đăng nhập bằng Google
            <i className="fab fa-google">
              <Google
                style={{
                  fontSize: "16px",
                  marginLeft: "5px",
                }}
              />
            </i>
          </button>

          <button className="login-facebook">
            Đăng nhập bằng Facebook
            <i className="fab fa-facebook-f">
              <Facebook
                style={{
                  fontSize: "20px",
                  marginLeft: "5px",
                }}
              />
            </i>
          </button>
          <div className="login-divider">Hoặc tài khoản</div>
          <input
            type="email"
            placeholder="Nhập địa chỉ email hoặc tên người dùng của bạn"
          />
          <input type="password" placeholder="Nhập mật khẩu của bạn" />
          <Link to={"/forgotpassword"} style={{ textDecoration: "none" }}>
            <div className="login-forgot-password">Quên mật khẩu</div>
          </Link>

          <button className="login-button">Đăng nhập</button>
          <Link to={"/register"} style={{ textDecoration: "none" }}>
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
              Bạn chưa có tài khoản?Đăng Ký
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
