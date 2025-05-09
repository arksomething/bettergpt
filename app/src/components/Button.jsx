import React from 'react';
import './Button.css';
const Button = ({ text, prompt, streamAIResponse }) => {
  return (
    <div className="button-container">
      <button className="button" onClick={() => streamAIResponse(prompt)}>
        {text}
      </button>
    </div>
  );
};

export default Button;

