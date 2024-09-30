import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Sidebar from './sidebar';
import '../adminCss/dashboard.css';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';

// Fake statistics data
const fakeStatistics = [
  { id: 1, metric: 'Total Users', value: 100 },
  { id: 2, metric: 'Active Users', value: 80 },
  { id: 3, metric: 'Inactive Users', value: 20 },
  { id: 4, metric: 'Total Orders', value: 150 },
];

// Pie chart colors
const COLORS = {
  active: '#28a745',   // Green for active users
  inactive: '#dc3545', // Red for inactive users
  quizTaken: '#007bff', // Blue for quiz taken
  quizNotTaken: '#ffc107', // Yellow for quiz not taken
};

// Dashboard component
const Dashboard = () => {
  const [statistics, setStatistics] = useState(fakeStatistics);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedStatistics = [...statistics].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Data for pie charts
  const activeInactiveData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [{
      data: [80, 20],
      backgroundColor: [COLORS.active, COLORS.inactive],
      hoverBackgroundColor: [COLORS.active, COLORS.inactive],
    }],
  };

  const quizData = {
    labels: ['Quiz Taken', 'Quiz Not Taken'],
    datasets: [{
      data: [60, 40], // You can replace this with dynamic values
      backgroundColor: [COLORS.quizTaken, COLORS.quizNotTaken],
      hoverBackgroundColor: [COLORS.quizTaken, COLORS.quizNotTaken],
    }],
  };

  return (
    <div className="statistics">
      <Sidebar /> 
      <div className="content">
        <h2>Dashboard Statistics</h2>

        {/* Flex container for pie charts */}
        <div className="chart-container d-flex justify-content-between mb-4">
          <div className="chart">
            <h3>User Activity</h3>
            <Pie data={activeInactiveData} options={{ maintainAspectRatio: false }} />
          </div>
          <div className="chart">
            <h3>Quiz Participation</h3>
            <Pie data={quizData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th onClick={() => requestSort('id')} style={{ cursor: 'pointer' }}>
                ID 
                {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => requestSort('metric')} style={{ cursor: 'pointer' }}>
                Metric 
                {sortConfig.key === 'metric' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => requestSort('value')} style={{ cursor: 'pointer' }}>
                Value 
                {sortConfig.key === 'value' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedStatistics.map(stat => (
              <tr key={stat.id}>
                <td>{stat.id}</td>
                <td>{stat.metric}</td>
                <td>{stat.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
