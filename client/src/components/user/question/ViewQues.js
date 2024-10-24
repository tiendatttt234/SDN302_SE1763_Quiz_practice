import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react"; // Import Trash icon from lucide-react
import "../UserCSS/Question/ViewQues.css"; // Đảm bảo tạo file CSS này

function ViewQuestion() {
  const [questionSets, setQuestionSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestionSets();
  }, []);

  const fetchQuestionSets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:9999/questions");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const sortedData = data.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      setQuestionSets(sortedData);
    } catch (error) {
      console.error("Error fetching question sets:", error);
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
      `Xóa học phần này?\n\nBạn sắp xoá học phần này và toàn bộ dữ liệu trong đó. Không ai có thể truy cập vào học phần này nữa.\n\nBạn có chắc chắn không? Bạn sẽ không được hoàn tác.`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:9999/questions/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setQuestionSets((prev) => prev.filter((set) => set.id !== id));
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
      <h1>Quản lý Học Phần</h1>
      <button className="add-new-button" onClick={handleAddNew}>
        Thêm Mới
      </button>
      <table className="question-table">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Mô tả</th>
            <th>Số câu hỏi</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {questionSets.map((set) => (
            <tr key={set.id}>
              <td>{set.title}</td>
              <td>{set.description}</td>
              <td>{set.questions.length}</td>
              <td>
                <button onClick={() => handleViewDetail(set.id)}>
                  Xem chi tiết
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(set.id)}
                  style={{ marginLeft: "10px", background: "none", border: "none" }}
                >
                  <i class="bi bi-trash" style={{ color: "black" }}></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="back-button" onClick={handleBack}>
        Trở về
      </button>
    </div>
  );
}

export default ViewQuestion;
