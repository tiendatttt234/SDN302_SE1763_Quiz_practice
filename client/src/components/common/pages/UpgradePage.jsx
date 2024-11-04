import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UpgradePage.css';

const UpgradePage = () => {
  const navigate = useNavigate();

  const handleUpgradeClick = () => {
    navigate('/checkout');
  };

  return (
    <div className="upgrade-container">
      <h1 className="upgrade-title">Cách nhanh nhất để đạt điểm cao hơn</h1>
      <p className="upgrade-subtitle">Đạt điểm cao hơn với nền tảng học tập số 1</p>
      
      <div className="upgrade-card">
        <div className="plan-column">
          <h2 className="plan-title">QuizletPlus</h2>
          <ul className="features-list">
            <li>✔ Hàng triệu thẻ ghi nhớ</li>
            <li>✔ Câu hỏi mẫu được cá nhân hóa</li>
            <li>✔ Lời giải từng bước cho sách giáo khoa</li>
            <li>✔ Loại bỏ quảng cáo khi học</li>
          </ul>
          <p className="price">Giá từ 2.99 US$/tháng</p>
          <button className="upgrade-button" onClick={handleUpgradeClick}>
            Đăng ký ngay
          </button>
        </div>
        
        <div className="plan-column basic-plan">
          <h2 className="plan-title">Quizlet</h2>
          <ul className="features-list">
            <li>✔ Giới hạn</li>
          </ul>
          <button className="basic-button">Không nâng cấp</button>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
