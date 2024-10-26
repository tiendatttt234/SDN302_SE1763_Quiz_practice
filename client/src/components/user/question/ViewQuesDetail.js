import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import "../UserCSS/Question/ViewQuesDetail.css";

function ViewQuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [editedData, setEditedData] = useState(null); // State lưu trữ tạm thời các thay đổi
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuizData();
  }, [id]);

  const fetchQuizData = async () => {
    try {
      const response = await fetch(
        `http://localhost:9999/questionFile/getById/${id}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = {
        ...data.questionFile,
        arrayQuestion: data.questionFile.arrayQuestion.map((q) => ({
          ...q,
          isEditing: false,
        })),
      };

      setQuizData(updatedData);
      setEditedData(updatedData); // Khởi tạo editedData từ dữ liệu ban đầu
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
    }
  };

  const handleEditQuestion = (index) => {
    const updatedQuestions = [...editedData.arrayQuestion];
    updatedQuestions[index].isEditing = true;
    setEditedData({ ...editedData, arrayQuestion: updatedQuestions });
  };

  const handleDeleteQuestion = async (index) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này không?")) {
      const updatedQuestions = editedData.arrayQuestion.filter(
        (_, i) => i !== index
      );
      const updatedQuizData = {
        ...editedData,
        arrayQuestion: updatedQuestions,
      };
      setEditedData(updatedQuizData); // Cập nhật editedData với dữ liệu mới
    }
  };

  const handleSave = async () => {
    if (editedData) {
      console.log(editedData);

      await updateDatabase(editedData);
      alert("Lưu thay đổi thành công!");
      await fetchQuizData();
    }
  };

  const updateDatabase = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:9999/questionFile/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error updating database:", error);
      alert("Có lỗi xảy ra khi cập nhật dữ liệu. Vui lòng thử lại sau.");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleQuestionChange = (e, questionIndex, field) => {
    const updatedQuestions = [...editedData.arrayQuestion];
    updatedQuestions[questionIndex][field] = e.target.value;
    setEditedData({ ...editedData, arrayQuestion: updatedQuestions });
  };

  const handleAnswerChange = (e, questionIndex, answerIndex, field) => {
    const updatedQuestions = [...editedData.arrayQuestion];
    updatedQuestions[questionIndex].answers[answerIndex][field] =
      e.target.value;
    setEditedData({ ...editedData, arrayQuestion: updatedQuestions });
  };

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    const updatedQuestions = [...editedData.arrayQuestion];
    const question = updatedQuestions[questionIndex];

    if (question.type === "Boolean") {
      question.answers[0].isCorrect = answerIndex === 0;
      question.answers[1].isCorrect = answerIndex === 1;
    } else if (question.type === "MCQ") {
      question.answers = question.answers.map((answer, idx) => ({
        ...answer,
        isCorrect: idx === answerIndex,
      }));
    } else if (question.type === "MAQ") {
      question.answers[answerIndex].isCorrect =
        !question.answers[answerIndex].isCorrect;
    }

    setEditedData({ ...editedData, arrayQuestion: updatedQuestions });
  };

  if (error) return <div className="error">{error}</div>;
  if (!quizData) return <div>Không tìm thấy dữ liệu câu hỏi.</div>;

  return (
    <div className="view-question">
      <h1 className="view-title">{quizData.name}</h1>
      <p className="view-description">{quizData.description}</p>

      {editedData.arrayQuestion.map((q, index) => (
        <div key={q.questionId} className="question-card">
          <div className="question-header">
            {q.isEditing ? (
              <input
                className="edit-question-text"
                value={q.content}
                onChange={(e) => handleQuestionChange(e, index, "content")}
              />
            ) : (
              <h3 className="question-text">
                {index + 1}. {q.content}
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

          {(q.type === "MCQ" || q.type === "MAQ" || q.type === "Boolean") &&
            q.answers.map((answer, idx) => (
              <div key={answer.answerId} className="answer-option">
                <label>
                  <input
                    type={q.type === "MAQ" ? "checkbox" : "radio"}
                    name={`question-${q.questionId}`}
                    checked={answer.isCorrect}
                    disabled={!q.isEditing}
                    onChange={() =>
                      q.isEditing && handleCorrectAnswerChange(index, idx)
                    }
                  />
                  {q.isEditing ? (
                    <input
                      value={answer.answerContent}
                      onChange={(e) =>
                        handleAnswerChange(e, index, idx, "answerContent")
                      }
                    />
                  ) : (
                    answer.answerContent
                  )}
                </label>
              </div>
            ))}
        </div>
      ))}

      <div>
        <button
          className="edit-add-question-button"
          onClick={() => navigate(`/user/updatequestion/${id}`)}
        >
          Thêm hoặc chỉnh sửa câu hỏi
        </button>
      </div>
      <div className="action-buttons">
        {editedData && (
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
