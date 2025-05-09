import React from 'react';

const Card = ({ header, content, image }) => {
  return (
    <div className="card">
      {image && <img src={image} alt={header} />}
      <h2>{header}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Card;

