import React, { useState, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import "./QuizAttempt.css";
import { useNavigate } from "react-router-dom";

export default function QuizWithNavigation() {
  const quizData = [
    {
      question:
        "Điền thêm từ để có câu trả lời đúng theo quan niệm duy vật lịch sử và xác định đó là nhận định của ai?",
      type: "MAQ", // Multiple Answer Question
      answers: [
        { id: 1, text: "Toàn bộ các quan hệ xã hội (Ph.Ăngghen)" },
        { id: 2, text: "Tổng hòa những quan hệ xã hội /C.Mác" },
        { id: 3, text: "Tổng hòa các quan hệ kinh tế VI Lênin" },
        { id: 4, text: "Tổng hòa các quan hệ tự nhiên và xã hội (C. Mác)" },
      ],
      correctAnswers: [1, 2], // Correct answer for this question
    },
    {
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
      question: "Triết học Mác ra đời vào thời gian nào?",
      type: "BOOLEAN", // Boolean Question
      answers: [
        { id: 1, text: "Đúng" },
        { id: 2, text: "Sai" },
      ],
      correctAnswers: [1], // Correct answer for this question
    },
  ];

  // Initialize userAnswers to an array of empty arrays for MAQ questions and undefined for others
  const initialAnswers = quizData.map((quizItem) =>
    quizItem.type === "MAQ" ? [] : undefined
  );

  const [userAnswers, setUserAnswers] = useState(initialAnswers);
  const questionRefs = useRef([]);
  const navigate = useNavigate();

  const handleAnswerSelect = (questionIndex, answerId) => {
    setUserAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionIndex] || [];

      if (quizData[questionIndex].type === "MAQ") {
        if (currentAnswers.includes(answerId)) {
          return {
            ...prevAnswers,
            [questionIndex]: currentAnswers.filter((id) => id !== answerId),
          };
        } else {
          return {
            ...prevAnswers,
            [questionIndex]: [...currentAnswers, answerId],
          };
        }
      }

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

    // Navigate to the results page with the results data
    // Assume navigate function exists
    navigate("/user/quiz-result", { state: { results } });
  };

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
          >
            <Card.Header>
              <h5>
                Câu hỏi {index + 1}/{quizData.length}
              </h5>
            </Card.Header>
            <Card.Body>
              <Card.Title>{quizItem.question}</Card.Title>
              <ul className="list-group list-group-flush">
                {quizItem.answers.map((answer) => (
                  <li key={answer.id} className="list-group-item">
                    <input
                      type={quizItem.type === "MAQ" ? "checkbox" : "radio"}
                      name={`question-${index}`}
                      id={`answer-${answer.id}`}
                      onChange={() => handleAnswerSelect(index, answer.id)}
                      checked={
                        quizItem.type === "MAQ"
                          ? userAnswers[index]?.includes(answer.id) || false // ensure it defaults to false
                          : userAnswers[index] === answer.id
                      }
                    />
                    <label htmlFor={`answer-${answer.id}`} className="ml-2">
                      {answer.text}
                    </label>
                  </li>
                ))}
              </ul>
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
