import React, { useState } from "react";
import "./card-stack.css";

export const CardStack = ({ items }) => {
  const [cards, setCards] = useState(items);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = () => setDragging(true);
  
  const handleDragEnd = () => {
    setDragging(false);
    
    // Move the top card to the bottom of the stack
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const [topCard] = newCards.splice(0, 1);
      newCards.push(topCard);
      return newCards;
    });
  };

  return (
    <div className="card-stack-container">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={`card-stack-card ${index === 0 ? "card-stack-card-top" : ""} ${
            dragging ? "card-stack-card-dragging" : ""
          }`}
          style={{
            zIndex: items.length - index,
            transform: `translateY(${index * 5}px) scale(${
              1 - index * 0.05
            }) rotate(${index % 2 === 0 ? index * -1 : index}deg)`,
            opacity: 1 - index * 0.15,
          }}
          draggable={index === 0}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="card-stack-header">
            <div className="card-stack-title">{card.title}</div>
            <div className="card-stack-category">{card.category}</div>
          </div>
          <div className="card-stack-content">{card.content}</div>
          <div className="card-stack-footer">
            <span className="card-stack-tip">Drag to flip →</span>
          </div>
        </div>
      ))}
    </div>
  );
}; 