import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  CardChecklist,
  Book,
  Clipboard2Check,
} from "react-bootstrap-icons";
import { Dropdown } from "react-bootstrap";

const Header = () => {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        zIndex: 1000,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 style={{ margin: 0 }}>Quizlet</h1>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Dropdown for Công cụ học */}
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Công cụ học
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Book
                  style={{
                    color: "black",
                    fontSize: "25px",
                    marginRight: "8px",
                  }}
                />
                Học
              </Dropdown.Item>
              <Dropdown.Item>
                <CardChecklist
                  style={{
                    color: "black",
                    fontSize: "25px",
                    marginRight: "8px",
                  }}
                />
                Thẻ ghi nhớ
              </Dropdown.Item>
              <Dropdown.Item>
                <Clipboard2Check
                  style={{
                    color: "black",
                    fontSize: "25px",
                    marginRight: "8px",
                  }}
                />
                Kiểm tra
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Dropdown for Chủ đề */}
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Chủ đề
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  Toán học
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  Văn học
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  Lịch sử
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Search */}
        <div
          className="search"
          style={{ display: "flex", alignItems: "center", flexGrow: 0.8 }}
        >
          <input
            type="text"
            placeholder="Tìm kiếm"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              marginRight: "10px",
              width: "300px",
            }}
          />
          <button
            className="search-button"
            style={{
              borderRadius: "50%",
              backgroundColor: "#f1f1f1",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "rgb(66,85,255)",
              fontSize: "16px",
            }}
          >
            <Search />
          </button>
        </div>

        {/* User Menu */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* Login Button */}
          <Link to={"/login"}>
            <button
              style={{
                padding: "5px 10px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                cursor: "pointer",
                backgroundColor: "rgb(66,85,255)",
              }}
            >
              Đăng nhập
            </button>
          </Link>

          {/* Dropdown for Avatar */}
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-avatar">
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
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Hồ sơ
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to="/mycourse"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Khóa học của tôi
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to="/upgrade"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Nâng cấp
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to="/logout"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Đăng xuất
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
