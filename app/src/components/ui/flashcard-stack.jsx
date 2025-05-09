"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FlashcardStack({ cards, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    if (currentIndex === cards.length - 1) {
      setCompleted(true);
      return;
    }
    setDirection(1);
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1));
    }, 300);
  };

  const handlePrevious = () => {
    if (currentIndex === 0) return;
    setDirection(-1);
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }, 300);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleRestart = () => {
    setCompleted(false);
    setCurrentIndex(0);
    setFlipped(false);
    setDirection(0);
  };

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full space-y-6">
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-bold text-white">Flashcards Completed!</h3>
          <p className="text-gray-400">You've gone through all the flashcards.</p>
        </div>
        <button 
          onClick={handleRestart}
          className="px-4 py-2 bg-white text-black font-medium rounded-xl hover:bg-gray-200 transition-colors"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto relative">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-2 py-4">
        <div className="text-sm text-white/70">
          {currentIndex + 1} / {cards.length}
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full ${currentIndex === 0 ? 'text-white/30' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
          >
            ← Previous
          </button>
          <button 
            onClick={handleNext}
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10"
          >
            Next →
          </button>
        </div>
      </div>

      <div 
        className="h-96 w-full perspective-1000 my-12"
        onClick={handleFlip}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (flipped ? '-flipped' : '')}
            initial={{ 
              rotateY: direction !== 0 ? (direction > 0 ? -90 : 90) : (flipped ? 180 : 0),
              x: direction !== 0 ? (direction > 0 ? 100 : -100) : 0,
              opacity: direction !== 0 ? 0 : 1
            }}
            animate={{ 
              rotateY: flipped ? 180 : 0,
              x: 0,
              opacity: 1
            }}
            exit={{ 
              rotateY: direction !== 0 ? (direction > 0 ? 90 : -90) : (flipped ? 180 : 0),
              x: direction !== 0 ? (direction > 0 ? -100 : 100) : 0,
              opacity: direction !== 0 ? 0 : 1
            }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            className="h-full w-full relative preserve-3d cursor-pointer"
          >
            <div className={`flashcard-side front absolute inset-0 backface-hidden border border-white/10 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-900 p-6 flex flex-col items-center justify-center text-center ${flipped ? 'opacity-0' : 'opacity-100'}`}>
              <div className="rounded-lg py-1 px-3 mb-3 inline-block bg-indigo-500/20 text-indigo-300 text-sm font-medium">
                {currentCard.category}
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {currentCard.question}
              </h2>
              <p className="text-gray-400 text-sm mt-auto">
                Tap to reveal answer
              </p>
            </div>

            <div className={`flashcard-side back absolute inset-0 backface-hidden rotateY-180 border border-white/10 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 flex flex-col items-center justify-center text-center ${flipped ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-lg text-white leading-relaxed">
                {currentCard.answer}
              </div>
              <p className="text-gray-400 text-sm mt-auto">
                Tap to see question
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-2 flex justify-center">
        <p className="text-white/50 text-sm">
          {flipped ? "Showing answer" : "Showing question"}
        </p>
      </div>
    </div>
  );
}
