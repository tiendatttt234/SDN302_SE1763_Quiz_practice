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
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:9999/questionFile/getAll?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Dữ liệu nhận được từ server:", data);
 
      
      setQuestionSets(data.questionFileRespone);
    } catch (error) {
      console.error("Error fetching question sets:", error);
      setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(questionSets);

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
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:9999/questionFile/delete/${id}?userId=${userId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setQuestionSets((prev) => prev.filter((set) => set._id !== id)); // Sửa id thành _id
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

  if (!questionSets.length) return (
    <div className="empty-state">
      <h2>Chưa có học phần nào</h2>
      <p>Hãy tạo học phần đầu tiên của bạn</p>
      <button className="add-new-button" onClick={handleAddNew}>
        Thêm Học Phần Mới
      </button>
      <button className="back-button" onClick={handleBack}>
        Trở về
      </button>
    </div>
  );

  return (
    <div className="manage-question">
      <h1>Quản lý Học Phần</h1>
      <div className="actions">
        <button className="add-new-button" onClick={handleAddNew}>
          Thêm Học Phần Mới
        </button>
      </div>

      <table className="question-table">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Mô tả</th>
            <th>Số câu hỏi</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {questionSets.map((set) => (
            <tr key={set._id}>
              <td>{set.name}</td>
              <td>{set.description}</td>
              <td>{set.arrayQuestion?.length || 0}</td>
              <td>{set.isPrivate ? 'Riêng tư' : 'Công khai'}</td>
              <td className="actions-cell">
                <button 
                  className="view-button"
                  onClick={() => handleViewDetail(set._id)}
                >
                  Xem chi tiết
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(set._id)}
                >
                  <Trash size={16} />
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
