import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const audioRef = useRef(null);

  const startCelebration = () => {
    setStarted(true);

    if (!audioRef.current) {
      audioRef.current = new Audio("/song.mp3");
    }
    audioRef.current.play().catch((err) => {
      console.log("Audio play prevented:", err);
    });

    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 90,
        spread: 160,
        origin: { x: Math.random(), y: 0 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    setTimeout(() => {
      setShowCard(true);
    }, duration);
  };

  if (!started) {
    // Initial screen with start button
    return (
      <div className="app-container start-screen">
        <button className="start-button" onClick={startCelebration}>
          🎉 Open the Magic
        </button>
      </div>
    );
  }

  // After start button clicked, show the main app
  return (
    <div className="app-container">
      <img
        src="/anniversary-bg.png"
        alt="Anniversary"
        className="background-img"
      />

      {showCard && (
        <div className="flip-container" onClick={() => setFlipped(!flipped)}>
          <div className={`flipper ${flipped ? "flipped" : ""}`}>
            <div className="front">
              <span className="heartbeat-icon" role="img" aria-label="heart">
                💖
              </span>
              <h2>💌 Tap to Open</h2>
            </div>
            <div className="back">
              <h1 className="big-number">10 Years 💖</h1>
              <p>
                From a single “yes” to a lifetime of love - today, I celebrate
                you and every moment we’ve shared.
              </p>
              <p>Here’s to many more chapters, hand in hand. ❤️</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
