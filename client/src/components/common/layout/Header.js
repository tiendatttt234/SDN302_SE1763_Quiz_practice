import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import "./Header.css";

const Header = () => {
  const [isToolDropdownOpen, setIsToolDropdownOpen] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);

  const toggleToolDropdown = () => {
    setIsToolDropdownOpen(!isToolDropdownOpen);
  };

  const toggleSubjectDropdown = () => {
    setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Quizlet</h1>
        </Link>

        <nav>
          <ul>
            <li>
              {/* Khi click vào đây sẽ toggle dropdown */}
              <a href="#" onClick={toggleToolDropdown}>
                Công cụ học
              </a>
              {isToolDropdownOpen && (
                <ul className="dropdown">
                  <li>
                    <a href="#">Thẻ ghi nhớ</a>
                  </li>
                  <li>
                    <a href="#">Học</a>
                  </li>
                  <li>
                    <a href="#">Kiểm tra</a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              {/* Khi click vào đây sẽ toggle dropdown cho Chủ đề */}
              <a href="#" onClick={toggleSubjectDropdown}>
                Chủ đề
              </a>
              {isSubjectDropdownOpen && (
                <ul className="dropdown">
                  <li>
                    <a href="#">Toán học</a>
                  </li>
                  <li>
                    <a href="#">Văn học</a>
                  </li>
                  <li>
                    <a href="#">Lịch sử</a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        <div className="search">
          <button className="search-button">
            <Search />
          </button>
          <input type="text" placeholder="Tìm kiếm" />
        </div>
        <Link to={"/login"}>
          <button>Đăng nhập</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
