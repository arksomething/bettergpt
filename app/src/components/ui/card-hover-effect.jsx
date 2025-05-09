import React, { useState } from "react";
import "./card-hover-effect.css";

export const HoverEffect = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="hover-effect-container">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`hover-card ${hoveredIndex === idx ? "hovered" : ""}`}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="hover-card-content">
            <h3 className="hover-card-title">{item.title}</h3>
            <p className="hover-card-description">{item.description}</p>
          </div>
          
          {/* Card glow effect */}
          <div className="hover-card-glow"></div>
          
          {/* Background grid */}
          <div className="hover-card-grid"></div>
        </div>
      ))}
    </div>
  );
}; 