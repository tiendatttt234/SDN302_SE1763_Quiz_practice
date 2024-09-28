import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Button } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();

  // Use useEffect to handle redirect if no results are passed
  useEffect(() => {
    if (!location.state || !location.state.results) {
      navigate("/no-access"); // Redirect to quiz page
    }
  }, [location, navigate]);

  if (!location.state || !location.state.results) {
    // Avoid rendering anything if there's no data
    return null;
  }

  const results = location.state.results;
  const correctCount = results.filter((result) => result.isCorrect).length;
  const totalCount = results.length;

  // Pie chart data
  const data = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [correctCount, totalCount - correctCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="quiz-result-page text-center">
      <h2>Your Quiz Results</h2>
      <p>
        Correct Answers: {correctCount} / {totalCount}
      </p>
      <div style={{ width: "300px", margin: "auto" }}>
        <Pie data={data} />
      </div>
      <div className="mt-4">
        <Button variant="primary" onClick={() => navigate("/")}>
          Go to Quiz
        </Button>
      </div>
    </div>
  );
}
