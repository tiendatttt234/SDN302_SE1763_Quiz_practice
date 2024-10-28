import React, { useState, useEffect } from "react";
import axios from "axios";

const PasswordChange = ({ userName }) => {
  const [showInputs, setShowInputs] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async () => {
    try {
      setIsLoading(true);
      setMessage({ text: "", type: "" }); // Clear previous messages

      // Simple required field validation
      if (!oldPassword || !newPassword) {
        setMessage({
          text: "Vui lòng điền đầy đủ thông tin",
          type: "error",
        });
        return;
      }

      // Make sure userName is available
      const userNameFromStorage = localStorage.getItem("userName");
      if (!userNameFromStorage) {
        setMessage({
          text: "Không tìm thấy thông tin người dùng",
          type: "error",
        });
        return;
      }

      const response = await axios.put(
        `http://localhost:9999/account/changepass/${userNameFromStorage}`,
        {
          oldPassword,
          newPassword,
        }
      );

      if (response.data.status) {
        setMessage({
          text: response.data.message,
          type: "success",
        });
        setShowInputs(false);
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      console.error("Password change error:", error);
      setMessage({
        text: error.response?.data?.message || "Có lỗi xảy ra khi đổi mật khẩu",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          opacity: isLoading ? 0.7 : 1,
        }}
        onClick={() => setShowInputs(!showInputs)}
        disabled={isLoading}
      >
        Đổi mật khẩu
      </button>

      {message.text && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
          }}
        >
          {message.text}
        </div>
      )}

      {showInputs && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="password"
            placeholder="Mật khẩu hiện tại"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isLoading}
          />

          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              opacity: isLoading ? 0.7 : 1,
              marginRight: "10px",
            }}
            onClick={handlePasswordChange}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Xác nhận"}
          </button>

          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
            onClick={() => {
              setShowInputs(false);
              setOldPassword("");
              setNewPassword("");
              setMessage({ text: "", type: "" });
            }}
            disabled={isLoading}
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
};
const Profile = () => {
  const [userData, setUserData] = useState({
    userName: "",
    phone: "",
    email: "",
    birthday: "",
  });
  const [editStates, setEditStates] = useState({
    email: false,
    userName: false,
    phone: false,
  });
  const [editValues, setEditValues] = useState({
    email: "",
    userName: "",
    phone: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userName = localStorage.getItem("userName");
      const response = await axios.get(
        `http://localhost:9999/account/${userName}`
      );
      setUserData(response.data);
      setEditValues({
        email: response.data.email,
        userName: response.data.userName,
        phone: response.data.phone,
      });
    } catch (error) {
      showMessage("Error fetching user data", "error");
    }
  };

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleEditToggle = (field) => {
    setEditStates((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleFieldUpdate = async (field) => {
    try {
      const userName = localStorage.getItem("userName");
      const response = await axios.patch(
        `http://localhost:9999/account/${userName}/field`,
        {
          field,
          value: editValues[field],
        }
      );

      if (response.data.success) {
        setUserData((prev) => ({
          ...prev,
          [field]: editValues[field],
        }));
        handleEditToggle(field);
        showMessage(`${field} updated successfully`);
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || `Error updating ${field}`,
        "error"
      );
    }
  };

  return (
    <div
      style={{
        width: "60%",
        margin: "50px auto",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      {message.text && (
        <div
          className={`p-4 mb-4 rounded ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Ảnh hồ sơ</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            alt="Profile picture"
            src={
              userData.avatar?.[0] ||
              "http://pm1.aminoapps.com/7239/b508c8e2b879561f650574466b86531cc90138d9r1-768-768v2_uhq.jpg"
            }
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              margin: "10px",
              objectFit: "cover",
            }}
          />
          <input type="file" accept="image/*" style={{ marginTop: "10px" }} />
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
          Thông tin cá nhân
        </h2>

        {/* Email Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <label style={{ flex: 1, textAlign: "left" }}>Email:</label>
          {editStates.email ? (
            <div
              style={{
                flex: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <input
                type="text"
                value={editValues.email}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                style={{ flex: 1, marginRight: "10px" }} // Adjusted input style
              />
              <button
                onClick={() => handleFieldUpdate("email")}
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                }}
              >
                Save
              </button>
              <button
                onClick={() => handleEditToggle("email")}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              style={{
                flex: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{userData.email}</span>
              <button
                onClick={() => handleEditToggle("email")}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Username Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <label style={{ flex: 1, textAlign: "left" }}>Username:</label>
          {editStates.userName ? (
            <div
              style={{
                flex: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <input
                type="text"
                value={editValues.userName}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    userName: e.target.value,
                  }))
                }
                style={{ flex: 1, marginRight: "10px" }} // Adjusted input style
              />
              <button
                onClick={() => handleFieldUpdate("userName")}
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                }}
              >
                Save
              </button>
              <button
                onClick={() => handleEditToggle("userName")}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              style={{
                flex: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{userData.userName}</span>
              <button
                onClick={() => handleEditToggle("userName")}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Phone Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <span style={{ flex: 1, textAlign: "left" }}>Phone:</span>
          {editStates.phone ? (
            <div
              style={{
                flex: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <input
                type="text"
                value={editValues.phone}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                style={{ flex: 1, marginRight: "10px" }} // Adjusted input style
              />
              <button
                onClick={() => handleFieldUpdate("phone")}
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                }}
              >
                Save
              </button>
              <button
                onClick={() => handleEditToggle("phone")}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              style={{
                flex: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{userData.phone}</span>
              <button
                onClick={() => handleEditToggle("phone")}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>

      <PasswordChange />
    </div>
  );
};

export default Profile;
