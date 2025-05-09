import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AnimatedCard } from '../components/AnimatedCard';
import { HoverEffect } from '../components/ui/card-hover-effect';
import { FlashcardDemo } from '../components/FlashcardDemo';
import AnimatedLogo from '../components/AnimatedLogo';
import './LandingPage.css'; // Import the CSS file

// Component for typing animation
const TypeAnimation = ({ words = [] }) => {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        
        // Slow down at the end of the word
        if (displayText.length === currentWord.length) {
          // Pause at the end of the word
          setTypingSpeed(1500);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        setTypingSpeed(80); // Faster when deleting
        
        // Move to next word when done deleting
        if (displayText.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(150); // Reset typing speed
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed]);

  return (
    <div className="typing-container">
      <span className="typing-text">{displayText}</span>
      <span className="typing-cursor">|</span>
    </div>
  );
};

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
    title: "Study Mode / Flashcards",
    description: "Turn any topic into an interactive learning experience with automatically generated flashcards, quizzes, and visual timelines."
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  
  const goToDemo = () => {
    navigate('/demo');
  };
  
  // Words for typing animation
  const animatedWords = ["flashcards", "calculator", "graphs", "visual notes", "timelines"];
  
  return (
    <div className="landing-page">
      {/* Unified background elements */}
      <div className="page-background">
        <div className="animated-gradient"></div>
        <div className="hero-grid"></div>
        <div className="hero-particles"></div>
        <div className="floating-orbs">
          <div className="orb orb1"></div>
          <div className="orb orb2"></div>
          <div className="orb orb3"></div>
        </div>
      </div>
      
      <Header />
      
      <main className="main-content-area">
        {/* HERO SECTION - Push down to account for new header */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              <div className="title-first-line">
                <div className="hero-logo-wrapper">
                  <AnimatedLogo />
                </div>
                <span className="reflex-text">ReflexAI</span>
              </div>
              <div className="subtitle-line">
                <span className="your-text">Your</span> <span className="highlight-box">Interactive AI</span>
              </div>
            </h1>
            <p className="hero-subtitle">
              Reflex is a context-aware chat interface where you can interact with...
            </p>
            <div className="typing-animation-wrapper">
              <TypeAnimation words={animatedWords} />
            </div>
            <div className="button-group">
              <button className="main-button glow-effect" onClick={goToDemo}>Try it now!</button>
            </div>
          </div>
          
          {/* Add this scroll indicator */}
          <div className="scroll-indicator" onClick={() => document.querySelector('.demo-section').scrollIntoView({ behavior: 'smooth' })}>
            <span className="scroll-text">See more</span>
            <div className="scroll-arrow"></div>
          </div>
        </section>
        
        {/* DEMO SECTION - Now with ID for scrolling */}
        <section className="demo-section" id="interactive-models">
          <div className="section-label">
            <span>Interactive Models</span>
          </div>
          <div className="card-showcase">
            <AnimatedCard />
          </div>
        </section>
        
        {/* LEARNING TOOLS SECTION */}
        <section className="learning-section">
          <div className="section-label">
            <span>Learning Tools</span>
          </div>
          <div className="flashcard-showcase">
            <FlashcardDemo />
          </div>
        </section>
        
        {/* FEATURES SECTION */}
        <section className="features-section">
          <div className="section-label">
            <span>Capabilities</span>
          </div>
          <div className="section-header">
            <h2 className="section-title">Key Features</h2>
          </div>
          <HoverEffect items={features} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
