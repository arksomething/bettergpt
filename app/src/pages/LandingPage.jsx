import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { AnimatedCard } from '../components/AnimatedCard';
import { HoverEffect } from '../components/ui/card-hover-effect';
import { FlashcardDemo } from '../components/FlashcardDemo';
import './LandingPage.css'; // Import the CSS file

const features = [
  {
    title: "Contextual Shopping",
    description: "Ask for product recommendations and get a visual shopping grid with filters and images. Browse and compare items without leaving the chat."
  },
  {
    title: "Math Solver & Graph Mode",
    description: "Plot equations, visualize mathematical concepts, and solve complex problems with an interactive calculator and graph system."
  },
  {
    title: "AI Travel Planner",
    description: "Get a complete day-by-day travel itinerary with a drag-and-drop interface to customize your perfect trip with budget tracking."
  },
  {
    title: "Study Mode / Flashcards",
    description: "Turn any topic into an interactive learning experience with automatically generated flashcards, quizzes, and visual timelines."
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  
  const goToDemo = () => {
    navigate('/demo');
  };
  
  return (
    <div className="landing-page">
      <Header />
      
      {/* Hero section with background effects */}
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-grid"></div>
      </div>
      
      <main className="main-content-area">
        <div className="hero-section">
          <h1 className="title">ReflexAI: Your Intelligent Canvas</h1>
          <p className="subtitle">
            Reflex is a context-aware chat interface that transforms into an adaptive operating system — where the conversation itself becomes the controller for dynamic tools, visual modules, and data-rich visualizations.
          </p>
          <div className="button-group">
            <button className="main-button" onClick={goToDemo}>Book a demo</button>
          </div>
        </div>
        
        <div className="card-showcase">
          <AnimatedCard />
        </div>
        
        <FlashcardDemo />
        
        <div className="feature-section">
          <h2 className="feature-title">Key Features</h2>
          <HoverEffect items={features} />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
