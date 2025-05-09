import React, { useState } from "react";
import "./card-stack.css";

export const CardStack = ({ items }) => {
  const [cards] = useState(items);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCardClick = () => {
    // Toggle between question and answer
    setShowingAnswer(!showingAnswer);
  };
  
  const handleNextCard = () => {
    setShowingAnswer(false); // Reset to showing question
    
    // Move to next card
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to first card
    }
  };
  
  const handlePrevCard = () => {
    setShowingAnswer(false); // Reset to showing question
    
    // Move to previous card
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(cards.length - 1); // Loop to last card
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="card-stack-container">
      {cards.map((card, index) => {
        // Only render the visible card and a few surrounding ones for performance
        if (Math.abs(currentIndex - index) > 3) return null;

        return (
          <div
            key={card.id || index}
            className={`card-stack-card ${index === currentIndex ? "card-stack-card-top" : ""}`}
            style={{
              zIndex: items.length - Math.abs(currentIndex - index),
              transform: `translateY(${Math.abs(currentIndex - index) * 5}px) scale(${
                1 - Math.abs(currentIndex - index) * 0.05
              }) rotate(${Math.abs(currentIndex - index) % 2 === 0 ? Math.abs(currentIndex - index) * -1 : Math.abs(currentIndex - index)}deg)`,
              opacity: 1 - Math.abs(currentIndex - index) * 0.15,
              display: index === currentIndex ? "block" : Math.abs(currentIndex - index) > 3 ? "none" : "block",
            }}
            onClick={index === currentIndex ? handleCardClick : null}
          >
            {index === currentIndex ? (
              showingAnswer ? (
                // Answer card - completely separate from question card
                <div className="card-answer-face">
                  <div className="card-stack-header">
                    <div className="card-stack-category">{card.category}</div>
                  </div>
                  <div className="card-stack-content card-stack-answer">
                    {card.answer || "This is the back of the card. Add an 'answer' property to display content here."}
                  </div>
                  <div className="card-stack-footer">
                    <span className="card-stack-tip">Tap to see question →</span>
                  </div>
                </div>
              ) : (
                // Question card
                <div className="card-question-face">
                  <div className="card-stack-header">
                    <div className="card-stack-title">{card.title}</div>
                    <div className="card-stack-category">{card.category}</div>
                  </div>
                  <div className="card-stack-content">{card.content}</div>
                  <div className="card-stack-footer">
                    <span className="card-stack-tip">Tap to see answer →</span>
                  </div>
                </div>
              )
            ) : null}
          </div>
        );
      })}
      
      {/* Navigation buttons */}
      <div className="card-stack-navigation">
        <button className="card-stack-nav-btn prev" onClick={handlePrevCard}>←</button>
        <button className="card-stack-nav-btn next" onClick={handleNextCard}>→</button>
      </div>
    </div>
  );
}; 