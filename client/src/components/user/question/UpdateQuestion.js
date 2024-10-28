import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../UserCSS/Question/UpdateQues.css";

function EditQuestion() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          `http://localhost:9999/questionFile/getById/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTitle(data.questionFile.name);
        setDescription(data.questionFile.description);
        // console.log(data.questionFile.description);

        setQuestions(data.questionFile.arrayQuestion);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

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

  const handleUpdate = async () => {
    if (validateFields()) {
      const updatedQuestionData = {
        name: title,
        description,
        arrayQuestion: questions,
      };

      try {
        const response = await fetch(
          `http://localhost:9999/questionFile/update/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedQuestionData),
          }
        );

        if (response.ok) {
          toast.success("Cập nhật câu hỏi thành công!");
          navigate(`/user/viewques/${id}`, {
            state: { id, title, description, questions },
          });
        } else {
          toast.error("Cập nhật câu hỏi không thành công!");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Có lỗi xảy ra khi cập nhật câu hỏi!");
      }
    } else {
      toast.error("Bạn cập nhật thiếu thông tin!");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const addAnswer = (qId) => {
    setQuestions(
      questions.map((q) =>
        q.questionId === qId
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
        q.questionId === qId
          ? { ...q, answers: q.answers.filter((_, i) => i !== index) }
          : q
      )
    );
  };

  const updateQuestion = (id, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.questionId === id) {
          return { ...q, [field]: value };
        }
        return q;
      })
    );
  };

  const updateAnswer = (qId, index, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.questionId === qId) {
          const updatedAnswers = [...q.answers];
          updatedAnswers[index] = { ...updatedAnswers[index], [field]: value };
          return { ...q, answers: updatedAnswers };
        }
        return q;
      })
    );
  };

  const addQuestion = () => {
    const newQuestion = {
      questionId: Date.now(),
      content: "",
      type: "Boolean",
      answers: [
        { answerContent: "Đúng", isCorrect: false },
        { answerContent: "Sai", isCorrect: false },
      ],
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const removeQuestion = (qId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((q) => q.questionId !== qId)
    );
  };

  return (
    <div className="ques-manager">
      <h1 className="title">Cập nhật câu hỏi</h1>
      <ToastContainer />
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
        <div key={q.questionId} className="question-card">
          <div className="question-header">
            <span className="question-number">{index + 1}</span>
            <button
              className="remove-button"
              onClick={() => removeQuestion(q.questionId)}
            >
              <i className="bi bi-trash" style={{ color: "black" }}></i>
            </button>
          </div>
          <div className="question-container">
            <textarea
              className="input-field question-input"
              placeholder="CÂU HỎI"
              value={q.content}
              onChange={(e) =>
                updateQuestion(q.questionId, "content", e.target.value)
              }
            />
            {errors[`question-${index}`] && (
              <p className="error">{errors[`question-${index}`]}</p>
            )}

            <select
              className="input-field question-type"
              value={q.type}
              onChange={(e) =>
                updateQuestion(q.questionId, "type", e.target.value)
              }
            >
              <option value="Boolean">Đúng/Sai</option>
              <option value="MCQ">Chọn đáp án</option>
              <option value="MAQ">Nhiều đáp án</option>
            </select>

            {q.type === "Boolean" && (
              <>
                {q.answers.map((answer, idx) => (
                  <div key={idx} className="answer-contain">
                    <input
                      className="input-field answer-input"
                      type="text"
                      placeholder={`ĐÁP ÁN ${idx + 1}`}
                      value={answer.answerContent}
                      disabled
                      onChange={(e) =>
                        updateAnswer(
                          q.questionId,
                          idx,
                          "answerContent",
                          e.target.value
                        )
                      }
                    />
                    <label>
                      <input
                        type="radio"
                        name={`correct-${q.questionId}`}
                        checked={answer.isCorrect}
                        onChange={() =>
                          updateAnswer(q.questionId, idx, "isCorrect", true)
                        }
                      />
                      Đúng
                    </label>
                  </div>
                ))}
              </>
            )}

            {/* Phần MCQ và MAQ có thể được thêm vào đây */}
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
                        updateAnswer(
                          q.questionId,
                          idx,
                          "answerContent",
                          e.target.value
                        )
                      }
                    />
                    <label>
                      <input
                        type="radio"
                        name={`correct-${q.questionId}`}
                        checked={answer.isCorrect}
                        onChange={() =>
                          updateAnswer(q.questionId, idx, "isCorrect", true)
                        }
                      />
                      Đúng
                    </label>
                    <button onClick={() => removeAnswer(q.questionId, idx)}>
                      Xóa
                    </button>
                  </div>
                ))}
                {/* <button onClick={() => addAnswer(q.questionId)}>
                  Thêm đáp án
                </button> */}
              </>
            )}

            {/* Phần MAQ có thể được thêm vào đây */}
            {q.type === "MAQ" && (
              <>
                {q.answers.map((answer, idx) => (
                  <div key={idx} className="answer-contain">
                    <input
                      className="input-field answer-input"
                      type="text"
                      placeholder={`ĐÁP ÁN ${idx + 1}`}
                      value={answer.answerContent}
                      onChange={(e) =>
                        updateAnswer(
                          q.questionId,
                          idx,
                          "answerContent",
                          e.target.value
                        )
                      }
                    />
                    <label>
                      <input
                        type="checkbox"
                        name={`correct-${q.questionId}`}
                        checked={answer.isCorrect}
                        onChange={() =>
                          updateAnswer(q.questionId, idx, "isCorrect", !answer.isCorrect)
                        }
                      />
                      Đúng
                    </label>
                    <button onClick={() => removeAnswer(q.questionId, idx)}>
                      Xóa
                    </button>
                  </div>
                ))}
                {/* <button onClick={() => addAnswer(q.questionId)}>
                  Thêm đáp án
                </button> */}
              </>
            )}
            {q.type !== "Boolean" && (
              <button onClick={() => addAnswer(q.questionId)}>
                Thêm đáp án
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="button-container">
        <button className="add-question-button" onClick={addQuestion}>
          Thêm câu hỏi
        </button>
        <button className="update-button" onClick={handleUpdate}>
          Cập nhật
        </button>
        <button className="back-button" onClick={handleBack}>
          Quay lại
        </button>
      </div>
    </div>
  );
}

export default EditQuestion;
