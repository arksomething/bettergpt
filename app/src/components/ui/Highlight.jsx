import React from 'react';
import './Highlight.css';

export const Highlight = ({ children }) => {
  return (
    <span className="highlight">{children}</span>
  );
}; 