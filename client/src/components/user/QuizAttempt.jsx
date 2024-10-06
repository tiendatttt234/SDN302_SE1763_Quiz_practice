import React, { useState, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import "./QuizAttempt.css"; // Ensure CSS has been updated
import { useNavigate } from "react-router-dom";

export default function QuizAttempt() {
  const style = {
    card: {
      width: "60%",
      maxWidth: "800px",
      minWidth: "300px",
      margin: "20px 0 ",
      
    },
  };

  const quizData = [
    {
      id: 1,
      question:
        "Điền thêm từ để có câu trả lời đúng theo quan niệm duy vật lịch sử và xác định đó là nhận định của ai?",
      type: "MAQ", // Multiple Answer Question
      answers: [
        { id: 1, text: "Toàn bộ các quan hệ xã hội (Ph.Ăngghen)" },
        { id: 2, text: "Tổng hòa những quan hệ xã hội /C.Mác" },
        { id: 3, text: "Tổng hòa các quan hệ kinh tế VI Lênin" },
        { id: 4, text: "Tổng hòa các quan hệ tự nhiên và xã hội (C. Mác)" },
        { id: 5, text: "Tổng hòa các quan hệ tự nhiên và xã hội (C. Mác)" },
      ],
      correctAnswers: [1, 2], // Correct answer for this question
    },
    {
      id: 2,
      question: "Triết học Mác ra đời vào thời gian nào?",
      type: "MCQ", // Multiple Choice Question
      answers: [
        { id: 1, text: "Những năm 40 của thế kỷ XIX" },
        { id: 2, text: "Những năm 50 của thế kỷ XIX" },
        { id: 3, text: "Những năm 20 của thế kỷ XIX" },
        { id: 4, text: "Những năm 30 của thế kỷ XIX" },
      ],
      correctAnswers: [1], // Correct answer for this question
    },
    {
      id: 3,
      question: "Triết học Mác ra đời vào thời gian nào?",
      type: "BOOLEAN", // Boolean Question
      answers: [
        { id: 1, text: "Đúng" },
        { id: 2, text: "Sai" },
      ],
      correctAnswers: [1], // Correct answer for this question
    },
  ];

  // Initialize userAnswers with arrays for all types
  const initialAnswers = quizData.map((quizItem) =>
    quizItem.type === "MAQ" ? [] : null // MAQ as empty array, others as null
  );

  const [userAnswers, setUserAnswers] = useState(initialAnswers);
  const questionRefs = useRef([]);
  const navigate = useNavigate();

  const handleAnswerSelect = (questionIndex, answerId) => {
    setUserAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionIndex] || []; // Default to empty array for MAQ

      if (quizData[questionIndex].type === "MAQ") {
        if (currentAnswers.includes(answerId)) {
          // If answer is already selected, remove it
          return {
            ...prevAnswers,
            [questionIndex]: currentAnswers.filter((id) => id !== answerId), // Remove answer if already selected
          };
        } else {
          // Add the new answer
          return {
            ...prevAnswers,
            [questionIndex]: [...currentAnswers, answerId], // Add new answer
          };
        }
      }

      // For MCQ and BOOLEAN types, set selected answer
      return {
        ...prevAnswers,
        [questionIndex]: answerId,
      };
    });
  };

  const scrollToQuestion = (index) => {
    questionRefs.current[index].scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = () => {
    const results = quizData.map((quizItem, index) => {
      const userAnswer = userAnswers[index] || [];
      const correctAnswers = quizItem.correctAnswers;

      if (quizItem.type === "MAQ") {
        const isCorrect =
          userAnswer.length === correctAnswers.length &&
          userAnswer.every((answerId) => correctAnswers.includes(answerId));
        return { question: quizItem.question, isCorrect };
      } else {
        const isCorrect = userAnswer === correctAnswers[0];
        return { question: quizItem.question, isCorrect };
      }
    });

    navigate("/user/quiz-result", { state: { results } });
  };

  console.log(userAnswers[1]);
  return (
    <div className="d-flex">
      {/* Sidebar Navigation */}
      <div className="side-nav p-3">
        <ul className="list-unstyled">
          {quizData.map((_, index) => (
            <li key={index} className="my-2">
              <Button
                variant="outline-primary"
                onClick={() => scrollToQuestion(index)}
              >
                {index + 1}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Quiz Content */}
      <div className={`quiz-content flex-grow-1 p-3`}>
        {quizData.map((quizItem, index) => (
          <Card
          key={index}
          ref={(el) => (questionRefs.current[index] = el)}
          id={`question-${index}`}
          className="mb-3"
          style={style.card}
        >
          <Card.Header className="questionCard">
            <h5>{quizItem.question}</h5>
          </Card.Header>
          <Card.Body>
            <Card.Title>
            {quizItem.type === "MAQ" ? "Chọn nhiều đáp án" : "Chọn một đáp án"}
            </Card.Title>
            
            {/* Container for the answers with flexbox layout */}
            <div className="answer-container">
              {quizItem.answers.map((answer) => (
                <div
                  className={`answer-style ${
                    quizItem.type === "MAQ"
                      ? Array.isArray(userAnswers[index]) && userAnswers[index].includes(answer.id) ? "selected" : ""
                      : userAnswers[index] === answer.id ? "selected" : ""
                  }`}
                  key={answer.id}
                  onClick={() => handleAnswerSelect(index, answer.id)} // Clicking answer will select it
                >
                  <input
                    type={quizItem.type === "MAQ" ? "checkbox" : "radio"}
                    name={`question-${index}`} // Ensure unique names per question
                    id={`answer-${index}-${answer.id}`} // Unique ID for each answer
                    checked={quizItem.type === "MAQ"
                      ? userAnswers[index]?.includes(answer.id) || false
                      : userAnswers[index] === answer.id}
                    onChange={() => handleAnswerSelect(index, answer.id)}
                    style={{ visibility: 'hidden' }} // Hide native checkbox/radio for custom styling
                  />
                  <label htmlFor={`answer-${index}-${answer.id}`} className="answer-label">
                    {answer.text}
                  </label>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
        
        ))}
        <div className="text-center">
          <Button variant="primary" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
