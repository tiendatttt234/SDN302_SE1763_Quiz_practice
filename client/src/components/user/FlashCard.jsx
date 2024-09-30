import React, { useState } from "react";
import "./FlashCard.css"; // You will define the styles here
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap"; // Import Bootstrap for Modal
import { useNavigate } from "react-router-dom";

const Flashcard = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showQuizSetup, setShowQuizSetup] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const navigate = useNavigate();

  const questions = [
    { question: "What is the capital of France?", answer: "Paris" },
    {
      question: "What is the largest ocean on Earth?",
      answer: "Pacific Ocean",
    },
    { question: 'Who wrote "Hamlet"?', answer: "William Shakespeare" },
    {
      question: "What is the boiling point of water?",
      answer: "100°C (212°F)",
    },
  ];

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextQuestion = () => {
    setIsFlipped(false); // Reset to show question side
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex === questions.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousQuestion = () => {
    setIsFlipped(false); // Reset to show question side
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex === 0 ? questions.length - 1 : prevIndex - 1
    );
  };

  // Modal controls for quiz setup
  const handleShowQuizSetup = () => setShowQuizSetup(true);
  const handleCloseQuizSetup = () => setShowQuizSetup(false);

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (numQuestions > questions.length) {
      alert(`Số lượng câu hỏi không được vượt quá ${questions.length}`);
    } else {
      navigate("/user/quiz/attempt");
    }
  };

  return (
    <div className="flashcard-wrapper">
      <Container fluid>
        <Row>
          <Col xs={3}></Col>
        </Row>
        <Row style={{ marginBottom: "10px" }}>
          <Col xs={6} md={4}></Col>
          <Col xs={6} md={4}>
            <div className="flashcard-container" onClick={handleCardClick}>
              <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
                <div className="front">
                  <p>{questions[currentQuestionIndex].question}</p>
                </div>
                <div className="back">
                  <p>{questions[currentQuestionIndex].answer}</p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={6} md={4}>
            <div style={{marginBottom: "10px"}}>
              <Button
                variant="primary"
                onClick={handleShowQuizSetup}
                className="create-quiz-btn"
              >
                Tạo bài kiểm tra
              </Button>
              </div>
            <div>
              <Button>test</Button>
              </div>
          </Col>
        </Row>

        <Row>
          <div className="navigation-buttons">
            <button onClick={handlePreviousQuestion} className="prev-button">
              ←
            </button>

            <div className="question-counter">
              {currentQuestionIndex + 1} / {questions.length}
            </div>

            <button onClick={handleNextQuestion} className="next-button">
              →
            </button>
          </div>
        </Row>

        {/* Flashcard */}

        {/* Hiển thị số câu hiện tại / tổng số câu */}

        {/* Nút Previous và Next */}

        {/* Quiz setup modal */}
        <Modal show={showQuizSetup} onHide={handleCloseQuizSetup}>
          <Modal.Header closeButton>
            <Modal.Title>Thiết lập bài kiểm tra</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleQuizSubmit}>
              <Form.Group controlId="quizName">
                <Form.Label>Tên bài kiểm tra</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên bài kiểm tra"
                  value={quizName}
                  onChange={(e) => setQuizName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="numQuestions" className="mt-3">
                <Form.Label>
                  Số lượng câu hỏi (tối đa {questions.length})
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`Nhập số lượng câu hỏi (tối đa ${questions.length})`}
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                  required
                  min="1"
                  max={questions.length}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Bắt đầu bài kiểm tra
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Flashcard;
