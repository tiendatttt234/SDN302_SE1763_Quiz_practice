import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalEditUser = ({ show, onClose, onEditUser, user }) => {
  const [updatedUser, setUpdatedUser] = useState({
    email: '',
    phone: '',
    username: '',
    avatar: '',
    roles: []
  });

  useEffect(() => {
    if (user) {
      console.log("User being edited:", user);
      setUpdatedUser({
        email: user.email || '',
        phone: user.phone || '',
        username: user.username || '',
        avatar: user.avatar || '',
        roles: user.roles || []
      });
    }
  }, [user]);

  const handleSave = async () => {
    // Validate required fields
    if (!updatedUser.email || !updatedUser.username || updatedUser.roles.length === 0) {
      toast.error("Please fill out all required fields (Email, Username, Roles)!", { position: 'top-right' });
      return;
    }

    try {
      const response = await fetch(`http://localhost:9999/account/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          throw new Error(errorData.errors.join(', '));
        } else {
          throw new Error(errorData.message || 'Failed to update account');
        }
      } else {
        const data = await response.json();
        onEditUser(data.account);
        toast.success('Account updated successfully!', { position: 'top-right' });
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to update account: ${error.message}`, { position: 'top-right' });
    }
  };

  const handleRoleChange = (e) => {
    const { options } = e.target;
    const selectedRoles = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedRoles.push(options[i].value);
      }
    }
    setUpdatedUser({ ...updatedUser, roles: selectedRoles });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={updatedUser.email}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={updatedUser.phone}
              onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </Form.Group>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={updatedUser.username}
              onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
              placeholder="Enter username"
              required
            />
          </Form.Group>
          <Form.Group controlId="formAvatar" className="mb-3">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control
              type="text"
              value={updatedUser.avatar}
              onChange={(e) => setUpdatedUser({ ...updatedUser, avatar: e.target.value })}
              placeholder="Enter avatar URL"
            />
          </Form.Group>
          <Form.Group controlId="formRoles" className="mb-3">
            <Form.Label>Roles</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={updatedUser.roles}
              onChange={handleRoleChange}
              className="form-select"
              required
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Control>
            <Form.Text className="text-muted">
              Hold down the Ctrl (Windows) or Command (Mac) key to select multiple roles.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditUser;
