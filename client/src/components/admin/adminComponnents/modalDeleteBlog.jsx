import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const ModalDeleteBlog = (props) => {
  const { show, setShow, dataDelete, fetchData } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:9999/blog/delete/${dataDelete._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      // Kiểm tra phản hồi từ server
      if (response.ok && data.success) {
        toast.success("Blog deleted successfully!"); // Hiển thị thông báo thành công
        handleClose(); // Đóng modal
        fetchData(); // Làm mới danh sách blog sau khi xóa
      } else {
        toast.error(data.message || "Failed to delete blog"); // Hiển thị thông báo lỗi
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Server error. Unable to delete blog."); // Thông báo lỗi kết nối server
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this blog? Title:
          <b>{dataDelete && dataDelete.title ? dataDelete.title : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmitDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteBlog;
