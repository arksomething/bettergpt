import React from "react";
import './Link.css';

const Link = ({ href, test,}) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
};

export default Link;
