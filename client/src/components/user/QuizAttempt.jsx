import React, { useState, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import "./QuizAttempt.css";
import { useNavigate } from "react-router-dom";
import QuestionComponent from "./QuestionComponent"; // Import the QuestionComponent

export default function QuizAttempt() {
  const style = {
    card: {
      width: "60%",
      maxWidth: "800px",
      minWidth: "300px",
      margin: "20px 0",
    },
  };

  const quizData = [
    {
      id: 1,
      question: "Điền thêm từ để có câu trả lời đúng theo quan niệm duy vật lịch sử và xác định đó là nhận định của ai?",
      type: "MAQ", 
      answers: [
        { id: 1, text: "Toàn bộ các quan hệ xã hội (Ph.Ăngghen)" },
        { id: 2, text: "Tổng hòa những quan hệ xã hội /C.Mác" },
        { id: 3, text: "Tổng hòa các quan hệ kinh tế VI Lênin" },
        { id: 4, text: "Tổng hòa các quan hệ tự nhiên và xã hội (C. Mác)" },
        { id: 5, text: "Tổng hòa các quan hệ tự nhiên và xã hội (C. Mác)" },
      ],
      correctAnswers: [1, 2],
    },
    {
      id: 2,
      question: "Triết học Mác ra đời vào thời gian nào?",
      type: "MCQ",
      answers: [
        { id: 1, text: "Những năm 40 của thế kỷ XIX" },
        { id: 2, text: "Những năm 50 của thế kỷ XIX" },
        { id: 3, text: "Những năm 20 của thế kỷ XIX" },
        { id: 4, text: "Những năm 30 của thế kỷ XIX" },
      ],
      correctAnswers: [1],
    },
    {
      id: 3,
      question: "Triết học Mác ra đời vào thời gian nào?",
      type: "BOOLEAN",
      answers: [
        { id: 1, text: "Đúng" },
        { id: 2, text: "Sai" },
      ],
      correctAnswers: [1],
    },
  ];

  const [userAnswers, setUserAnswers] = useState([]);
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

    navigate("/user/quiz-result", { state: { results } });
  };

  console.log(userAnswers);
  
  return (
    <div className="d-flex">
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

      <div className="quiz-content flex-grow-1 p-3">
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
                {quizItem.type === "MAQ"
                  ? "Chọn nhiều đáp án"
                  : "Chọn một đáp án"}
              </Card.Title>

              {/* Use the QuestionComponent here */}
              <QuestionComponent
                quizItem={quizItem}
                userAnswer={userAnswers[index]}
                index={index}
                handleAnswerSelect={handleAnswerSelect}
              />
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
