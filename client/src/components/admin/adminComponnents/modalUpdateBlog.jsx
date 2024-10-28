import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import _ from "lodash";

const ModalUpdateBlog = (props) => {
  const { show, setShow, fetchData, dataUpdate } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    if (dataUpdate && !_.isEmpty(dataUpdate)) {
      setTitle(dataUpdate.title || ""); // Hiển thị tiêu đề cũ
      setContent(dataUpdate.content || "");
      setIsActive(dataUpdate.isActive || false); // Hiển thị trạng thái cũ
      // Hiển thị nội dung cũ
      setImage(null); // Đặt lại ảnh
      setPreviewImage(
        dataUpdate.image
          ? `http://localhost:9999/public/images/${dataUpdate.image}`
          : ""
      ); // Hiển thị ảnh cũ
    }
  }, [dataUpdate]);

  const handleClose = () => {
    setShow(false);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setPreviewImage("");
    setErrors({});
    setAlertMessage("");
    setShowAlert(false);
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleUpdateBlog = async () => {
    const accountId = localStorage.getItem("userId");
    if (!accountId) {
      setAlertMessage("Không tìm thấy accountId trong localStorage.");
      setShowAlert(true);
      return;
    }
    console.log("accountId from localStorage:", accountId);

    const blogData = new FormData();
    blogData.append("title", title);
    blogData.append("content", content);
    blogData.append("image", image);
    blogData.append("isActive", isActive);
    blogData.append("account", accountId);

    try {
      const response = await fetch(
        `http://localhost:9999/blog/update/${dataUpdate._id}`,
        {
          method: "Put",
          body: blogData,
        }
      );

      const data = await response.json();
      console.log("Server response:", data);
      if (response.ok) {
        setAlertMessage("Blog Update Successully");
        setShowAlert(true);
        resetForm(); // Đặt lại form
        handleClose();
        fetchData(); // Đóng modal sau khi thêm blog thành công
      } else {
        // Xử lý lỗi từ phản hồi của backend
        if (data.error) {
          setAlertMessage(data.error);
        } else {
          setAlertMessage("Lỗi khi thêm blog.");
        }
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      setAlertMessage("Lỗi kết nối đến máy chủ.");
      setShowAlert(true);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert && <Alert variant="success">{alertMessage}</Alert>}
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formContent" className="mt-3">
            <Form.Label>Content</Form.Label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Enter blog content..."
            />
            {errors.content && (
              <div className="text-danger mt-2">{errors.content}</div>
            )}
          </Form.Group>

          <Form.Group controlId="formIsActive" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </Form.Group>

          <Form.Group controlId="formImage" className="mt-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleUploadImage}
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>
            {previewImage && (
              <img
                src={previewImage}
                alt="preview"
                style={{ width: "100%", marginTop: "10px" }}
              />
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancle
        </Button>
        <Button variant="primary" onClick={handleUpdateBlog}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateBlog;
