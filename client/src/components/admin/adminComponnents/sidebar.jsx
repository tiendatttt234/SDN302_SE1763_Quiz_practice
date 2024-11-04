import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Thêm useNavigate
import { Nav } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons

import "../adminCSS/sidebar.css";
import { toast } from "react-toastify"; // Import toast for notifications

const Sidebar = () => {
  const adminName = "Admin Name"; // Replace with the actual admin name or prop
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("roles");
    localStorage.removeItem("userId");
    toast.success("Đăng xuất thành công!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Nav className="flex-column admin-sidebar">
      <Nav.Item>
        <NavLink
          to="/admin/dashboard"
          className="admin-nav-link"
          activeClassName="active"
        >
          <FaTachometerAlt className="admin-sidebar-icon" /> Dashboard
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to="/admin/users"
          className="admin-nav-link"
          activeClassName="active"
        >
          <FaUsers className="admin-sidebar-icon" /> User Management
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to="/admin/manage/blog"
          className="admin-nav-link"
          activeClassName="active"
        >
          <FaUsers className="admin-sidebar-icon" /> Blog Management
        </NavLink>
      </Nav.Item>

      <div className="admin-info">
        <span className="admin-name">{adminName}</span>
        <Nav.Item className="logout-button">
          <button
            onClick={handleLogout}
            className="admin-nav-link logout-link"
          >
            <FaSignOutAlt className="admin-sidebar-icon" /> Logout
          </button>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default Sidebar;
