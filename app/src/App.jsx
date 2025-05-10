import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import './App.css'

import MarkdownView from './components/MarkdownView'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const fetchStream = async () => {
      try {
        const newMessages = [...messages, {role:"user", content: input}]
        setMessages(newMessages);
        const response = await fetch("https://streamendpoint-ckvwnqhcka-uc.a.run.app/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "text/event-stream",
          },
          body: JSON.stringify({ 
            messages: newMessages,
          })
        });
  
        if (!response.body) throw new Error('ReadableStream not supported in this browser.');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
    
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            const chunk = decoder.decode(value, { stream: true })
            setMessages(prevMessages => {
              if (prevMessages.length === 0) {
                return [...prevMessages, { role: "assistant", content: "" }]
              } else {
                const previousRole = prevMessages[prevMessages.length - 1].role
                const previousContent = prevMessages[prevMessages.length - 1].content

                if (previousRole === "user") {
                  return [...prevMessages, { role: "assistant", content: chunk }]
                } else {
                  const updatedItems = [...prevMessages];
                  updatedItems[updatedItems.length - 1] = { 
                    ...updatedItems[updatedItems.length - 1], 
                    content: previousContent + chunk 
                  };
                  return updatedItems;
                }
              }
            })
          }
        }
      } catch (error) {
        console.error('Error fetching stream:', error);
      }
    };

    fetchStream();
    setInput("");
  };

  return (
    <div className="app-container" style={{ background: 'none' }}>
      <Header />
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>BetterGPT</h2>
        </div>
        <button className="new-chat-button">
          New Chat
        </button>
      </div>
      <div className="main-content">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="message-avatar">
                  {message.role === 'user' ? '👤' : '🤖'}
                </div>
                <div className="message-content">
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder=""
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              Send
            </button>
          </form>
        </div>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default App
