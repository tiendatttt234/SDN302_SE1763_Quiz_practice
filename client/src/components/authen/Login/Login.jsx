import React, { useState } from "react";
import { Link } from "react-router-dom";
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
          src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-RcpoXHkzChYnDbFAyeQ8tamr/user-ehrvabJ3DufsCu8YJ7PqY5gl/img-BZrjwp80ZO6JZujEsVM053Xs.png?st=2024-09-27T13%3A19%3A45Z&se=2024-09-27T15%3A19%3A45Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-26T23%3A09%3A32Z&ske=2024-09-27T23%3A09%3A32Z&sks=b&skv=2024-08-04&sig=Wbq6WUsrakCwUa1ou99oidbdt3XMslCENme86vzGag0%3D"
          width="400"
          height="400"
        />
        <div>Quizlet</div>
      </div>
      <div className="login-right">
        <div className="login-container">
          <h2>
            <Link to="/Register">
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
            >
              Đăng nhập
            </span>
          </h2>
          <button className="login-google">
            <i className="fab fa-google"></i> Đăng nhập bằng Google
          </button>
          <button className="login-facebook">
            <i className="fab fa-facebook-f"></i> Đăng nhập bằng Facebook
          </button>
          <button className="login-apple">
            <i className="fab fa-apple"></i> Đăng nhập bằng Apple
          </button>
          <div className="login-divider">hoặc email</div>
          <input
            type="email"
            placeholder="Nhập địa chỉ email hoặc tên người dùng của bạn"
          />
          <input type="password" placeholder="Nhập mật khẩu của bạn" />
          <div className="login-forgot-password">Quên mật khẩu</div>
          <button className="login-button">Đăng nhập</button>
          <div className="login-signup-link">
            {isLogin
              ? "Mới sử dụng Quizlet? Tạo tài khoản"
              : "Đăng nhập bằng liên kết nhanh"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
