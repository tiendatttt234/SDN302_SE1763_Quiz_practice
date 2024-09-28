import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className="register-left-section">
        <h1>Học hiệu quả mà thật thoải mái.</h1>
        <img
          alt="Colorful notebooks and white headphones"
          height="400"
          src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-RcpoXHkzChYnDbFAyeQ8tamr/user-ehrvabJ3DufsCu8YJ7PqY5gl/img-yQi58tmEWv2BHuxT8BmppqYw.png?st=2024-09-27T13%3A13%3A29Z&se=2024-09-27T15%3A13%3A29Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-26T23%3A18%3A38Z&ske=2024-09-27T23%3A18%3A38Z&sks=b&skv=2024-08-04&sig=JLrWegIUrXGfQhy%2B19Yt3OR5sgNfC4Bi24Ws%2BqBIoMw%3D"
          width="400"
        />
        <div>Quizlet</div>
      </div>
      <div className="register-right-section">
        <div className="register-login-container">
          <div className="register-tabs">
            <div className="register-active">Đăng ký</div>
            <Link to={"/login"}>
              <div>Đăng nhập</div>
            </Link>
          </div>
          <div className="register-social-login">
            <button>
              <i className="fab fa-google"></i>
              Đăng nhập bằng Google
            </button>
            <button>
              <i className="fab fa-facebook"></i>
              Đăng nhập bằng Facebook
            </button>
            <button>
              <i className="fab fa-apple"></i>
              Đăng nhập bằng Apple
            </button>
          </div>
          <div className="register-email-login">
            <div>hoặc email</div>
            <input
              placeholder="Nhập địa chỉ email hoặc tên người dùng của bạn"
              type="email"
            />
            <input placeholder="Nhập mật khẩu của bạn" type="password" />
            <div className="register-forgot-password">Quên mật khẩu</div>
          </div>
          <button className="register-login-button">Đăng nhập</button>
          <div className="register-signup-link">
            Mới sử dụng Quizlet?
            <a href="#">Tạo tài khoản</a>
          </div>
          <div className="register-signup-link">
            <a href="#">Đăng nhập bằng liên kết nhanh</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
