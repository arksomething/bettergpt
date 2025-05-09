import React from "react";

export const TextHighlight = ({ children, className = "" }) => {
  return (
    <span className={`highlight ${className}`}>
      {children}
    </span>
  );
}; 