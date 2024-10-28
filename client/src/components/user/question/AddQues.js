import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../UserCSS/Question/AddQuestion.css";
import 'bootstrap-icons/font/bootstrap-icons.css';


function AddQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      content: "", // Thay đổi từ question thành content
      type: "Boolean", // Mặc định là Boolean
      answers: [
        { answerContent: "Đúng", isCorrect: false }, // Thay đổi từ text thành answerContent và correct thành isCorrect
        { answerContent: "Sai", isCorrect: false },
      ],
      key: Date.now()
    },
  ]);
  const [nextId, setNextId] = useState(1);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      if (!q.content) {
        tempErrors[`question-${index}`] = "Câu hỏi không được để trống.";
      }
      if (
        q.type !== "Boolean" &&
        q.answers.every((answer) => !answer.answerContent)
      ) {
        tempErrors[`answers-${index}`] = "Phải có ít nhất một đáp án.";
      }
      if (
        q.type === "Boolean" &&
        (!q.answers[0].answerContent || !q.answers[1].answerContent)
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
      const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage
      if (!userId) {
        console.error("Không tìm thấy userId trong localStorage.");
        return;
      }
     
      const newQuestionData = {
        name: title,
        description,
        arrayQuestion: questions.map((q) => ({
          content: q.content,
          type: q.type,
          answers: q.answers.map((a) => ({
            answerContent: a.answerContent,
            isCorrect: a.isCorrect,
          })),
        })),
        createdBy: userId, 
      };
      console.log('Data being sent:', JSON.stringify(newQuestionData, null, 2));
      try {
        const response = await fetch("http://localhost:9999/questionFile/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQuestionData),
        });
  
        if (response.ok) {
          const createdQuestion = await response.json(); 
          console.log(createdQuestion.result._id);
          navigate(`/user/viewques/${createdQuestion.result._id}`); 
          // , { 
          //   state: { id: createdQuestion.id, title, description, questions },
          // }
        } else {
          console.error("Error saving questions");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  

  const handleBack = () => {
    navigate("/");
  };

  const addAnswer = (qId) => {
    setQuestions(
      questions.map((q) =>
        q.id === qId
          ? {
              ...q,
              answers: [...q.answers, { answerContent: "", isCorrect: false }],
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
  const getDefaultAnswers = (type) => {
    switch (type) {
      case "Boolean":
        return [
          { answerContent: "Đúng", isCorrect: false },
          { answerContent: "Sai", isCorrect: false }
        ];
      case "MCQ":
      case "MAQ":
        return [
          { answerContent: "", isCorrect: false },
          { answerContent: "", isCorrect: false }
        ];
      default:
        return [];
    }
  };


  const updateQuestion = (id, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === id) {
          // Nếu đang cập nhật loại câu hỏi
          if (field === "type") {
            const newAnswers = getDefaultAnswers(value);
            return {
              ...q,
              type: value,
              answers: newAnswers,
              key: Date.now() // Cập nhật key để force re-render
            };
          }
          // Cập nhật các trường khác
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

  // const addQuestion = () => {
  //   setQuestions([
  //     ...questions,
  //     {
  //       id: nextId, // Sử dụng nextId cho id mới
  //       content: "",
  //       type: "Boolean", // Mặc định là Boolean
  //       answers: [
  //         { answerContent: "Đúng", isCorrect: false }, // Thay đổi từ text thành answerContent
  //         { answerContent: "Sai", isCorrect: false },
  //       ],
  //     },
  //   ]);
    
  //   setNextId((prevId) => prevId + 1); // Tăng nextId sau khi thêm câu hỏi mới
  // };

  const addQuestion = () => {
    const currentTimestamp = Date.now();
    const newQuestion = {
      id: currentTimestamp,
      content: "",
      type: "Boolean",
      answers: getDefaultAnswers("Boolean"),
      key: currentTimestamp // Thêm key cho câu hỏi mới
    };
    setQuestions(prev => [...prev, newQuestion]);
    // setNextId(prev => prev + 1);
  };
  

  return (
    <div className="ques-manager" style={{maxWidth: "100%"}}>
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
      
      {questions.map((q, index) => (
        <div key={q.key} className="question-card">
          <div className="question-header">
            <span className="question-number">{index + 1}</span>
            <button
              className="remove-button"
              onClick={() => removeQuestion(q.id)}
            >
              <i class="bi bi-trash" style={{ color: "black" }}></i>
            </button>
          </div>
          <div className="question-container">
            <textarea
              className="input-field question-input"
              placeholder="CÂU HỎI"
              value={q.content}
              onChange={(e) => updateQuestion(q.id, "content", e.target.value)}
            />
            {errors[`question-${index}`] && (
              <p className="error">{errors[`question-${index}`]}</p>
            )}

            <select
              className="input-field question-type"
              value={q.type}
              onChange={(e) => updateQuestion(q.id, "type", e.target.value)}
            >
              <option value="Boolean">Đúng/Sai</option>
              <option value="MCQ">Chọn đáp án</option>
              <option value="MAQ">Nhiều đáp án</option>
            </select>

            {q.type === "Boolean" && (
              <>
                {q.answers.slice(0, 2).map((answer, idx) => (
                  <div key={idx} className="answer-contain">
                    <input
                      className="input-field answer-input"
                      type="text"
                      placeholder={`ĐÁP ÁN ${idx + 1}`}
                      value={answer.answerContent}
                      disabled
                      onChange={(e) =>
                        updateAnswer(q.id, idx, "answerContent", e.target.value)
                      }
                    />
                    <label>
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={answer.isCorrect}
                        onChange={() =>
                          updateAnswer(q.id, idx, "isCorrect", true)
                        }
                      />
                      Đúng
                    </label>
                  </div>
                ))}
              </>
            )}

            
            {q.type === "MCQ" && (
              <>
                {q.answers.map((answer, idx) => (
                  <div key={idx} className="answer-contain">
                    <input
                      className="input-field answer-input"
                      type="text"
                      placeholder={`ĐÁP ÁN ${idx + 1}`}
                      value={answer.answerContent}
                      onChange={(e) =>
                        updateAnswer(q.id, idx, "answerContent", e.target.value)
                      }
                    />
                    <label>
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={answer.isCorrect}
                        onChange={() =>
                          updateAnswer(q.id, idx, "isCorrect", !answer.isCorrect)
                        }
                      />
                      Đúng
                    </label>
                    <button
                      className="remove-answer-button"
                      onClick={() => removeAnswer(q.id, idx)}
                    >
                      <i class="bi bi-trash" style={{ color: "black" }}></i>
                    </button>
                  </div>
                ))}
                 </>
            )}

            {q.type === "MAQ" &&
              q.answers.map((answer, idx) => (
                <div key={idx} className="answer-contain">
                  <input
                    className="input-field answer-input"
                    type="text"
                    placeholder={`ĐÁP ÁN ${idx + 1}`}
                    value={answer.answerContent}
                    onChange={(e) =>
                      updateAnswer(q.id, idx, "answerContent", e.target.value)
                    }
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={answer.isCorrect}
                      onChange={(e) =>
                        updateAnswer(q.id, idx, "isCorrect", !answer.isCorrect)
                      }
                    />
                    Đúng
                  </label>
                  <button
                    className="remove-answer-button"
                    onClick={() => removeAnswer(q.id, idx)}
                  >
                    <i class="bi bi-trash" style={{ color: "black" }}></i>
                  </button>
                </div>
              ))}


            {q.type !== "Boolean" && (
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
