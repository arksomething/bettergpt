import React, { useState } from 'react';
import './Image.css';

const Image = ({ src, alt, size = 200 }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setHasError(true)}
      style={{
        maxWidth: `${size}px`,
        maxHeight: `${size}px`
      }}
    />
  );
};

export default Image;
