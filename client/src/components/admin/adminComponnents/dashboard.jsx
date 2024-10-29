import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Sidebar from './sidebar';
import '../adminCSS/dashboard.css';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Fake statistics data
const fakeStatistics = [
  { id: 1, metric: 'Total Users', value: 100 },
  { id: 2, metric: 'Active Users', value: 80 },
  { id: 3, metric: 'Inactive Users', value: 20 },
  { id: 4, metric: 'Total Quizzes', value: 200 },
  { id: 5, metric: 'Total Questions', value: 1000 },
  { id: 6, metric: 'Total Attempts', value: 1500 },
];

// Pie chart colors
const COLORS = {
  active: '#28a745',   // Green for active users
  inactive: '#dc3545', // Red for inactive users
  quizTaken: '#007bff', // Blue for quiz taken
  quizNotTaken: '#ffc107', // Yellow for quiz not taken
};

// Chart options to maintain aspect ratio and responsiveness
const chartOptions = {
  maintainAspectRatio: true,
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

// Data for pie charts
const activeInactiveData = {
  labels: ['Active Users', 'Inactive Users'],
  datasets: [
    {
      data: [80, 20],
      backgroundColor: [COLORS.active, COLORS.inactive],
      hoverBackgroundColor: [COLORS.active, COLORS.inactive],
    },
  ],
};

const quizData = {
  labels: ['Quiz Taken', 'Quiz Not Taken'],
  datasets: [
    {
      data: [60, 40],
      backgroundColor: [COLORS.quizTaken, COLORS.quizNotTaken],
      hoverBackgroundColor: [COLORS.quizTaken, COLORS.quizNotTaken],
    },
  ],
};

// Data for bar chart (e.g., popular quizzes)
const popularQuizzesData = {
  labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5'],
  datasets: [
    {
      label: 'Attempts',
      data: [50, 75, 30, 90, 45],
      backgroundColor: '#007bff',
    },
  ],
};

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

  return (
    <div className="statistics">
      <Sidebar />
      <div className="content">
        <h2>Dashboard - Quiz App Statistics</h2>

        {/* Quick Stats Boxes */}
        <div className="stat-boxes">
          <div className="stat-box">
            <h3>Total Users</h3>
            <p>1,024</p>
          </div>
          <div className="stat-box">
            <h3>Total Quizzes</h3>
            <p>200</p>
          </div>
          <div className="stat-box">
            <h3>Total Questions</h3>
            <p>1,000</p>
          </div>
          <div className="stat-box">
            <h3>Total Attempts</h3>
            <p>1,500</p>
          </div>
        </div>

        {/* Pie Charts */}
        <div className="chart-container">
          <div className="chart">
            <h3>User Activity</h3>
            <Pie data={activeInactiveData} options={chartOptions} />
          </div>
          <div className="chart">
            <h3>Quiz Participation</h3>
            <Pie data={quizData} options={chartOptions} />
          </div>
          <div className="chart popular-chart"> {/* Centered Popular Quizzes chart */}
            <h3>Popular Quizzes</h3>
            <Bar data={popularQuizzesData} options={chartOptions} />
          </div>
        </div>

        {/* Data Table */}
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
            {sortedStatistics.map((stat) => (
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
