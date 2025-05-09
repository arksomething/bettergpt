"use client";

import React, { useEffect, useRef } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import "./ui/3d-card.css";
import "./AnimatedCard.css";
import { TextHighlight } from "./ui/TextHighlight";

export function AnimatedCard() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Add dynamic particle effect
    if (containerRef.current) {
      const wrapper = containerRef.current.querySelector('.animation-wrapper');
      
      // Create particles
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');
        particle.style.setProperty('--delay', `${Math.random() * 5}s`);
        particle.style.setProperty('--size', `${Math.random() * 4 + 1}px`);
        particle.style.setProperty('--speed', `${Math.random() * 10 + 10}s`);
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        wrapper.appendChild(particle);
      }
    }
  }, []);

  return (
    <div ref={containerRef}>
      <CardContainer className="premium-card-container">
        <CardBody className="animated-card-body">
          <div className="glowing-border"></div>
          
          <CardItem
            translateZ={60}
            className="card-title-wrapper"
          >
            <span className="card-eyebrow">New</span>
            <h2 className="card-title">
              Interactive AI Chat Box
            </h2>
          </CardItem>
          
          <CardItem
            as="p"
            translateZ={70}
            className="card-subtitle"
          >

          </CardItem>
          
          <CardItem translateZ={120} className="card-animation-container">
            <div className="animation-wrapper">
              {/* Animated grid background */}
              <div className="grid-animation"></div>
              
              {/* Glowing orb in center */}
              <div className="central-glow"></div>
              <div className="pulse-rings"></div>
              
              {/* Interactive component models with better descriptions */}
              <div className="component-element flashcard">
                <div className="component-glow"></div>
                <div className="flashcard-inner">
                  <div className="flashcard-title">Smart Learning</div>
                  <div className="flashcard-content">AI-powered flashcards & quizzes</div>
                </div>
              </div>
              
              <div className="component-element calculator">
                <div className="component-glow"></div>
                <div className="calc-screen">42.0</div>
                <div className="calc-buttons">
                  <div className="calc-btn">∑</div>
                  <div className="calc-btn">∫</div>
                  <div className="calc-btn">π</div>
                  <div className="calc-btn">f(x)</div>
                </div>
              </div>
              
              <div className="component-element notebook">
                <div className="component-glow"></div>
                <div className="notebook-lines"></div>
                <div className="notebook-text">Content Writer</div>
                <div className="notebook-subtext">Auto-generate & polish</div>
              </div>
              
              <div className="component-element graph">
                <div className="component-glow"></div>
                <div className="graph-bar bar1"></div>
                <div className="graph-bar bar2"></div>
                <div className="graph-bar bar3"></div>
                <div className="graph-bar bar4"></div>
                <div className="graph-label">Analytics</div>
              </div>
              
              {/* Feature highlights - enhanced badges */}
              <div className="feature-badge code-assistant">Code Assistant</div>
              <div className="feature-badge image-gen">Image Generator</div>
              <div className="feature-badge chat-bot">Multi-Model Chat</div>
            </div>
          </CardItem>
          
          {/* Feature description */}
          <CardItem translateZ={50} className="feature-description">
            <TextHighlight className="highlight-premium">Advanced models</TextHighlight> with real-time collaboration and seamless tool switching
          </CardItem>
          
          <div className="card-buttons">
            <CardItem
              translateZ={30}
              as="a"
              href="/demo"
              className="card-button try-demo"
            >
              <span className="button-text">Try interactive features</span>
              <span className="button-icon">→</span>
            </CardItem>
          </div>
          
          {/* Card footer with status indicator */}
          <CardItem translateZ={20} className="card-footer">
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-text">Using Open Render API</span>
            </div>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
} 