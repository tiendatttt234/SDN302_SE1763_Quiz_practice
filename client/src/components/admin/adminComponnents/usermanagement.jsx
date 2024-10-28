import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import ModalAddNewUser from "./modalAdd";
import ModalEditUser from "./modalEdit";
import ModalDeleteUser from "./modalDelete";
import Sidebar from "./sidebar"; // Import Sidebar
import "../adminCSS/usermanagement.css"; // Import CSS cho User Management
import { FaSortUp, FaSortDown } from "react-icons/fa"; // Import icons for sorting

const fakeUsers = [
  {
    id: 1,
    email: "user1@example.com",
    fullname: "User One",
    gender: "Male",
    status: "Active",
  },
  {
    id: 2,
    email: "user2@example.com",
    fullname: "User Two",
    gender: "Female",
    status: "Inactive",
  },
  {
    id: 3,
    email: "user3@example.com",
    fullname: "User Three",
    gender: "Male",
    status: "Active",
  },
  {
    id: 4,
    email: "user4@example.com",
    fullname: "User Four",
    gender: "Female",
    status: "Inactive",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(fakeUsers);
  const [searchName, setSearchName] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
    setShowAddModal(false);
  };

  const handleEditUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setShowEditModal(false);
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    setShowDeleteModal(false);
  };

  // Hàm lọc người dùng
  const filteredUsers = users.filter((user) => {
    const matchesName = user.fullname
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesGender = genderFilter ? user.gender === genderFilter : true;
    const matchesStatus = statusFilter ? user.status === statusFilter : true;

    return matchesName && matchesGender && matchesStatus;
  });

  // Hàm sắp xếp
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Hàm thay đổi trạng thái sắp xếp
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="user-management">
      <Sidebar /> {/* Sidebar được nhúng */}
      <div className="content">
        <h2>User Management</h2>

        <div className="search-bar mb-3 d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="me-2" // Cách với các bộ lọc
          />
          <Form.Select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            aria-label="Filter by Gender"
            className="me-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Select>

          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by Status"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Select>
        </div>

        <Button
          variant="success"
          className="mb-3"
          onClick={() => setShowAddModal(true)}
        >
          Add New User
        </Button>

        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th
                onClick={() => requestSort("id")}
                style={{ cursor: "pointer" }}
              >
                ID
                {sortConfig.key === "id" &&
                  (sortConfig.direction === "asc" ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  ))}
              </th>
              <th>Email</th>
              <th
                onClick={() => requestSort("fullname")}
                style={{ cursor: "pointer" }}
              >
                Full Name
                {sortConfig.key === "fullname" &&
                  (sortConfig.direction === "asc" ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  ))}
              </th>
              <th
                onClick={() => requestSort("gender")}
                style={{ cursor: "pointer" }}
              >
                Gender
                {sortConfig.key === "gender" &&
                  (sortConfig.direction === "asc" ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  ))}
              </th>
              <th
                onClick={() => requestSort("status")}
                style={{ cursor: "pointer" }}
              >
                Status
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "asc" ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  ))}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td> {/* Thêm cột ID */}
                <td>{user.email}</td>
                <td>{user.fullname}</td>
                <td>{user.gender}</td>
                <td>
                  <span
                    className={`status-badge ${
                      user.status === "Active" ? "active" : "inactive"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {" "}
                    {/* Use flex to arrange buttons in a row */}
                    <Button
                      variant="warning"
                      className="w-100 me-1" // Add margin end to create space between buttons
                      onClick={() => {
                        setSelectedUser(user);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="w-100"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modals */}
        <ModalAddNewUser
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddUser={handleAddUser}
        />
        {selectedUser && (
          <ModalEditUser
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            user={selectedUser}
            onEditUser={handleEditUser}
          />
        )}
        {selectedUser && (
          <ModalDeleteUser
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            user={selectedUser}
            onDeleteUser={handleDeleteUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagement;
