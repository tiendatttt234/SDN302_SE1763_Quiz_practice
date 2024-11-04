import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/FlashCard.css";

const FlashcardPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [questionFileName, setQuestionFileName] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = localStorage.getItem("userId");


  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9999/questionFile/getById/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data);

        const fileName = data.questionFile.name || "Tệp câu hỏi";

        const transformedData = data.questionFile.arrayQuestion.map((question) => ({
          id: question.questionId,
          question: question.content,
          type: question.type,
          answers: question.answers.map((answer) => ({
            id: answer.answerId,
            text: answer.answerContent,
          })),
          correctAnswers: question.answers
            .filter((answer) => answer.isCorrect)
            .map((answer) => answer.answerId),
        }));

        setQuestionFileName(fileName);
        setQuizData(transformedData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    if(id){
      fetchQuizData();
    }

  }, [id]);

  const handleCreateQuiz = async () => {

    if (!userId) {
      toast.error("Vui lòng đăng nhập để làm bài kiểm tra");
      setTimeout(() => {
        navigate(`/login`);
      }, 1500);
      return;
    }

    const questionFileId = id;

    if (questionCount > quizData.length) {
      toast.error("Số lượng câu hỏi không hợp lệ. Vui lòng nhập lại.");
      return;
    }

    const quizDataToSend = {
      quizName,
      questionCount,
      userId,
      questionFileId,
    };

    try {
      const response = await fetch("http://localhost:9999/quiz/create-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizDataToSend),
      });

      if (response.ok) {
        const data = await response.json();
        const quizId = data.quiz._id;
        toast.success("Tạo bài kiểm tra thành công!");

        setTimeout(() => {
          navigate(`/user/quiz/attempt/${quizId}?questionFileId=${questionFileId}`);
        }, 2000);
      } else {
        toast.error("Không thể tạo bài kiểm tra");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error("Lỗi khi tạo bài kiểm tra");
    }

    setShowModal(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === quizData.length - 1 ? 0 : prevIndex + 1
    );
    setIsFlipped(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quizData.length - 1 : prevIndex - 1
    );
    setIsFlipped(false);
  };

  if (!quizData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flashcard-wrapper">
      <ToastContainer />
      <div>
        <h1>{questionFileName}</h1>
      </div>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Tạo Bài Kiểm Tra
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo Bài Kiểm Tra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="quizName">
              <Form.Label>Tên bài kiểm tra</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên bài kiểm tra"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="questionCount" className="mt-3">
              <Form.Label>Số lượng câu hỏi</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số lượng câu hỏi"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleCreateQuiz}>
            Tạo bài kiểm tra
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="question-counter">
        Question {currentIndex + 1} of {quizData.length}
      </div>

      <div className="flashcard-container" onClick={handleFlip}>
        <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
          <div className="front">{quizData[currentIndex].question}</div>
          <div className="back">
            <ul>
              {quizData[currentIndex].answers
                .filter((answer) =>
                  quizData[currentIndex].correctAnswers.includes(answer.id)
                )
                .map((answer) => (
                  <li key={answer.id}>{answer.text}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="prev-button" onClick={handlePrev}>
          Previous
        </button>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardPage;
