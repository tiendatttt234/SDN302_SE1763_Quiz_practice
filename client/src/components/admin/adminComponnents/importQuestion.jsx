import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../adminCSS/uploadQuestion.css";

const ImportFilePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fileKey, setFileKey] = useState(Date.now());
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type !== "text/plain") {
      toast.error("Only .txt files are allowed.");
      setSelectedFile(null);
      setFileContent("");
      setFileKey(Date.now());
      return;
    }

    setSelectedFile(file);
    readFileContent(file);
  };

  const handleSave = async () => {
    if (!selectedFile || !name) {
      toast.error("Please select a file and fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", name);
    formData.append("description", description);

    // Retrieve userId from local storage
    const userId = localStorage.getItem("userId");
    if (userId) {
      formData.append("createdBy", userId);
    }

    try {
      const response = await axios.post(
        "http://localhost:9999/questionFile/upload",
        formData
      );

      if (response) {
        toast.success("File uploaded and saved successfully!");
        setTimeout(() => {
          navigate("/user/viewques");
        }, 1500);
        return;
      }
    } catch (error) {
      toast.error("Failed to save file.");
      console.error("Error saving file:", error);
    }
  };

  const readFileContent = (file) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      setFileContent(e.target.result);
    };
    fileReader.readAsText(file);
  };
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Import and Upload File</h2>
      <div style={{ marginBottom: "15px" }}>
        <label>File Format Instructions:</label>
        <p>
          The file must follow the exact format below for questions and answers:
        </p>
        <p>
          <strong>Q:</strong> Question text
        </p>
        <p>
          <strong>A:</strong> Answer option 1
        </p>
        <p>
          <strong>A:</strong> Answer option 2 (correct)
        </p>
        <p>
          <strong>A:</strong> Answer option 3
        </p>
        <p>
          <i>Note:</i> Mark the correct answer by adding "(correct)" after it.
        </p>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Question Bank Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          placeholder="Enter the name of the question bank"
        />
        <label style={{ display: "block", marginBottom: "5px" }}>
          Description:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          placeholder="Enter a description for the question bank"
          rows="3"
        />
      </div>

      <input
        type="file"
        name="file"
        key={fileKey}
        onChange={handleFileChange}
        style={{ marginBottom: "10px" }}
      />

      {fileContent && (
        <>
          <h3>File Content:</h3>
          <pre
            style={{
              width: "100%",
              marginBottom: "10px",
              background: "#f5f5f5",
              padding: "10px",
              borderRadius: "4px",
              whiteSpace: "pre-wrap",
            }}
          >
            {fileContent}
          </pre>

          <button onClick={handleSave} style={{ marginBottom: "20px" }}>
            Upload and Save to Database
          </button>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default ImportFilePage;
