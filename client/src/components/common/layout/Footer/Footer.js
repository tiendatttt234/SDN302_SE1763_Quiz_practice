import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-columns">
          <div className="footer-column">
            <h3>Giới thiệu</h3>
            <ul>
              <li>
                <a href="#">Giới thiệu về Quizlet</a>
              </li>
              <li>
                <a href="#">Tải ứng dụng</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Dành cho học sinh</h3>
            <ul>
              <li>
                <a href="#">Thẻ ghi nhớ</a>
              </li>
              <li>
                <a href="#">Kiểm tra</a>
              </li>
              <li>
                <a href="#">Học</a>
              </li>
              <li>
                <a href="#">Lời giải</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Dành cho giáo viên</h3>
            <ul>
              <li>
                <a href="#">Live</a>
              </li>
              <li>
                <a href="#">Cột mốc</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Tài nguyên</h3>
            <ul>
              <li>
                <a href="#">Quy tắc danh dự</a>
              </li>
              <li>
                <a href="#">Nguyên tắc cộng đồng</a>
              </li>
              <li>
                <a href="#">Quyền riêng tư</a>
              </li>
              <li>
                <a href="#">Điều khoản</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Ngôn ngữ</h3>
            {}
            <span>Tiếng Việt</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
