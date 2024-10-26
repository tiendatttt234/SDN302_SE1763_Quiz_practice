import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles/FlashCard.css"; // Assuming you keep your CSS file here

const FlashcardPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [quizName, setQuizName] = useState("");
  const [questionFileName, setQuestionFileName] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const navigate = useNavigate();


// giả sử có userId và questionfileId của client 
const [userId] = useState("6718b40f01a9ac9b0e084342");
const [questionFileId] = useState("671bb0a19dfaf03952134943");


  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("http://localhost:9999/questionFile/getById/671bb0a19dfaf03952134943");
        const data = await response.json();
        // console.log(data);
        
        const fileName = data.questionFile.name || "Tệp câu hỏi";
        
        // Transform the data structure to fit the component format
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

        // console.log(transformedData);
        setQuestionFileName(fileName);
        setQuizData(transformedData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);


  const handleCreateQuiz = async () => {
    const quizData = {
      quizName,
      questionCount,
      userId,
      questionFileId
    };

    try {
      const response = await fetch("http://localhost:9999/quiz/create-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData), // Send the data as JSON
      });

      if (response.ok) {
        const data = await response.json(); // Nhận dữ liệu trả về từ server
        const quizId = data.quiz._id; // Giả sử server trả về { quizId: "your_quiz_id" }
        // Handle success (you could navigate to another page or show a success message)
        navigate(`/user/quiz/attempt/${quizId}`);
      } else {
        // Handle server errors
        console.error("Failed to create quiz");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
    }

    setShowModal(false); // Close the modal
  };

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

  if (!quizData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flashcard-wrapper">
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
