import React from "react";

const Question = ({ question, onAnswerClick }) => {
  return (
    <div>
      <h3>{question.questionText}</h3>
      <div>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerClick(option === question.correctAnswer)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
