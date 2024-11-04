import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [questionSets, setQuestionSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // State cho trang hiện tại
  const itemsPerPage = 4; // Số lượng thẻ câu hỏi hiển thị mỗi trang
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestionSets();
  }, []);

  const fetchQuestionSets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:9999/questionFile/list`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const data = await response.json();
      setQuestionSets(data.questionFiles);
    } catch (error) {
      console.error("Error fetching question sets:", error);
      setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/flash/${id}`);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1); // Chuyển sang trang tiếp theo
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1); // Quay lại trang trước
    }
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Tính toán chỉ số bắt đầu và kết thúc cho các thẻ cần hiển thị
  const startIndex = currentPage * itemsPerPage;
  const currentItems = questionSets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fc', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <div className="section" style={{ marginBottom: '40px' }}>
        <div className="card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {currentItems.map((set) => (
            <div
              key={set._id}
              className="card"
              style={cardStyle}
              onClick={() => handleCardClick(set._id)}
            >
              <h3 style={cardTitleStyle}>{set.name}</h3>
              <div className="tags" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div className="tag" style={tagStyle}>{set.arrayQuestion?.length || 0} thuật ngữ</div>
              </div>
              <div className="user" style={userStyle}>
                <img
                  src="https://storage.googleapis.com/a1aa/image/9o6qArE85p6qH9betiMeReHKo95GaSiTgI7uJa2PuxeaS00OB.jpg"
                  alt="User avatar"
                  style={userImgStyle}
                />
                <span>{set.createdBy?.userName || 'Unknown'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Nút điều hướng */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Quay lại
        </button>
        <button onClick={handleNextPage} disabled={startIndex + itemsPerPage >= questionSets.length}>
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#fff',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
};

const cardTitleStyle = {
  fontSize: '18px',
  margin: '0 0 10px',
};

const tagStyle = {
  backgroundColor: '#e0e7ff',
  color: '#4f46e5',
  padding: '5px 10px',
  borderRadius: '12px',
  fontSize: '12px',
};

const userStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const userImgStyle = {
  borderRadius: '50%',
  width: '30px',
  height: '30px',
};

export default Homepage;
