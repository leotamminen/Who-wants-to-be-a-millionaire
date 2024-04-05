import React, { useEffect, useState } from "react";
import "./App.css";
import GameOver from "./components/GameOver";
import GameWinner from "./components/GameWinner";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import { questions, prizeSums } from "./questions";
import Start from "./components/Start";

function App() {
  const [name, setName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [answersLocked, setAnswersLocked] = useState(false);
  const [isMillionaire, setIsMillionaire] = useState(false);
  const [earnedMoney, setEarnedMoney] = useState("0 €");

  // Update earned money when the question number changes
  useEffect(() => {
    // only start tracking after player got through first question
    questionNumber > 1 &&
      setEarnedMoney(
        prizeSums.find((item) => item.id === questionNumber - 1).amount
      );
  }, [questionNumber]);

  // Define a function to update isMillionaire state
  const handleBecomeMillionaire = () => {
    setIsMillionaire(true);
  };

  // Only render the game content if the name is provided
  return (
    <div className="App">
      {name ? (
        <>
          <div className="game-container">
            <div className="timer-container">
              <div className="timer">
                <Timer
                  setTimeOut={setTimeOut}
                  questionNumber={questionNumber}
                  answersLocked={answersLocked}
                />
              </div>
            </div>
            <div className="game">
              {timeOut ? (
                <GameOver className="game-over" earnedMoney={earnedMoney} />
              ) : isMillionaire ? (
                <GameWinner className="game-over" />
              ) : (
                <Quiz
                  questions={questions}
                  questionNumber={questionNumber}
                  setQuestionNumber={setQuestionNumber}
                  setTimeOut={setTimeOut}
                  setAnswersLocked={setAnswersLocked}
                  handleBecomeMillionaire={handleBecomeMillionaire}
                />
              )}
            </div>
          </div>
          <div className="money-container">
            <ul className="money-list">
              {prizeSums.map((item) => (
                <li
                  key={item.id}
                  className={questionNumber === item.id ? "item active" : "item"}
                >
                  <h5 className="amount">{item.amount}</h5>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setName={setName} setTimeOut={setTimeOut} />
      )}
    </div>
  );
}

export default App;
