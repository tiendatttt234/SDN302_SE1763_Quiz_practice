import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import "./adminCSS/adminProfit.css"; // Để style tùy chỉnh cho màn hình admin

function AdminProfit() {
  const [profits, setProfits] = useState([]);

  useEffect(() => {
    // Giả lập fetch từ API (có thể thay thế bằng API thực tế)
    const fetchProfitData = async () => {
      const data = [
        { month: "January", revenue: 5000, cost: 3000, profit: 2000 },
        { month: "February", revenue: 6000, cost: 3500, profit: 2500 },
        { month: "March", revenue: 7000, cost: 4000, profit: 3000 },
        // ... add more data as needed
      ];
      setProfits(data);
    };

    fetchProfitData();
  }, []);

  return (
    <Container>
      <h2>Profit Overview</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>Revenue ($)</th>
            <th>Cost ($)</th>
            <th>Profit ($)</th>
          </tr>
        </thead>
        <tbody>
          {profits.map((profit, index) => (
            <tr key={index}>
              <td>{profit.month}</td>
              <td>{profit.revenue}</td>
              <td>{profit.cost}</td>
              <td>{profit.profit}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminProfit;
