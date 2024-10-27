import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, List, X, CardChecklist, Book } from "react-bootstrap-icons";
import { Button, Dropdown } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = () => {
      const accessToken = localStorage.getItem("accessToken");
      const storedUserName = localStorage.getItem("userName");
      const storedRoles = localStorage.getItem("roles");

      if (accessToken && storedUserName && storedRoles) {
        try {
          const roleObj = JSON.parse(storedRoles);
          setUserName(storedUserName);
          setUserRole(roleObj);
        } catch (error) {
          console.error("Error parsing roles:", error);
        }
      }
    };

    loadUserData();
    window.addEventListener("storage", loadUserData);
    return () => window.removeEventListener("storage", loadUserData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("roles");
    setUserName("");
    setUserRole(null);
    setSuccessMessage("Đăng xuất thành công!");
    setTimeout(() => {
      setSuccessMessage("");
      navigate("/login");
    }, 2000);
  };

  const renderRoleBasedLinks = () => {
    if (!userRole) return null;
    const roleName = userRole.name.toLowerCase();

    switch (roleName) {
      case "admin":
        return (
          <Link to="/admin" className="nav-link" style={{ marginRight: "20px" }}>
            Admin
          </Link>
        );
      case "manager":
        return (
          <Link to="/managerdb" className="nav-link" style={{ marginRight: "20px" }}>
            Manager
          </Link>
        );
      default:
        return null;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`sidebar-menu ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <X onClick={toggleSidebar} size={24} className="close-icon" />
        </div>
        <ul>
          <li>
            <Link to="/" onClick={toggleSidebar}>Trang chủ</Link>
          </li>
          <li>
            <Link to="/user/viewques" onClick={toggleSidebar}>Thư viện của bạn</Link>
          </li>
        </ul>
      </div>

      <header className="main-header">
        <div className="container">
          <div onClick={toggleSidebar} className="sidebar-toggle">
            <List size={24} />
          </div>

          <Link to="/" className="logo">
            <h1>Quizlet</h1>
          </Link>

          <div className="header-links">
            {renderRoleBasedLinks()}
            <Dropdown>
              <Dropdown.Toggle variant="light">Công cụ</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/blogList"><Book /> Blog</Dropdown.Item>
                <Dropdown.Item as={Link} to="/flash"><CardChecklist /> Thẻ ghi nhớ</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="light">Chủ đề</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="#">Toán học</Dropdown.Item>
                <Dropdown.Item as={Link} to="#">Văn học</Dropdown.Item>
                <Dropdown.Item as={Link} to="#">Lịch sử</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="search">
            <input type="text" placeholder="Tìm kiếm" />
            <button className="search-button">
              <Search />
            </button>
          </div>

          <div className="user-menu">
            {userName ? (
              <>
                <span>Xin chào, {userName}</span>
                <Dropdown>
                  <Dropdown.Toggle variant="light">
                    <img src="path_to_avatar.jpg" alt="User Avatar" className="avatar" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">Hồ sơ</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/mycourse">Các quiz đã thích</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/upgrade">Nâng cấp</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <Link to="/login">
                <button className="login-button">Đăng nhập</button>
              </Link>
            )}
          </div>
        </div>
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
      </header>
    </>
  );
};

export default Header;
