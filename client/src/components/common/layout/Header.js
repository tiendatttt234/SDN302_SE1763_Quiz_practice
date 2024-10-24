import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  CardChecklist,
  Book,
  Clipboard2Check,
  List,
} from "react-bootstrap-icons";
import { Button, Dropdown } from "react-bootstrap";
import "./Header.css"; // Tạo file CSS để thêm các style cần thiết

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleToggle = () => {
    setShowMenu(!showMenu);
  };
  const handleItemClick = () => {
    // Ẩn menu khi chọn 1 item
    setShowMenu(false);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Thêm trạng thái cho sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  }

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}` } style = {{marginTop: "50px"}}> 
        <ul>
          <li>
            <Link to="/" onClick={closeSidebar}>
              <i className="bi bi-house-door"></i> Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/library" onClick={closeSidebar}>
              <i className="bi bi-collection"></i> Thư viện của bạn
            </Link>
          </li>
          
        </ul>
      </div>

      <header
        style={{
          position: "fixed",
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
          {/* Icon menu ở bên trái logo */}
          <div onClick={toggleSidebar} style={{ cursor: "pointer", color: "#333" }}>
            <List size={24} />
          </div>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 style={{ margin: 0, paddingLeft: "10px" }}>Quizlet</h1>
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
                <Dropdown.Item onClick={handleItemClick}>
                  <Book
                    style={{
                      color: "black",
                      fontSize: "25px",
                      marginRight: "8px",
                    }}
                  />
                  Học
                </Dropdown.Item>
                <Dropdown.Item onClick={handleItemClick}>
                  <CardChecklist
                    style={{
                      color: "black",
                      fontSize: "25px",
                      marginRight: "8px",
                    }}
                  />
                  Thẻ ghi nhớ
                </Dropdown.Item>
                <Dropdown.Item onClick={handleItemClick}>
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
                  <Link
                    to="#"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Toán học
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to="#"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Văn học
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to="#"
                    style={{ textDecoration: "none", color: "black" }}
                  >
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

          {/* Button for Chủ đề */}
          <div>
            <Button variant="primary" onClick={handleToggle}>
              +
            </Button>

            {showMenu && (
              <Dropdown.Menu show className="custom-dropdown-menu">
                <Dropdown.Item
                  onClick={handleItemClick}
                  className="custom-dropdown-item"
                >
                  <i className="bi bi-book" style={{ marginRight: "8px" }}></i>
                  <Link to="/user/addquestion" className="custom-dropdown-link">
                    Học phần
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleItemClick}
                  className="custom-dropdown-item"
                >
                  <i className="bi bi-folder" style={{ marginRight: "8px" }}></i>
                  <Link to="#" className="custom-dropdown-link">
                    Thư mục
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            )}
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
    </>
  );
};

export default Header;
