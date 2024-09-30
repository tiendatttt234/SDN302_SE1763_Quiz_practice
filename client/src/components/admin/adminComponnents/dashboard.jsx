import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import Sidebar from './sidebar'; // Import Sidebar
import '../adminCss/dashboard.css'; // Import CSS for Statistics
import { FaSortUp, FaSortDown } from 'react-icons/fa'; // Import icons for sorting

// Fake statistics data
const fakeStatistics = [
  { id: 1, metric: 'Total Users', value: 100 },
  { id: 2, metric: 'Active Users', value: 80 },
  { id: 3, metric: 'Inactive Users', value: 20 },
  { id: 4, metric: 'Total Orders', value: 150 },
];

const Dashboard = () => {
  const [statistics, setStatistics] = useState(fakeStatistics);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  // Sorting function
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort the statistics
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
      <Sidebar /> {/* Sidebar */}
      <div className="content">
        <h2>Statistics</h2>

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
