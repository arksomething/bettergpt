import React from "react";
import { CardStack } from "./ui/card-stack";
import { Highlight } from "./ui/Highlight";
import "./FlashcardDemo.css";

// Highlight utility component
export const Highlight = ({ children }) => {
  return (
    <span className="highlight">{children}</span>
  );
};

// Sample flashcards data
const FLASHCARDS = [
  {
    id: 1,
    title: "Neural Networks",
    category: "Machine Learning",
    content: (
      <p>
        Neural networks are computing systems inspired by the <Highlight>biological neural networks</Highlight> that constitute animal brains. The connections between nodes can <Highlight>transmit signals</Highlight> from one to another, and the signal gets processed at each connection.
      </p>
    ),
  },
  {
    id: 2,
    title: "Transformer Architecture",
    category: "Deep Learning",
    content: (
      <p>
        Transformers use <Highlight>self-attention mechanisms</Highlight> to weigh the importance of different parts of the input data. This architecture has become dominant in <Highlight>natural language processing</Highlight> and increasingly in computer vision.
      </p>
    ),
  },
  {
    id: 3,
    title: "Large Language Models",
    category: "AI Foundation",
    content: (
      <p>
        LLMs are trained on vast amounts of text data and can generate <Highlight>human-like text</Highlight>. They're capable of tasks like translation, summarization, and even code generation based on their <Highlight>statistical understanding</Highlight> of language patterns.
      </p>
    ),
  },
  {
    id: 4,
    title: "Prompt Engineering",
    category: "AI Interface",
    content: (
      <p>
        The art of crafting inputs to get desired outputs from AI models. Effective prompts can <Highlight>dramatically improve</Highlight> the quality and relevance of AI-generated content by providing proper <Highlight>context and constraints</Highlight>.
      </p>
    ),
  },
];

export function FlashcardDemo() {
  return (
    <div className="flashcard-demo-container">
      <div className="flashcard-demo-text">
        <h2 className="flashcard-demo-title">
          Transform Learning with AI
        </h2>
        <p className="flashcard-demo-description">
          ReflexAI automatically creates interactive flashcards from any text or conversation.
          Just ask a question, and watch as your content becomes an engaging learning experience.
        </p>
      </div>
      <div className="flashcard-demo-cards">
        <CardStack items={FLASHCARDS} />
      </div>
    </div>
  );
}
