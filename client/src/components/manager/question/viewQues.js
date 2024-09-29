import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../managerCSS/manaques.css'; // Đảm bảo tạo file CSS này

function ManageQuestion() {
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
      const response = await fetch('http://localhost:9999/questions');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      const sortedData = data.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      setQuestionSets(sortedData);
    } catch (error) {
      console.error('Error fetching question sets:', error);
      setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/managerdb/viewques/${id}`);
  };

  const handleAddNew = () => {
    navigate('/managerdb/question');
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="manage-question">
      <h1>Quản lý Câu hỏi</h1>
      <button className="add-new-button" onClick={handleAddNew}>Thêm Mới</button>
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
                <button onClick={() => handleViewDetail(set.id)}>Xem chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageQuestion;