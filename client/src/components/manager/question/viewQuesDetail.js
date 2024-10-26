import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import "../managerCSS/viewquesdetail.css";

function ViewQuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuizData();
  }, [id]);

  const fetchQuizData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:9999/questions/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const updatedData = {
        ...data,
        questions: data.questions.map((q) => ({ ...q, isEditing: false })),
      };
      setQuizData(updatedData);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditQuestion = (index) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index].isEditing = true;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleDeleteQuestion = async (index) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này không?")) {
      const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
      const updatedQuizData = { ...quizData, questions: updatedQuestions };
      await updateDatabase(updatedQuizData);
      setQuizData(updatedQuizData);
    }
  };

  const handleSave = async () => {
    await updateDatabase(quizData);
    alert("Lưu thay đổi thành công!");
    fetchQuizData(); // Reload data after saving
  };

  const updateDatabase = async (data) => {
    try {
      const response = await fetch(`http://localhost:9999/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error updating database:", error);
      alert("Có lỗi xảy ra khi cập nhật dữ liệu. Vui lòng thử lại sau.");
    }
  };

  const handleBack = () => {
    navigate("/managerdb/manaques");
  };

  const handleQuestionChange = async (e, questionIndex, field) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex][field] = e.target.value;
    const updatedQuizData = { ...quizData, questions: updatedQuestions };
    await updateDatabase(updatedQuizData);
    setQuizData(updatedQuizData);
  };

  const handleAnswerChange = async (e, questionIndex, answerIndex, field) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].answers[answerIndex][field] = e.target.value;
    const updatedQuizData = { ...quizData, questions: updatedQuestions };
    await updateDatabase(updatedQuizData);
    setQuizData(updatedQuizData);
  };

const handleCorrectAnswerChange = async (questionIndex, answerIndex) => {
  const updatedQuestions = [...quizData.questions];
  const question = updatedQuestions[questionIndex];

  if (question.type === "true-false") {
    // Chỉ có 2 đáp án, nếu đáp án 0 được chọn là đúng thì đáp án 1 là sai và ngược lại
    question.answers[0].correct = answerIndex === 0; // Đáp án đầu tiên
    question.answers[1].correct = answerIndex === 1; // Đáp án thứ hai
  } else if (question.type === "multiple-choice") {
    // Đối với nhiều lựa chọn, cập nhật lại trạng thái của tất cả các đáp án
    question.answers = question.answers.map((answer, idx) => ({
      ...answer,
      correct: idx === answerIndex,
    }));
  } else if (question.type === "multiple-answers") {
    question.answers[answerIndex].correct = !question.answers[answerIndex].correct;
  }

  const updatedQuizData = { ...quizData, questions: updatedQuestions };
  await updateDatabase(updatedQuizData);
  setQuizData(updatedQuizData);
};


  const isAnyQuestionEditing = quizData?.questions.some((q) => q.isEditing);

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!quizData) return <div>Không tìm thấy dữ liệu câu hỏi.</div>;

  return (
    <div className="view-question">
      <h1 className="view-title">{quizData.title}</h1>
      <p className="view-description">{quizData.description}</p>

      {quizData.questions.map((q, index) => (
        <div key={q.id} className="question-card">
          <div className="question-header">
            {q.isEditing ? (
              <input
                className="edit-question-text"
                value={q.question}
                onChange={(e) => handleQuestionChange(e, index, "question")}
              />
            ) : (
              <h3 className="question-text">
                {index + 1}. {q.question}
              </h3>
            )}
            <div className="question-actions">
              <button
                className="icon-button"
                onClick={() => handleEditQuestion(index)}
              >
                <Pencil size={18} />
              </button>
              <button
                className="icon-button"
                onClick={() => handleDeleteQuestion(index)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {(q.type === "multiple-choice" || q.type === "multiple-answers" || q.type === "true-false") &&
            q.answers.map((answer, idx) => (
              <div key={idx} className="answer-option">
                <label>
                  <input
                    type={q.type === "multiple-answers" ? "checkbox" : "radio"}
                    name={`question-${q.id}`}
                    checked={answer.correct}
                    disabled={!q.isEditing}
                    onChange={() => q.isEditing && handleCorrectAnswerChange(index, idx)}
                  />
                  {q.isEditing ? (
                    <input
                      value={answer.text}
                      onChange={(e) =>
                        handleAnswerChange(e, index, idx, "text")
                      }
                    />
                  ) : (
                    answer.text
                  )}
                </label>
              </div>
            ))}
        </div>
      ))}

      <div>
        <button
          className="edit-add-question-button"
          onClick={() => navigate(`/managerdb/updatequestion/${id}`)}
        >
          Thêm hoặc chỉnh sửa câu hỏi
        </button>
      </div>
      <div className="action-buttons">
        {isAnyQuestionEditing && (
          <button className="save-button" onClick={handleSave}>
            Lưu
          </button>
        )}
        <button className="back-button" onClick={handleBack}>
          Trở về
        </button>
      </div>
    </div>
  );
}

export default ViewQuestionDetail;