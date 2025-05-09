import { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <div className="flashcard-content">{front}</div>
        </div>
        <div className="flashcard-back">
          <div className="flashcard-content">{back}</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;

