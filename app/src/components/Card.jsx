import React, { useState } from 'react';

const Card = ({ header, content, image }) => {
  const [showImage, setShowImage] = useState(true);

  return (
    <div className="card">
      {image && showImage && (
        <img 
          src={image} 
          alt={header} 
          onError={() => setShowImage(false)}
        />
      )}
      <h2>{header}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Card;

