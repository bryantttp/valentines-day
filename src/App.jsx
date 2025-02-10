import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [response, setResponse] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Track visibility states
  const [showElements, setShowElements] = useState({
    title: false,
    letterContainer: false,
    letter: false,
    question: false,
    yesButton: false,
    noButton: false,
  });

  // Countdown timer logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date("February 11, 2025 00:00:00");
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsUnlocked(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Gradual appearance logic using setTimeout
  useEffect(() => {
    if (isUnlocked) {
      setTimeout(() => setShowElements((prev) => ({ ...prev, title: true })), 500);
      setTimeout(() => setShowElements((prev) => ({ ...prev, letterContainer: true })), 2500);
      setTimeout(() => setShowElements((prev) => ({ ...prev, letter: true })), 4500);
      setTimeout(() => setShowElements((prev) => ({ ...prev, question: true })), 10000);
      setTimeout(() => setShowElements((prev) => ({ ...prev, yesButton: true })), 12000);
      setTimeout(() => setShowElements((prev) => ({ ...prev, noButton: true })), 13000);
    }
  }, [isUnlocked]);

  const handleYesClick = () => {
    setResponse("Yay! I love you too! 💖");
  };

  const handleNoClick = () => {
    setResponse("Hmm... let me try harder to win your heart! 😉");
  };

  const loveLetter = `To my dearest love,
  You are the most amazing person in my life. Every moment with you is a treasure. You taught and showed me what true love is. Happy Valentine's Day! 💖 

  Yours Forever,  
  Dudu`;

  return (
    <div className="valentine-container">
      {isUnlocked ? (
        <>
          {/* Title */}
          {showElements.title && <h1 className="fade-in">💖 Happy Valentine's Day, My Love! 💖</h1>}

          {/* Love letter container */}
          {showElements.letterContainer && (
            <div className="love-letter fade-in">
              <h2 className="letter-header">My Love Letter to You</h2>
              {showElements.letter && <textarea className="fade-in" defaultValue={loveLetter} readOnly />}
            </div>
          )}

          {/* Question */}
          {showElements.question && <p className="question fade-in">Will you be my Valentine 💌?</p>}

          {/* Buttons */}
          <div className="button-container">
            {showElements.yesButton && (
              <button className="yes-button fade-in" onClick={handleYesClick}>
                Yes! 💖
              </button>
            )}
            {showElements.noButton && (
              <button className="no-button fade-in" onClick={handleNoClick}>
                Not Yet...
              </button>
            )}
          </div>

          {/* Response */}
          {response && <p className="response fade-in">{response}</p>}
        </>
      ) : (
        // Countdown Timer
        <div className="countdown">
          <h1>Counting Down to Valentine's Day 2025</h1>
          <p>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </p>
          <p>Check back on February 14, 2025! 💝</p>
        </div>
      )}
    </div>
  );
}

export default App;
