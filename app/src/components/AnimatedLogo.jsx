import React, { useEffect, useState } from 'react';

const AnimatedLogo = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animPhase, setAnimPhase] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  
  // Handle click to trigger animation
  const handleClick = () => {
    if (isAnimating) return; // Prevent multiple animations
    
    setIsAnimating(true);
    setAnimPhase(1);
    
    // Create sequence of animations
    const newIntervalId = setInterval(() => {
      setAnimPhase(prev => {
        if (prev >= 5) {
          clearInterval(newIntervalId);
          setIsAnimating(false);
          return 0; // Back to static state
        }
        return prev + 1;
      });
    }, 150); // Animation speed
    
    setIntervalId(newIntervalId);
  };
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);
  
  // Different effects based on animation phase
  const getTopChevronStyles = () => {
    if (!isAnimating) return {};
    
    switch(animPhase) {
      case 1: return { transform: 'scale(1.1) translate(-5px, -5px)', fill: '#f0f0f0' };
      case 2: return { transform: 'scale(1.2) translate(-8px, -8px)', fill: '#e0e0e0' };
      case 3: return { transform: 'scale(1.1) translate(-5px, -5px)', fill: '#f0f0f0' };
      case 4: return { transform: 'scale(1.05) translate(-2px, -2px)', fill: '#f8f8f8' };
      default: return { transform: 'scale(1) translate(0, 0)', fill: 'white' };
    }
  };
  
  const getBottomChevronStyles = () => {
    if (!isAnimating) return {};
    
    switch(animPhase) {
      case 1: return { transform: 'scale(1.1) translate(5px, 5px)', fill: '#f0f0f0' };
      case 2: return { transform: 'scale(1.2) translate(8px, 8px)', fill: '#e0e0e0' };
      case 3: return { transform: 'scale(1.1) translate(5px, 5px)', fill: '#f0f0f0' };
      case 4: return { transform: 'scale(1.05) translate(2px, 2px)', fill: '#f8f8f8' };
      default: return { transform: 'scale(1) translate(0, 0)', fill: 'white' };
    }
  };
  
  return (
    <div 
      className="logo-svg-container"
      onClick={handleClick}
    >
      <svg viewBox="0 0 300 300" width="32" height="32">
        <rect width="300" height="300" fill="transparent"/>
        
        {/* Top chevron/arrow - always fully visible */}
        <path 
          d={`M105,95 L150,145 L185,110 L220,75 L165,75 L130,110 Z`}
          fill="white"
          style={{
            transition: "all 0.15s ease-out",
            ...getTopChevronStyles()
          }}
        />
        
        {/* Bottom chevron/arrow - always fully visible */}
        <path 
          d={`M80,225 L135,225 L170,190 L150,170 L100,220 Z`}
          fill="white"
          style={{
            transition: "all 0.15s ease-out",
            ...getBottomChevronStyles()
          }}
        />
      </svg>
    </div>
  );
};

export default AnimatedLogo; 