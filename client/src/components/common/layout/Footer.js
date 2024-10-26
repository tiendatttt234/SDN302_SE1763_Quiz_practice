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
              <li>
                <a href="#">Lặp lại ngắt quãng</a>
              </li>
              <li>
                <a href="#">Quizlet Plus</a>
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
              <li>
                <a href="#">Quizlet Plus cho giáo viên</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Tài nguyên</h3>
            <ul>
              <li>
                <a href="#">Trung tâm hỗ trợ</a>
              </li>
              <li>
                <a href="#">Đăng ký</a>
              </li>
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
              <li>
                <a href="#">Chính sách quảng cáo và cookie</a>
              </li>
              <li>
                <a href="#">Quizlet cho trường học</a>
              </li>
              <li>
                <a href="#">Phụ huynh</a>
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
