"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import "./ui/3d-card.css";
import "./AnimatedCard.css";

export function AnimatedCard() {
  return (
    <CardContainer>
      <CardBody className="animated-card-body">
        <CardItem
          translateZ={50}
          className="card-title"
        >
          Your Intelligent Canvas
        </CardItem>
        <CardItem
          as="p"
          translateZ={60}
          className="card-subtitle"
        >
          Every creative AI tool, thoughtfully connected
        </CardItem>
        <CardItem translateZ={100} className="card-animation-container">
          <div className="animation-wrapper">
            {/* Animated grid background */}
            <div className="grid-animation"></div>
            
            {/* Interactive component models */}
            <div className="component-element flashcard">
              <div className="flashcard-inner">
                <div className="flashcard-title">Flashcard</div>
                <div className="flashcard-content">What is ReflexAI?</div>
              </div>
            </div>
            
            <div className="component-element calculator">
              <div className="calc-screen">42</div>
              <div className="calc-buttons">
                <div className="calc-btn">7</div>
                <div className="calc-btn">8</div>
                <div className="calc-btn">9</div>
                <div className="calc-btn">+</div>
              </div>
            </div>
            
            <div className="component-element notebook">
              <div className="notebook-lines"></div>
              <div className="notebook-text">Project Notes</div>
            </div>
            
            <div className="component-element graph">
              <div className="graph-bar bar1"></div>
              <div className="graph-bar bar2"></div>
              <div className="graph-bar bar3"></div>
              <div className="graph-bar bar4"></div>
            </div>
            
            {/* Central glow */}
            <div className="central-glow"></div>
          </div>
        </CardItem>
        <div className="card-buttons">
          <CardItem
            translateZ={20}
            as="a"
            href="/demo"
            className="card-button try-demo"
          >
            Try demo →
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
} 