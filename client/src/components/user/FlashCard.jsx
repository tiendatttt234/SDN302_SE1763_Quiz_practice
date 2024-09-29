import React, { useState } from "react";
import "./FlashCard.css"; // You will define the styles here
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'; // Import Bootstrap for Modal

const Flashcard = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showQuizSetup, setShowQuizSetup] = useState(false); 
  const [quizName, setQuizName] = useState('');
  const [numQuestions, setNumQuestions] = useState(0);

  const questions = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is the largest ocean on Earth?", answer: "Pacific Ocean" },
    { question: 'Who wrote "Hamlet"?', answer: "William Shakespeare" },
    { question: "What is the boiling point of water?", answer: "100°C (212°F)" },
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
      handleCloseQuizSetup();
    }
  };

  return (
    
    <div className="flashcard-wrapper">
                <Button variant="primary" onClick={handleShowQuizSetup} className="create-quiz-btn">
          Tạo bài kiểm tra
        </Button>
      {/* Flashcard */}
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

      {/* Hiển thị số câu hiện tại / tổng số câu */}
      <div className="question-counter">
        {currentQuestionIndex + 1} / {questions.length}
      </div>

      {/* Nút Previous và Next */}
      <div className="navigation-buttons">
        <button onClick={handlePreviousQuestion} className="prev-button">←</button>
        <button onClick={handleNextQuestion} className="next-button">→</button>
      </div>

      


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
              <Form.Label>Số lượng câu hỏi (tối đa {questions.length})</Form.Label>
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
    </div>
  );
};

export default Flashcard;
