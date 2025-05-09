import React from 'react';
import { useState } from 'react';
import './Renderer.css';
import StreamToComponents from './components/StreamToComponents';

const Renderer = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [model, setModel] = useState("openai/gpt-4o-mini-search-preview");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const models = [
    { value: "openai/gpt-4o-mini-search-preview", label: "GPT-4o Mini" },
    { value: "openai/gpt-4", label: "GPT-4" },
    { value: "openai/gpt-3.5-turbo", label: "GPT-3.5 Turbo" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      await streamAIResponse(input);
    } catch (error) {
      setOutput("Error: " + error.message);
    }
    setLoading(false);
  };

  const streamAIResponse = async (input) => {
    try {
      setLoading(true);
      setOutput("Loading...");
      const response = await fetch("https://streamendpoint-ckvwnqhcka-uc.a.run.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
        },
        body: JSON.stringify({ 
          model: model,
          messages: [{role: "system", 
            content: `
            You are a helpful assistant that is to generate a ␟-delimited json object from the user's input. 
            Think of it like generating a custom website progagated with content. There should be a substantial amount of content, akin to a blog
            or personal website interspersed with images, videos, and other content.
            For example, if the user inputs "A list of the 10 largest cities in the world", you should generate a list of the 10 
            largest cities in the world, with buttons that provide suggestions for what to prompt next. If the user asks for a joke,
            give them a joke with the a button for another joke, along with some other content, perhaps a photo.
            You are to build a list of objects that the user will view. This list will be delimited by the character ␟, 
            do not use this character in your response, only for the delimiter.
            Here are the objects:
            {"type": "text", "layout": "LAYOUT_HERE", "text": TEXT_HERE}
            {"type": "flashcard", "layout": "LAYOUT_HERE", "items": [{id: 1, category: CATEGORY_HERE, content: TEXT_HERE, answer: ANSWER_HERE}]}
            {"type": "image", "layout": "LAYOUT_HERE", "url": URL_HERE}
            {"type": "link", "layout": "LAYOUT_HERE", "text": TEXT_HERE, "url": URL_HERE}
            {"type": "button", "layout": "LAYOUT_HERE", "text": CONTENT_HERE, "prompt": PROMPT_HERE}
            {"type": "card", "layout": "LAYOUT_HERE", "header": CARD_HEADER, "content": CONTENT_HEADER, "image": OPTIONAL_IMAGE_URL}
            LAYOUT_HERE can be "main", "sidebar", "header", or "footer." Use this to determine the size of the object.
            For the button, the prompt will recursively generate a view based on the prompt.
            When you generate an image, validate the url with websearch (that you have access to).
            The flashcard supports many different flashcards, add item to the array to add more flashcards.
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
      let firstChunk = true;
  
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        if (firstChunk) {
          setOutput(chunk);
          firstChunk = false;
        } else {
          setOutput(result);
        }
      }
  
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      throw error;
    }
  };
  
  return (
    <div className="app">
      <div className="messages">
        <StreamToComponents streamAIResponse={streamAIResponse} stream={output} />
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={loading}
        />
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <button
            type="submit"
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              paddingRight: "32px",
              opacity: loading ? 0.6 : 1,
              pointerEvents: loading ? "none" : "auto"
            }}
            disabled={loading}
            onClick={() => setShowDropdown(false)}
          >
            {loading ? (
              <span style={{ marginRight: 8 }}>Loading...</span>
            ) : (
              "Send"
            )}
            <span
              style={{
                marginLeft: "8px",
                cursor: "pointer",
                fontSize: "16px",
                userSelect: "none"
              }}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                setShowDropdown(v => !v);
              }}
            >
              ▼
            </span>
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  bottom: "110%",
                  right: 0,
                  background: "#222",
                  border: "1px solid #444",
                  borderRadius: "6px",
                  zIndex: 10,
                  minWidth: "140px"
                }}
                onClick={e => e.stopPropagation()}
              >
                {models.map((m) => (
                  <div
                    key={m.value}
                    style={{
                      padding: "8px 12px",
                      color: "#fff",
                      cursor: "pointer",
                      background: model === m.value ? "#333" : "transparent"
                    }}
                    onClick={() => {
                      setModel(m.value);
                      setShowDropdown(false);
                    }}
                  >
                    {m.label}
                  </div>
                ))}
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Renderer;

