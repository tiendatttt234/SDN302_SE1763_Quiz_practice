import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import ModalAddNewUser from './modalAdd';
import ModalEditUser from './modalEdit';
import ModalDeleteUser from './modalDelete';
import Sidebar from './sidebar';
import '../adminCSS/usermanagement.css';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Gọi API để lấy danh sách người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:9999/account/list');
        const data = await response.json();
        setUsers(data.accounts); // Gán dữ liệu người dùng từ API vào state users
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
    setShowAddModal(false);
  };

  const handleEditUser = (updatedUser) => {
    setUsers((prev) => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
    setShowEditModal(false);
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter(user => user.id !== id));
    setShowDeleteModal(false);
  };

  const filteredUsers = users.filter(user => {
    const matchesName = user.username.toLowerCase().includes(searchName.toLowerCase());
    const matchesRole = roleFilter ? user.roles.some(role => role.name === roleFilter) : true;
    return matchesName && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="user-management">
      <Sidebar />
      <div className="content">
        <h2>User Management</h2>

        <div className="search-bar mb-3 d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="me-2"
          />
          <Form.Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            aria-label="Filter by Role"
            className="me-2"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            {/* Thêm các role khác nếu cần */}
          </Form.Select>
        </div>

        <Button variant="success" className="mb-3" onClick={() => setShowAddModal(true)}>Add New User</Button>

        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th onClick={() => requestSort('id')} style={{ cursor: 'pointer' }}>
                ID
                {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th>Email</th>
              <th onClick={() => requestSort('username')} style={{ cursor: 'pointer' }}>
                Username
                {sortConfig.key === 'username' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th>Avatar</th>
              <th onClick={() => requestSort('roles')} style={{ cursor: 'pointer' }}>
                Roles
                {sortConfig.key === 'roles' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td><img src={user.avatar} alt="Avatar" style={{ width: '50px', height: '50px' }} /></td>
                <td>{user.roles.map(role => role.name).join(', ')}</td>
                <td>
                  <Button variant="warning" onClick={() => { setSelectedUser(user); setShowEditModal(true); }}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modals */}
        <ModalAddNewUser open={showAddModal} onClose={() => setShowAddModal(false)} onAddUser={handleAddUser} />
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
