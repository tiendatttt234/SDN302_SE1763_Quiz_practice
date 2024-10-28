import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../adminCSS/uploadQuestion.css'

const ImportFilePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [name, setName] = useState(""); // State for question bank name
  const [description, setDescription] = useState(""); // State for description
  const [isEditing, setIsEditing] = useState(false);

  // Xử lý chọn file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    readFileContent(file);
  };

  // Đọc nội dung file
  const readFileContent = (file) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      setFileContent(e.target.result);
      setIsEditing(true); // Enable editing after loading
    };

    fileReader.readAsText(file);
  };

  // Hàm lưu nội dung file đã chỉnh sửa cùng với thông tin bổ sung từ form
  const handleSave = async () => {
    if (!selectedFile || !name) {
      toast.error("Please select a file and fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", name);
    formData.append("description", description);

    try {
      const response = await axios.post("http://localhost:9999/questionFile/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("File uploaded and saved successfully!");
      console.log("Response from server:", response.data);
      setIsEditing(false);
      setName("");
      setDescription("");
      setSelectedFile(null);
      setFileContent("");
    } catch (error) {
      toast.error("Failed to save file.");
      console.error("Error saving file:", error);
    }
  };

  const handleContentChange = (event) => {
    setFileContent(event.target.value);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Import, Edit, and Upload File</h2>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Question Bank Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          placeholder="Enter the name of the question bank"
        />

        <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          placeholder="Enter a description for the question bank"
          rows="3"
        />
      </div>

      <input 
        type="file" 
        onChange={handleFileChange} 
        style={{ marginBottom: '10px' }}
      />
      
      {isEditing && (
        <>
          <h3>File Content (Editable):</h3>
          <textarea
            value={fileContent}
            onChange={handleContentChange}
            rows="10"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          
          <button onClick={handleSave} style={{ marginBottom: '20px' }}>
            Upload and Save to Database
          </button>
        </>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default ImportFilePage;
