import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  CardChecklist,
  Book,
  Clipboard2Check,
} from "react-bootstrap-icons";
import "./Header.css";

const Header = () => {
  const [isToolDropdownOpen, setIsToolDropdownOpen] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);

  const toggleToolDropdown = () => {
    setIsToolDropdownOpen(!isToolDropdownOpen);
  };

  const toggleSubjectDropdown = () => {
    setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
  };

  const toggleAvatarDropdown = () => {
    setIsAvatarDropdownOpen(!isAvatarDropdownOpen);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Quizlet</h1>
        </Link>

        <nav>
          <ul>
            <li>
              <a href="#" onClick={toggleToolDropdown}>
                Công cụ học
              </a>
              {isToolDropdownOpen && (
                <ul className="dropdown">
                  <li>
                    <CardChecklist
                      style={{
                        color: "black",
                        fontSize: "25px",
                        marginRight: "8px",
                      }}
                    />
                    <a href="#">Thẻ ghi nhớ</a>
                  </li>
                  <li>
                    <Book
                      style={{
                        color: "black",
                        fontSize: "25px",
                        marginRight: "8px",
                      }}
                    />
                    <a href="#">Học</a>
                  </li>
                  <li>
                    <Clipboard2Check
                      style={{
                        color: "black",
                        fontSize: "25px",
                        marginRight: "8px",
                      }}
                    />
                    <a href="#">Kiểm tra</a>
                  </li>
                </ul>
              )}
            </li>
            <li>
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
          <button className="search-button" style={{ borderRadius: "10%" }}>
            <Search />
          </button>
          <input type="text" placeholder="Tìm kiếm" />
        </div>

        <div className="user-menu">
          <Link to={"/login"}>
            <button style={{ marginRight: "10px", borderRadius: "50%" }}>
              Đăng nhập
            </button>
          </Link>
        </div>
        <div
          className="avatar"
          onClick={toggleAvatarDropdown}
          style={{ position: "relative" }}
        >
          <img
            src="http://pm1.aminoapps.com/7239/b508c8e2b879561f650574466b86531cc90138d9r1-768-768v2_uhq.jpg"
            alt="User Avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
          {isAvatarDropdownOpen && (
            <ul
              className="dropdown avatar-dropdown"
              style={{
                top: "50px",
                right: "0",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                padding: "10px",
                width: "130px",
              }}
            >
              <li>
                <Link to="/profile">Hồ sơ</Link>
              </li>
              <li>
                <Link to="/mycourse">Khóa học của tôi</Link>
              </li>
              <li>
                <Link to="/upgrade">Nâng cấp</Link>
              </li>
              <li>
                <Link to="/logout">Đăng xuất</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
