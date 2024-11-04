// src/components/admin/adminComponents/ModalDeleteUser.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalDeleteUser = ({ show, onClose, onDeleteUser, user }) => {
  const handleDelete = () => {
    onDeleteUser(user.id);
    onClose(); // Đóng modal sau khi xóa
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the user <strong>{user ? user.fullname : ''}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteUser;
