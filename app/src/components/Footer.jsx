import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';
import './Footer.css';

const BackgroundBoxes = () => {
  // Create arrays for grid
  const rows = new Array(20).fill(1);
  const cols = new Array(20).fill(1);
  
  // Colors that match your site's palette
  const colors = [
    "rgba(123, 97, 255, 0.4)",
    "rgba(76, 0, 255, 0.3)",
    "rgba(125, 0, 180, 0.3)",
    "rgba(0, 212, 255, 0.3)",
    "rgba(84, 0, 255, 0.3)"
  ];
  
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="boxes-container">
      {rows.map((_, i) => (
        <div key={`row-${i}`} className="boxes-row">
          {cols.map((_, j) => (
            <motion.div
              key={`box-${i}-${j}`}
              className="box"
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.1, 0.2, 0.1],
                transition: { 
                  duration: 4,
                  repeat: Infinity,
                  delay: (i + j) * 0.1 % 2
                }
              }}
            />
          ))}
        </div>
      ))}
      <div className="boxes-overlay" />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <BackgroundBoxes />
        
        <div className="footer-main">
          <div className="footer-logo">
            <AnimatedLogo />
            <span className="footer-brand">ReflexAI</span>
          </div>
          
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/demo" className="footer-link">Demo</Link>
          </div>
          
          <div className="footer-copyright">
            © {new Date().getFullYear()} ReflexAI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
