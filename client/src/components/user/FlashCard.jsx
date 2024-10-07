import React, { useState } from "react";
import { Modal, Button, Form, Card, Row, Col } from "react-bootstrap";
import "./FlashCard.css"; // Assuming you keep your CSS file here

const FlashcardPage = () => {
  const quizData = [
    {
      id: 1,
      question:
        "Điền thêm từ để có câu trả lời đúng theo quan niệm duy vật lịch sử và xác định đó là nhận định của ai?",
      type: "MAQ",
      answers: [
        { id: 1, text: "Toàn bộ các quan hệ xã hội (Ph.Ăngghen)" },
        { id: 2, text: "Tổng hòa những quan hệ xã hội /C.Mác" },
        { id: 3, text: "Tổng hòa các quan hệ kinh tế VI Lênin" },
        { id: 4, text: "Tổng hòa các quan hệ tự nhiên và xã hội (C. Mác)" },
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [quizName, setQuizName] = useState("");
  const [questionCount, setQuestionCount] = useState(0);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === quizData.length - 1 ? 0 : prevIndex + 1
    );
    setIsFlipped(false); // Reset the flip when moving to the next card
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quizData.length - 1 : prevIndex - 1
    );
    setIsFlipped(false); // Reset the flip when moving to the previous card
  };

  const handleCreateQuiz = () => {
    // Handle the creation of a new quiz (store the quizName and questionCount)
    console.log("Quiz Created:", quizName, questionCount);
    setShowModal(false); // Close the modal
  };

  return (
    <div className="flashcard-wrapper">
      {/* Create Quiz Button */}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Tạo Bài Kiểm Tra
      </Button>

      {/* Modal for Creating a Quiz */}
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

      <div className="terminology-section">
        {quizData.map((quiz) => (
          <Card key={quiz.id} className="terminology-card">
            <Card.Header>thuật ngữ</Card.Header>
            <Card.Body className="question-answer-block">
              <Row>
                <Col xs={4} className="question">
                  <p>{quiz.question}</p>
                </Col>
                <Col xs={8} className="answer">
                  <ul>
                    {quiz.answers
                      .filter((answer) =>
                        quiz.correctAnswers.includes(answer.id)
                      )
                      .map((answer) => (
                        <li key={answer.id}>{answer.text}</li>
                      ))}
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlashcardPage;
