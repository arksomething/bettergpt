import React from 'react';

const Button = ({ text, prompt, streamAIResponse }) => {
  return (
    <button onClick={() => streamAIResponse(prompt)}>
      {text}
    </button>
  );
};

export default Button;

