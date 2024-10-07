// src/components/admin/adminComponents/ModalAddNewUser.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalAddNewUser = ({ open, onClose, onAddUser }) => {
  const [newUser, setNewUser] = useState({ email: '', fullname: '', gender: '', status: 'Active' });

  const handleSave = () => {
    onAddUser(newUser);
    setNewUser({ email: '', fullname: '', gender: '', status: 'Active' }); // Reset form
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={newUser.email} 
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
            />
          </Form.Group>
          <Form.Group controlId="formFullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control 
              type="text" 
              value={newUser.fullname} 
              onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })} 
            />
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control 
              as="select" 
              value={newUser.gender} 
              onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control 
              as="select" 
              value={newUser.status} 
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save User</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddNewUser;
