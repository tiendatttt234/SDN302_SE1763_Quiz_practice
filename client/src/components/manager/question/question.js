import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../managerCSS/question.css";
import { Dropdown } from "react-bootstrap";

function AddQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      type: "multiple-choice",
      answers: [
        { text: "", correct: false },
        { text: "", correct: false },
      ],
    },
  ]);
  const [nextId, setNextId] = useState(1);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchMaxId = async () => {
      try {
        const response = await fetch("http://localhost:9999/questions");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const maxId = Math.max(...data.map((q) => parseInt(q.id) || 0), 0);
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
      if (
        q.type !== "true-false" &&
        q.answers.every((answer) => !answer.text)
      ) {
        tempErrors[`answers-${index}`] = "Phải có ít nhất một đáp án.";
      }
      if (
        q.type === "true-false" &&
        (!q.answers[0].text || !q.answers[1].text)
      ) {
        tempErrors[`answers-${index}`] =
          "Câu hỏi đúng/sai phải có ít nhất một đáp án.";
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
          const createdQuestion = await response.json(); // Lấy dữ liệu của câu hỏi mới tạo, bao gồm cả ID
          navigate(`/managerdb/viewques/${createdQuestion.id}`, { // Sử dụng ID từ phản hồi
            state: { id: createdQuestion.id, title, description, questions },
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
          ? {
              ...q,
              answers: [...q.answers, { text: "", correct: false }],
            }
          : q
      )
    );
  };

  const removeAnswer = (qId, index) => {
    setQuestions(
      questions.map((q) =>
        q.id === qId
          ? { ...q, answers: q.answers.filter((_, i) => i !== index) }
          : q
      )
    );
  };

  const updateQuestion = (id, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === id) {
          if (field === "type") {
            let updatedAnswers;
            if (value === "true-false") {
              // Switching to True/False
              updatedAnswers = [
                { text: "Đúng", correct: false },
                { text: "Sai", correct: false },
              ];
              // Store the original answers in a new field
              return {
                ...q,
                [field]: value,
                answers: updatedAnswers,
                originalAnswers: q.answers,
              };
            } else if (
              (value === "multiple-choice" || value === "multiple-answers") &&
              q.type === "true-false"
            ) {
              // Switching back from True/False
              updatedAnswers = q.originalAnswers || [
                { text: "", correct: false },
                { text: "", correct: false },
              ];
              // Remove the originalAnswers field
              const { originalAnswers, ...restOfQ } = q;
              return {
                ...restOfQ,
                [field]: value,
                answers: updatedAnswers,
              };
            } else {
              // Switching between multiple-choice and multiple-answers
              return { ...q, [field]: value };
            }
          }
          return { ...q, [field]: value };
        }
        return q;
      })
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
        id: nextId, // Sử dụng nextId cho id mới
        question: "",
        type: "true-false",
        answers: [
          { text: "", correct: false },
          { text: "", correct: false },
        ],
      },
    ]);
    setNextId((prevId) => prevId + 1); // Tăng nextId sau khi thêm câu hỏi mới
  };

  

  return (
    <div className="ques-manager">
      <h1 className="title">Tạo học phần mới</h1>

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
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Category
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item value="1">Action</Dropdown.Item>
        <Dropdown.Item value="2">Another action</Dropdown.Item>
        <Dropdown.Item value="3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      {questions.map((q, index) => (
        <div key={q.id} className="question-card">
          <div className="question-header">
            <span className="question-number">{index + 1}</span>
            <button
              className="remove-button"
              onClick={() => removeQuestion(q.id)}
            >
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
            {errors[`question-${index}`] && (
              <p className="error">{errors[`question-${index}`]}</p>
            )}

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
                {q.answers.slice(0, 2).map((answer, idx) => (
                  <div key={idx} className="answer-container">
                    <input
                      className="input-field answer-input"
                      type="text"
                      placeholder={`ĐÁP ÁN ${idx + 1}`}
                      value={answer.text}
                      onChange={(e) =>
                        updateAnswer(q.id, idx, "text", e.target.value)
                      }
                    />
                    <label>
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={answer.correct}
                        onChange={() =>
                          updateAnswer(q.id, idx, "correct", true)
                        }
                      />
                      {idx === 0 ? "Đúng" : "Sai"}
                    </label>
                  </div>
                ))}
              </>
            )}

            
            {q.type === "multiple-choice" && (
              <>
                {q.answers.map((answer, idx) => (
                  <div key={idx} className="answer-container">
                    <input
                      className="input-field answer-input"
                      type="text"
                      placeholder={`ĐÁP ÁN ${idx + 1}`}
                      value={answer.text}
                      onChange={(e) =>
                        updateAnswer(q.id, idx, "text", e.target.value)
                      }
                    />
                    <label>
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={answer.correct}
                        onChange={() =>
                          updateAnswer(q.id, idx, "correct", true)
                        }
                      />
                      Đúng
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

            {q.type === "multiple-answers" &&
              q.answers.map((answer, idx) => (
                <div key={idx} className="answer-container">
                  <input
                    className="input-field answer-input"
                    type="text"
                    placeholder={`ĐÁP ÁN ${idx + 1}`}
                    value={answer.text}
                    onChange={(e) =>
                      updateAnswer(q.id, idx, "text", e.target.value)
                    }
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={answer.correct}
                      onChange={(e) =>
                        updateAnswer(q.id, idx, "correct", e.target.checked)
                      }
                    />
                    Đúng
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
              <button
                className="add-answer-button"
                onClick={() => addAnswer(q.id)}
              >
                + THÊM ĐÁP ÁN
              </button>
            )}
          </div>
        </div>
      ))}

      <button className="add-question-button" onClick={addQuestion}>
        + THÊM CÂU HỎI
      </button>

      <div className="container mt-4">
        <div className="row">
          <div className="col text-start">
            <button className="btn btn-secondary btn-lg back-button" onClick={handleBack}>
              Trở về
            </button>
          </div>
          <div className="col d-flex justify-content-end align-items-center">
            <button className="btn btn-primary btn-lg create-button" onClick={handleCreate}>
              Tạo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
