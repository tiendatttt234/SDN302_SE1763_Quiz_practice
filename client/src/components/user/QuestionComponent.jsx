import React from "react";
import "./styles/QuestionComponent.css"; // Add CSS for specific styling if needed

export default function QuestionComponent({
  quizItem,
  userAnswer,
  index,
  handleAnswerSelect,
}) {
  return (
    <div className="answer-container">
      {quizItem.answers.map((answer) => {
        const isSelected =
          quizItem.type === "MAQ"
            ? userAnswer?.includes(answer.id)
            : userAnswer === answer.id;

        return (
          <div
            className={`answer-style `}
            key={answer.id}
            onClick={() => handleAnswerSelect(index, answer.id)}
          >
            <input
              type={quizItem.type === "MAQ" ? "checkbox" : "radio"}
              name={`question-${index}`}
              id={`answer-${index}-${answer.id}`}
              checked={isSelected}
              onChange={() => handleAnswerSelect(index, answer.id)}
              // style={{ visibility: "hidden" }} // Hide default input
            />
            <label
              htmlFor={`answer-${index}-${answer.id}`}
              className="answer-label"
            >
              {answer.text}
            </label>
          </div>
        );
      })}
    </div>
  );
}
