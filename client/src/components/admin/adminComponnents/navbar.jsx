// src/components/admin/adminComponents/AdminNavbar.jsx
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminNavbar = ({ adminName }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Admin Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto"> {/* Thay ml-auto thành ms-auto để đẩy sang bên phải */}
          <Nav.Link disabled>welcome: Admin 1</Nav.Link>
        
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
