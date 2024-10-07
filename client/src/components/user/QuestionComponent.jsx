import React from "react";
import "./QuestionComponent.css"; // Add CSS for specific styling if needed

export default function QuestionComponent({
  quizItem,
  userAnswer,
  index,
  handleAnswerSelect,
}) {
  return (
    <div className="answer-container">
      {quizItem.answers.map((answer) => (
        <div
          className={`answer-style ${
            quizItem.type === "MAQ"
              ? Array.isArray(userAnswer) && userAnswer.includes(answer.id)
                ? "selected"
                : ""
              : userAnswer === answer.id
                ? "selected"
                : ""
          }`}
          key={answer.id}
          onClick={() => handleAnswerSelect(index, answer.id)}
        >
          <input
            type={quizItem.type === "MAQ" ? "checkbox" : "radio"}
            name={`question-${index}`}
            id={`answer-${index}-${answer.id}`}
            checked={
              quizItem.type === "MAQ"
                ? userAnswer?.includes(answer.id) || false
                : userAnswer === answer.id
            }
            onChange={() => handleAnswerSelect(index, answer.id)}
            style={{ visibility: "hidden" }} // Hide default input
          />
          <label
            htmlFor={`answer-${index}-${answer.id}`}
            className="answer-label"
          >
            {answer.text}
          </label>
        </div>
      ))}
    </div>
  );
}
