
import React from 'react';
import { Link} from 'react-router-dom';
import '../dashboard/dashboard.css';  


function ManagerDashboard() {
  return (
    <div>
      <h1>Manager Dashboard</h1>
      <nav>
        <Link to="/managerdb/manaques">Quản lý tệp câu hỏi</Link> |
        <Link to="/managerdb/question">Tạo câu hỏi</Link> |
        <Link to="/managerdb/results">Xem kết quả người dùng</Link>
      </nav>
    </div>
  );
}

export default ManagerDashboard;
