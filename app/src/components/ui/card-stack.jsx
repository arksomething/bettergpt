import React, { useState } from "react";
import "./card-stack.css";

export const CardStack = ({ items, cardWidth = 500, cardHeight = 200 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showingAnswer, setShowingAnswer] = useState(false);

  if (!items || items.length === 0) return null;
  const card = items[currentIndex];
  const isFlippable = !!card.answer;

  const handleNext = () => {
    setShowingAnswer(false);
    setCurrentIndex((i) => (i + 1) % items.length);
  };

  const handlePrev = () => {
    setShowingAnswer(false);
    setCurrentIndex((i) => (i - 1 + items.length) % items.length);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "fit-content", margin: "0 auto" }}>
      <div
        className="card-stack-card card-stack-card-top"
        style={{
          width: cardWidth,
          height: cardHeight,
          boxSizing: "border-box",
          cursor: isFlippable ? "pointer" : "default",
          margin: "0 auto"
        }}
        onClick={isFlippable ? () => setShowingAnswer((v) => !v) : undefined}
      >
        {showingAnswer && isFlippable ? (
          <div className="card-answer-face">
            <div className="card-stack-header">
              <div className="card-stack-category">{card.category}</div>
            </div>
            <div className="card-stack-content card-stack-answer">
              {card.answer}
            </div>
            <div className="card-stack-footer">
              <span className="card-stack-tip">Tap to see question →</span>
            </div>
          </div>
        ) : (
          <div className="card-question-face">
            <div className="card-stack-header">
              <div className="card-stack-title">{card.title}</div>
              <div className="card-stack-category">{card.category}</div>
            </div>
            <div className="card-stack-content">{card.content}</div>
            <div className="card-stack-footer">
              <span className="card-stack-tip">
                {isFlippable ? "Tap to see answer →" : "No answer available"}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="card-stack-navigation" style={{ marginTop: 16 }}>
        <button className="card-stack-nav-btn prev" onClick={handlePrev}>←</button>
        <button className="card-stack-nav-btn next" onClick={handleNext}>→</button>
      </div>
    </div>
  );
}; 