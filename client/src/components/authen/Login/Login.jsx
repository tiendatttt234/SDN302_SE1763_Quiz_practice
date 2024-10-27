import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9999/account/login", {
        userName,
        password,
      });
      
      const { accessToken, roles } = response.data;
      
      // Store user data
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", userName);
      localStorage.setItem("roles", JSON.stringify(roles));

      // Determine redirect path based on role name
      let redirectPath = "/"; // Default path for users
      
      if (roles && roles.name) {
        switch (roles.name.toLowerCase()) {
          case "admin":
            redirectPath = "/admin";
            break;
          case "manager":
            redirectPath = "/managerdb";
            break;
          default:
            redirectPath = "/";
        }
      }

      setSuccessMessage("Đăng nhập thành công! Chuyển hướng trong giây lát...");
      setTimeout(() => {
        navigate(redirectPath);
      }, 2000);
    } catch (error) {
      setErrorMessage("Incorrect username or password. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", margin: 0 }}>
      <div className="login-left">
        <h1>Học hiệu quả mà thật thoải mái.</h1>
        <img
          alt="Colorful notebooks and white headphones"
          height="300"
          src="https://th.bing.com/th/id/OIG4._8czaS_hxnpxvorG7z_D?w=1024&h=1024&rs=1&pid=ImgDetMain"
          width="800"
        />
      </div>
      <div className="login-right">
        <div className="login-container">
          <h2>
            <Link to="/register" style={{ textDecoration: "none" }}>
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

          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Nhập tên người dùng của bạn"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link to={"/forgotpassword"} style={{ textDecoration: "none" }}>
              <div className="login-forgot-password">Quên mật khẩu</div>
            </Link>
            <button type="submit" className="login-button">
              Đăng nhập
            </button>
          </form>
          <Link to={"/register"} style={{ textDecoration: "none" }}>
            <button className="register-login-button">
              Bạn chưa có tài khoản? Đăng Ký
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;