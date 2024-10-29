import React, { useState, useEffect, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import "./styles/QuizAttempt.css";
import { useNavigate, useParams } from "react-router-dom";
import QuestionComponent from "./QuestionComponent";

export default function QuizAttempt() {
  const style = {
    card: {
      width: "60%",
      maxWidth: "800px",
      minWidth: "300px",
      margin: "20px 0",
    },
  };
  
  const { id: quizId } = useParams(); // Get quizId from URL params
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const questionRefs = useRef([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
  const [questionFileId, setQuestionFileId] = useState(null);
  console.log(questionFileId);
  
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost:9999/quiz/getQuizById/${quizId}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          
          setQuizData(data);
          setQuestionFileId(data.questionFileId); // Set questionFileId from fetched data
        } else {
          console.error("Failed to fetch quiz data");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    
    fetchQuizData();
  }, [quizId]);

  const handleAnswerSelect = (questionIndex, answerId) => {
    setUserAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionIndex] || [];

      if (quizData.questions[questionIndex].type === "MAQ") {
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

  const handleSubmit = async () => {
    const submissionData = {
      userId,
      questionFileId,
      quizId,
      userAnswers: quizData.questions.map((quizItem, index) => {
        const selectedAnswers = userAnswers[index] || [];
        return {
          questionId: quizItem.questId,
          selectedAnswerId: Array.isArray(selectedAnswers) ? selectedAnswers : [selectedAnswers],
        };
      }),
    };

    try {
      const response = await fetch("http://localhost:9999/quizSubmit/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });
      if (response.ok) {
        const result = await response.json();
        navigate("/user/quiz-result", { state: { results: result } });
      } else {
        console.error("Failed to submit quiz");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (!quizData) return <p>Loading...</p>;

  return (
    <div className="d-flex">
      <div className="side-nav p-3">
        <ul className="list-unstyled">
          {quizData.questions.map((_, index) => (
            <li key={index} className="my-2">
              <Button
                variant="outline-primary"
                onClick={() => questionRefs.current[index].scrollIntoView({ behavior: "smooth" })}
              >
                {index + 1}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="quiz-content flex-grow-1 p-3">
        {quizData.questions.map((quizItem, index) => (
          <Card
            key={quizItem.questId}
            ref={(el) => (questionRefs.current[index] = el)}
            id={`question-${index}`}
            className="mb-3"
            style={style.card}
          >
            <Card.Header className="questionCard">
              <h5>{quizItem.content}</h5>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                {quizItem.type === "MAQ" ? "Chọn nhiều đáp án" : "Chọn một đáp án"}
              </Card.Title>

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
