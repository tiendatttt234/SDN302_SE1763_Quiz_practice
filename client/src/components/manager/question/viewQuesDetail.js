import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../managerCSS/viewquestion.css";

function ViewQuestionDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      setIsLoading(true);
      try {
        // Kiểm tra xem có dữ liệu được truyền qua location state không
        if (location.state?.title && location.state?.description && location.state?.questions) {
          setQuizData({
            title: location.state.title,
            description: location.state.description,
            questions: location.state.questions
          });
        } else {
          // Nếu không có dữ liệu trong state, fetch từ API
          const response = await fetch("http://localhost:9999/questions");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          // Giả sử API trả về một mảng và bạn muốn lấy phần tử cuối cùng
          const latestQuiz = data[data.length - 1];
          setQuizData(latestQuiz);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizData();
  }, [location]);

  const handleBack = () => {
    navigate("/managerdb");
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!quizData) {
    return <div>Không tìm thấy dữ liệu câu hỏi.</div>;
  }

  return (
    <div className="view-question">
      <h1 className="view-title">{quizData.title}</h1>
      <p className="view-description">{quizData.description}</p>

      {quizData.questions.map((q, index) => (
        <div key={q.id} className="question-card">
          <h3 className="question-text">{index + 1}. {q.question}</h3>
          {(q.type === "multiple-choice" || q.type === "multiple-answers") && (
            q.answers.map((answer, idx) => (
              <div key={idx} className="answer-option">
                <label>
                  <input
                    type={q.type === "multiple-answers" ? "checkbox" : "radio"}
                    name={`question-${q.id}`}
                    value={answer.text}
                    
                  />
                  {answer.text}
                  {answer.correct && <span className="answer-status"> (Đúng)</span>}
                  {answer.wrong && <span className="answer-status"> (Sai)</span>}
                </label>
              </div>
            ))
          )}
          {q.type === "true-false" && (
            <>
              {q.answers.map((answer, idx) => (
                <div key={idx} className="answer-option">
                  <label>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={answer.text}
                      
                    />
                    {answer.text}
                    {answer.correct && <span className="answer-status"> (Đúng)</span>}
                    {answer.wrong && <span className="answer-status"> (Sai)</span>}
                  </label>
                </div>
              ))}
            </>
          )}
        </div>
      ))}

      <button className="back-button" onClick={handleBack}>
        Trở về
      </button>
    </div>
  );
}

export default ViewQuestionDetail;