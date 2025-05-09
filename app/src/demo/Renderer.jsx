import React from 'react';
import { useState } from 'react';
import { Flashcard } from '../components/Flashcard';
import './Renderer.css';

const Renderer = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const streamAIResponse = async (input) => {
    try {
      const response = await fetch("https://streamendpoint-ckvwnqhcka-uc.a.run.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
        },
        body: JSON.stringify({ 
          messages: [{role: "system", 
            content: `
            You are a helpful assistant that is to generate a ␟-delimited json object from the user's input. 
            Think of it like generating a custom website progagated with content. There should be a substantial amount of content.
            For example, if the user inputs "A list of the 10 largest cities in the world", you should generate a list of the 10 
            largest cities in the world, with a button that has suggestions for what to prompt next. If the user asks for a joke,
            give them a joke with the a button for another joke.
            You are to build a list of objects that the user will view. This list will be delimited by the character ␟, 
            do not use this character in your response, only for the delimiter.
            Here are the objects:
            {"type": "text", "text": TEXT_HERE}
            {"type": "flashcard", "front": TEXT_HERE, "back": TEXT_HERE}
            {"type": "image", "url": URL_HERE}
            {"type": "video", "url": URL_HERE}
            {"type": "button", "text": CONTENT_HERE, "prompt": PROMPT_HERE}
            {"type": "component", "header": COMPONENT_HEADER, "content": CONTENT_HEADER}
            For the button, the prompt will recursively generate a view based on the prompt. 
            If you prompt: "tell me this joke: Why was 6 afraid of 7? Because 7 8 9" The button 
            will generate a view based on the prompt.
            RETURN ONLY THE JSON OBJECT, NOTHING ELSE. DO NOT FORMAT IT AS MARKDOWN.
            `
          }, {role: "user", content: input}]
        })
      });

      if (!response.body) throw new Error('ReadableStream not supported');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        setOutput(result);
      }
    } catch (error) {
      console.error('Error:', error);
      setOutput("Error: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await streamAIResponse(input);
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  // Example content for demo
  const demoContent = [
    {
      type: "text",
      text: "Welcome to the AI Learning Platform! This demo shows how you can create interactive learning experiences."
    },
    {
      type: "flashcard",
      front: "What is Machine Learning?",
      back: "Machine Learning is a subset of artificial intelligence that focuses on developing systems that can learn from and make decisions based on data."
    },
    {
      type: "button",
      text: "Show me more examples",
      prompt: "Generate 3 more educational flashcards about AI concepts"
    }
  ];
  
  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>AI Learning Demo</h2>
        </div>
        <div className="new-chat-button" onClick={() => {
          setInput("");
          setOutput("");
        }}>
          Clear
        </div>
      </div>
      <div className="main-content">
        <div className="chat-container">
          <div className="chat-messages">
            <div style={{
              padding: '20px',
              color: '#ECECF1',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace'
            }}>
              {demoContent.map((item, index) => {
                switch (item.type) {
                  case 'text':
                    return <p key={index}>{item.text}</p>;
                  case 'flashcard':
                    return <Flashcard key={index} front={item.front} back={item.back} />;
                  case 'button':
                    return (
                      <button 
                        key={index}
                        onClick={() => streamAIResponse(item.prompt)}
                        style={{
                          padding: '12px 24px',
                          backgroundColor: '#19C37D',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          margin: '10px 0'
                        }}
                      >
                        {item.text}
                      </button>
                    );
                  default:
                    return null;
                }
              })}
              {output && <pre style={{ marginTop: '20px' }}>{output}</pre>}
            </div>
          </div>
          <div className="chat-input-form">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid #565869',
                borderRadius: '8px',
                backgroundColor: '#40414f',
                color: '#ECECF1',
                fontSize: '14px'
              }}
            />
            <button 
              onClick={handleSubmit}
              style={{
                padding: '12px 24px',
                backgroundColor: '#19C37D',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Renderer; 