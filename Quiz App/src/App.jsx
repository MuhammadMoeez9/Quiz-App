import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faRotateRight } from "@fortawesome/free-solid-svg-icons";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Quiz = ({ questions: initialQuestions }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  useEffect(() => {
    setQuestions(shuffleArray(initialQuestions));
  }, [initialQuestions]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setUserAnswers([...userAnswers, selectedAnswer]);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer("");
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setQuestions(shuffleArray(initialQuestions));
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setScore(0);
    setUserAnswers([]);
    setShowCorrectAnswers(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Quiz App</h1>
        {!showResult ? (
          <>
            <div className="mb-4 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <h3 className="text-lg font-medium mb-4">
              {questions[currentQuestion]?.questionText}
            </h3>
            <div className="space-y-2">
              {questions[currentQuestion]?.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="quiz-option"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => handleAnswerSelect(option)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <label htmlFor={`option-${index}`} className="text-lg">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl mb-4">
              Your score: {score} out of {questions.length}
            </p>
            <p className="text-xl mb-4">
              Percentage: {((score / questions.length) * 100).toFixed(2)}%
            </p>

            <div className="flex justify-center items-center space-x-2 mb-4">
              {score === questions.length ? (
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <span className="text-lg font-semibold">
                {score === questions.length
                  ? "Perfect Score!"
                  : "Keep practicing!"}
              </span>
            </div>
            {showCorrectAnswers && (
              <div className="mt-6 text-left">
                <h3 className="text-xl font-semibold mb-3">Correct Answers:</h3>
                {questions.map((question, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-100 rounded-md">
                    <p className="font-medium">
                      {index + 1}. {question.questionText}
                    </p>
                    <p className="mt-2">
                      Your answer:{" "}
                      <span
                        className={
                          userAnswers[index] === question.correctAnswer
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {userAnswers[index]}
                      </span>
                    </p>
                    <p className="mt-1">
                      Correct answer:{" "}
                      <span className="text-green-600 font-semibold">
                        {question.correctAnswer}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="p-6 bg-gray-50 flex justify-center flex-col items-center space-y-2">
        {!showResult ? (
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className={`w-full max-w-xs py-2 px-4 rounded ${
              selectedAnswer
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        ) : (
          <>
            <button
              onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}
              className="w-full max-w-xs py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {showCorrectAnswers
                ? "Hide Correct Answers"
                : "Show Correct Answers"}
            </button>

            <button
              onClick={restartQuiz}
              className="w-2/4 max-w-xs py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <FontAwesomeIcon icon={faRotateRight} className="mr-2" />
            </button>
            <button
              onClick={restartQuiz}
              className="w-2/4 max-w-xs py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const questions = [
    {
      questionText: "console.log (typeof typeof 1);",
      options: ["String", "Number", "1", "True"],
      correctAnswer: "String",
    },
    {
      questionText: "console.log(This is a string. instanceof String);?",
      options: ["True", "False"],
      correctAnswer: "False",
    },
    {
      questionText: "console.log(('b' + 'a' + + 'a' + 'a').toLowerCase());",
      options: ["bananaa", "baaa", "banana", "ananas"],
      correctAnswer: "banana",
    },
    {
      questionText: "console.log(typeof NaN);",
      options: ["NaN", "Number", "Null", "Undefined"],
      correctAnswer: "Number",
    },
    {
      questionText:
        "let array = [1, 2, 3];array[6] = 9; console.log(array[5]);",
      options: ["1", "2", "9", "undefined"],
      correctAnswer: "undefined",
    },
    {
      questionText: "const sum = eval('10*10+5');",
      options: ["''105''", 105, "TypeError", "10*10+5"],
      correctAnswer: 105,
    },
    {
      questionText: "What is the smallest planet in our solar system?",
      options: ["Earth", "Venus", "Mars", "Mercury"],
      correctAnswer: "Mercury",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <Quiz questions={questions} />
    </div>
  );
}
