import React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import "./NavBar.css"; // Import the CSS file for styles

const NavBar = () => {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey={"one"}>
      <Row>
        <Col sm={2} style={{ backgroundColor: "#23282d", height: "100vh" }}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="one">Trang chủ</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="two">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="three">Quản lí bài đăng</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="four">Quản lí người dùng</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="five">Cài đặt</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="one">
              <h1>Home</h1>
            </Tab.Pane>
            <Tab.Pane eventKey="two"></Tab.Pane>
            <Tab.Pane eventKey="three"></Tab.Pane>
            <Tab.Pane eventKey="four"></Tab.Pane>
            <Tab.Pane eventKey="five">
              <h1>Settings Content</h1>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default NavBar;
