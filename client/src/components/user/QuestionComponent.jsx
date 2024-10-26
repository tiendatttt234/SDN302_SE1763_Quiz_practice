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
            ? userAnswer?.includes(answer.answerId)
            : userAnswer === answer.answerId;

        return (
          <div
            className={`answer-style `}
            key={answer.answerId}
            onClick={() => handleAnswerSelect(index, answer.answerId)}
          >
            <input
              type={quizItem.type === "MAQ" ? "checkbox" : "radio"}
              name={`question-${index}`}
              id={`answer-${index}-${answer.answerId}`}
              checked={isSelected}
              onChange={() => handleAnswerSelect(index, answer.answerId)}
              // style={{ visibility: "hidden" }}
            />
            <label
              htmlFor={`answer-${index}-${answer.answerId}`}
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
