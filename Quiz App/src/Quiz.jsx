import React, { useState } from "react";
import Question from "./Question";

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setIsQuizFinished(true);
    }
  };

  return (
    <div>
      {isQuizFinished ? (
        <div>
          <h2>
            Quiz Completed! Your Score: {score} / {questions.length}
          </h2>
        </div>
      ) : (
        <Question
          question={questions[currentQuestionIndex]}
          onAnswerClick={handleAnswerOptionClick}
        />
      )}
    </div>
  );
};

export default Quiz;
