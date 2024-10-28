import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import "../UserCSS/Question/ViewQues.css";

function ViewQuestion() {
  const [questionSets, setQuestionSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Giả sử có danh sách câu hỏi trong một mảng `questionFiles`
  const filteredQuestionFiles = questionSets.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    fetchQuestionSets();
  }, []);

  const fetchQuestionSets = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:9999/questionFile/getAll?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuestionSets(data.questionFileRespone);
    } catch (error) {
      setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/user/viewques/${id}`);
  };

  const handleAddNew = () => {
    navigate("/user/addquestion");
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Xóa học phần này? Bạn có chắc chắn không? Bạn sẽ không được hoàn tác."
    );

    if (isConfirmed) {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:9999/questionFile/delete/${id}?userId=${userId}`,
          { method: "DELETE" }
        );

        if (response.ok) {
          setQuestionSets((prev) => prev.filter((set) => set._id !== id));
        } else {
          console.error("Error deleting question set");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="manage-question">
      <h1>Thư viện của bạn</h1>
      {/* <p>Tổng số câu hỏi: {questionSets.length}</p> */}
      <div className="actions">
        <button className="add-new-button" onClick={handleAddNew}>
          Thêm Học Phần Mới
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="question-set-container">
        {filteredQuestionFiles.map((set) => (
          <div className="question-card" key={set._id} onClick={() => handleViewDetail(set._id)}>
            <div className="card-info">
              <span>{set.arrayQuestion?.length || 0} thuật ngữ</span> | 
              <span>{set.description}</span> 
            </div>
            <h2>{set.name}</h2>
            <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(set._id); }}>
              <Trash size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* <button className="back-button" onClick={handleBack}>
        Trở về
      </button> */}
    </div>
  );
}

export default ViewQuestion;
