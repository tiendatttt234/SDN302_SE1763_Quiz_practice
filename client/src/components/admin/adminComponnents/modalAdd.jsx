import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalAddNewUser = ({ open, onClose, onAddUser }) => {
  const [newUser, setNewUser] = useState({
    email: '',
    phone: '',
    username: '',
    password: '',
    avatar: '',
    role: '' // Single role instead of roles array
  });

  const handleSave = async () => {
    // Validate required fields before sending the request
    if (!newUser.email || !newUser.username || !newUser.password || !newUser.role) {
      toast.error("Please fill out all required fields (Email, Username, Password, Role)!", { position: 'top-right' });
      return;
    }

    try {
      const response = await fetch('http://localhost:9999/account/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          errorData.errors.forEach((err) => {
            toast.error(err, { position: 'top-right' });
          });
        } else {
          throw new Error(errorData.message || 'Failed to add new account');
        }
      } else {
        const data = await response.json();
        onAddUser(data.account);
        setNewUser({ email: '', phone: '', username: '', password: '', avatar: '', role: '' }); // Reset form
        toast.success('Account created successfully!', { position: 'top-right' });
        onClose(); // Close modal after successful save
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to add new account: ${error.message}`, { position: 'top-right' });
    }
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </Form.Group>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              placeholder="Enter username"
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="Enter password"
              required
            />
          </Form.Group>
          <Form.Group controlId="formAvatar" className="mb-3">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control
              type="text"
              value={newUser.avatar}
              onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
              placeholder="Enter avatar URL"
            />
          </Form.Group>
          <Form.Group controlId="formRole" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="form-select"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Account</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddNewUser;
