import React, { useState } from "react";
import { CardStack } from "./ui/card-stack";
import { TextHighlight } from "./ui/TextHighlight";
import "./FlashcardDemo.css";

const INITIAL_FLASHCARDS = [
  {
    id: 1,
    title: "Neural Networks",
    category: "Machine Learning",
    content: (
      <p>
        Neural networks are computing systems inspired by the <TextHighlight>biological neural networks</TextHighlight> that constitute animal brains. The connections between nodes can <TextHighlight>transmit signals</TextHighlight> from one to another, and the signal gets processed at each connection.
      </p>
    ),
  },
  {
    id: 2,
    title: "Transformer Architecture",
    category: "Deep Learning",
    content: (
      <p>
        Transformers use <TextHighlight>self-attention mechanisms</TextHighlight> to weigh the importance of different parts of the input data. This architecture has become dominant in <TextHighlight>natural language processing</TextHighlight> and increasingly in computer vision.
      </p>
    ),
  },
  {
    id: 3,
    title: "Large Language Models",
    category: "AI Foundation",
    content: (
      <p>
        LLMs are trained on vast amounts of text data and can generate <TextHighlight>human-like text</TextHighlight>. They're capable of tasks like translation, summarization, and even code generation based on their <TextHighlight>statistical understanding</TextHighlight> of language patterns.
      </p>
    ),
  },
  {
    id: 4,
    title: "Prompt Engineering",
    category: "AI Interface",
    content: (
      <p>
        The art of crafting inputs to get desired outputs from AI models. Effective prompts can <TextHighlight>dramatically improve</TextHighlight> the quality and relevance of AI-generated content by providing proper <TextHighlight>context and constraints</TextHighlight>.
      </p>
    ),
  },
];

export function FlashcardDemo() {
  const [flashcards, setFlashcards] = useState(INITIAL_FLASHCARDS);

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
        <CardStack items={flashcards} cardWidth ={400} cardHeight={250} />
      </div>
    </div>
  );
}
