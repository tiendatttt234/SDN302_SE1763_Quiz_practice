// src/components/admin/adminComponents/ModalEditUser.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalEditUser = ({ show, onClose, user, onEditUser }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleUpdate = () => {
    onEditUser(updatedUser);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={updatedUser.email} 
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} 
            />
          </Form.Group>
          <Form.Group controlId="formFullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control 
              type="text" 
              value={updatedUser.fullname} 
              onChange={(e) => setUpdatedUser({ ...updatedUser, fullname: e.target.value })} 
            />
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control 
              as="select" 
              value={updatedUser.gender} 
              onChange={(e) => setUpdatedUser({ ...updatedUser, gender: e.target.value })}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control 
              as="select" 
              value={updatedUser.status} 
              onChange={(e) => setUpdatedUser({ ...updatedUser, status: e.target.value })}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleUpdate}>Update User</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditUser;
