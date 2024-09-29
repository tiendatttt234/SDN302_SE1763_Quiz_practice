import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../managerCSS/question.css";

function AddQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      type: "multiple-choice",
      answers: [
        { text: "", correct: false, wrong: false },
        { text: "", correct: false, wrong: false },
      ],
    },
  ]);
  const [nextId, setNextId] = useState(1);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current maximum ID from the server
    const fetchMaxId = async () => {
      try {
        const response = await fetch("http://localhost:9999/questions");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const maxId = Math.max(...data.map(q => parseInt(q.id) || 0), 0);
        setNextId(maxId + 1);
      } catch (error) {
        console.error("Error fetching max ID:", error);
      }
    };

    fetchMaxId();
  }, []);

  const validateFields = () => {
    let tempErrors = {};
    if (!title) tempErrors.title = "Tiêu đề không được để trống.";
    if (!description) tempErrors.description = "Mô tả không được để trống.";
    questions.forEach((q, index) => {
      if (!q.question) {
        tempErrors[`question-${index}`] = "Câu hỏi không được để trống.";
      }
      if (q.type !== "true-false" && q.answers.every(answer => !answer.text)) {
        tempErrors[`answers-${index}`] = "Phải có ít nhất một đáp án.";
      }
      if (q.type === "true-false" && (!q.answers[0].text || !q.answers[1].text)) {
        tempErrors[`answers-${index}`] = "Câu hỏi đúng/sai phải có ít nhất một đáp án.";
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCreate = async () => {
    if (validateFields()) {
      const newQuestionData = {
        title,
        description,
        questions,
      };

      try {
        const response = await fetch("http://localhost:9999/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQuestionData),
        });

        if (response.ok) {
          setNextId(prevId => prevId + 1);  // Tăng nextId sau khi tạo thành công
          navigate("/managerdb/viewques", {
            state: { id: nextId.toString(), title, description, questions },
          });
        } else {
          console.error("Error saving questions");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleBack = () => {
    navigate("/managerdb");
  };

  const addAnswer = (qId) => {
    setQuestions(
      questions.map((q) =>
        q.id === qId
          ? { ...q, answers: [...q.answers, { text: "", correct: false, wrong: false }] }
          : q
      )
    );
  };

  const removeAnswer = (qId, index) => {
    setQuestions(
      questions.map((q) =>
        q.id === qId ? { ...q, answers: q.answers.filter((_, i) => i !== index) } : q
      )
    );
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const updateAnswer = (qId, index, field, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === qId
          ? {
              ...q,
              answers: q.answers.map((a, i) =>
                i === index ? { ...a, [field]: value } : a
              ),
            }
          : q
      )
    );
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: "",
        type: "true-false",
        answers: [
          { text: "", correct: false, wrong: false },
          { text: "", correct: false, wrong: false },
        ],
      },
    ]);
  };

  return (
    <div className="ques-manager">
      <h1 className="title">Tạo một câu hỏi mới</h1>

      <input
        className="input-field input-title"
        type="text"
        placeholder="Nhập tiêu đề...."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors.title && <p className="error">{errors.title}</p>}

      <input
        className="input-field input-description"
        type="text"
        placeholder="Thêm mô tả..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {errors.description && <p className="error">{errors.description}</p>}

      {questions.map((q, index) => (
        <div key={q.id} className="question-card">
          <div className="question-header">
            <span className="question-number">{index + 1}</span>
            <button className="remove-button" onClick={() => removeQuestion(q.id)}>
              🗑️
            </button>
          </div>
          <div className="question-container">
            <textarea
              className="input-field question-input"
              placeholder="CÂU HỎI"
              value={q.question}
              onChange={(e) => updateQuestion(q.id, "question", e.target.value)}
            />
            {errors[`question-${index}`] && <p className="error">{errors[`question-${index}`]}</p>}

            <select
              className="input-field question-type"
              value={q.type}
              onChange={(e) => updateQuestion(q.id, "type", e.target.value)}
            >
              <option value="multiple-choice">Chọn đáp án</option>
              <option value="multiple-answers">Nhiều đáp án</option>
              <option value="true-false">Đúng/Sai</option>
            </select>

            {q.type === "true-false" && (
              <>
                {q.answers.map((answer, idx) => (
                  <div key={idx} className="answer-container">
                    <input
                      className="input-field answer-input"
                      type="text"
                      placeholder={`ĐÁP ÁN ${idx + 1}`}
                      value={answer.text}
                      onChange={(e) => updateAnswer(q.id, idx, "text", e.target.value)}
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={answer.correct}
                        onChange={(e) => {
                          updateAnswer(q.id, idx, "correct", e.target.checked);
                          // updateAnswer(q.id, idx, "wrong", !e.target.checked);
                        }}
                      />
                      Đúng
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={answer.wrong}
                        onChange={(e) => {
                          updateAnswer(q.id, idx, "wrong", e.target.checked);
                          // updateAnswer(q.id, idx, "correct", !e.target.checked);
                        }}
                      />
                      Sai
                    </label>
                    <button
                      className="remove-answer-button"
                      onClick={() => removeAnswer(q.id, idx)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </>
            )}

            {q.type !== "true-false" && q.answers.map((answer, idx) => (
              <div key={idx} className="answer-container">
                <input
                  className="input-field answer-input"
                  type="text"
                  placeholder={`ĐÁP ÁN ${idx + 1}`}
                  value={answer.text}
                  onChange={(e) => updateAnswer(q.id, idx, "text", e.target.value)}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={answer.correct}
                    onChange={(e) => updateAnswer(q.id, idx, "correct", e.target.checked)}
                  />
                  Đúng
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={answer.wrong}
                    onChange={(e) => updateAnswer(q.id, idx, "wrong", e.target.checked)}
                  />
                  Sai
                </label>
                <button
                  className="remove-answer-button"
                  onClick={() => removeAnswer(q.id, idx)}
                >
                  🗑️
                </button>
              </div>
            ))}

            {q.type !== "true-false" && (
              <button className="add-answer-button" onClick={() => addAnswer(q.id)}>
                + THÊM ĐÁP ÁN
              </button>
            )}
          </div>
        </div>
      ))}

      <button className="add-question-button" onClick={addQuestion}>
        + THÊM CÂU HỎI
      </button>

      <div className="action-buttons">
        <button className="back-button" onClick={handleBack}>
          Trở về 
        </button>
        <button className="create-practice-button" onClick={handleCreate}>
          Tạo
        </button>
      </div>
    </div>
  );
}

export default AddQuestion;
