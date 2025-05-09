import React, { createContext, useContext, useRef, useState } from "react";

// Create context for the 3D card
const MouseEnterContext = createContext(null);

export const CardContainer = ({ children, className = "", ...props }) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    containerRef.current.style.setProperty("--x", x);
    containerRef.current.style.setProperty("--y", y);
  };

  return (
    <MouseEnterContext.Provider value={isMouseEntered}>
      <div
        ref={containerRef}
        onMouseEnter={() => setIsMouseEntered(true)}
        onMouseLeave={() => setIsMouseEntered(false)}
        onMouseMove={handleMouseMove}
        className={`card-container ${className}`}
        {...props}
      >
        {children}
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({ children, className = "", ...props }) => {
  const isMouseEntered = useContext(MouseEnterContext);
  
  return (
    <div
      className={`card-body ${isMouseEntered ? "mouse-entered" : ""} ${className}`}
      style={{
        transform: isMouseEntered
          ? "rotateX(calc(var(--y) * 10deg - 5deg)) rotateY(calc(var(--x) * 10deg - 5deg))"
          : "rotateX(0deg) rotateY(0deg)",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Component = "div",
  children,
  className = "",
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  ...props
}) => {
  const isMouseEntered = useContext(MouseEnterContext);
  
  return (
    <Component
      className={`card-item ${className}`}
      style={{
        transform: isMouseEntered
          ? `translateX(calc(var(--x) * ${translateX}px)) translateY(calc(var(--y) * ${translateY}px)) translateZ(${translateZ}px)`
          : "translateX(0px) translateY(0px) translateZ(0px)",
      }}
      {...props}
    >
      {children}
    </Component>
  );
}; 