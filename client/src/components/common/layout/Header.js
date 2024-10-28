import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import { Dropdown } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(null);
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
    // Add event listener for storage changes
    window.addEventListener("storage", loadUserData);
    return () => window.removeEventListener("storage", loadUserData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("roles");
    setUserName("");
    setUserRole(null);
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

  const renderRoleBasedLinks = () => {
    if (!userRole) return null;

    const roleName = userRole.name.toLowerCase();
    switch (roleName) {
      case "admin":
        return (
          <>
            <Link
              to="/admin"
              className="nav-link"
              style={{
                color: "#333",
                textDecoration: "none",
                marginRight: "20px",
              }}
            >
              Admin
            </Link>
          </>
        );
      case "manager":
        return (
          <>
            <Link
              to="/managerdb"
              className="nav-link"
              style={{
                color: "#333",
                textDecoration: "none",
                marginRight: "20px",
              }}
            >
              Manager
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
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
          padding: "5px 10px",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 style={{ margin: 0 }}>Quiz</h1>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {renderRoleBasedLinks()}
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Công cụ
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/blogList">
                Blog
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/flash">
                Thẻ ghi nhớ
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Chủ đề
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="#">
                Toán học
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="#">
                Văn học
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="#">
                Lịch sử
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div
          className="search"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="text"
            placeholder="Tìm kiếm"
            style={{ padding: "5px", width: "300px" }}
          />
          <button
            style={{
              backgroundColor: "rgb(66,85,255)",
              borderRadius: "20%",
              padding: "6px",
            }}
          >
            <Search />
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {userName ? (
            <>
              <span>Xin chào, {userName}</span>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-avatar">
                  <img
                    src="http://pm1.aminoapps.com/7239/b508c8e2b879561f650574466b86531cc90138d9r1-768-768v2_uhq.jpg"
                    alt="User Avatar"
                    style={{ width: "40px", borderRadius: "50%" }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    Hồ sơ
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/mycourse">
                    Các quiz đã thích
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/upgrade">
                    Nâng cấp
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <Link to="/login">
              <button
                style={{
                  padding: "5px 10px",
                  backgroundColor: "rgb(66,85,255)",
                  borderRadius: "10px",
                }}
              >
                Đăng nhập
              </button>
            </Link>
          )}
        </div>
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
