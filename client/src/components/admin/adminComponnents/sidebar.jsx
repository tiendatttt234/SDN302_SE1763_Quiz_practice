import React from "react";
import { NavLink } from "react-router-dom"; // Change import from Link to NavLink
import { Nav } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaUsers,
  FaShoppingCart,
  FaBox,
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons

import "../adminCSS/sidebar.css";

const Sidebar = () => {
  const adminName = "Admin Name"; // Replace with the actual admin name or prop

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
          to="/admin/blog"
          className="admin-nav-link"
          activeClassName="active"
        >
          <FaUsers className="admin-sidebar-icon" /> Blog Management
        </NavLink>
      </Nav.Item>
     
      <div className="admin-info">
        <span className="admin-name">{adminName}</span>
        <Nav.Item className="logout-button">
          <NavLink
            to="/"
            className="admin-nav-link"
            activeClassName="active"
          >
            <FaSignOutAlt className="admin-sidebar-icon" /> Logout
          </NavLink>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default Sidebar;
