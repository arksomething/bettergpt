import React from 'react';
import { useState } from 'react';
import './Renderer.css';
import StreamToComponents from './components/StreamToComponents';
import Header from './components/Header';

const Renderer = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [model, setModel] = useState("openai/gpt-4o-mini-search-preview");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const models = [
    { value: "openai/gpt-4o-mini-search-preview", label: "GPT-4o Search" },
    { value: "anthropic/claude-3-haiku", label: "Claude 3 Haiku" },
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
      const newOutput = [...output, {role:"user", content: input}]
      setOutput(newOutput);
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
            {"type": "link", "layout": "LAYOUT_HERE", "text": TEXT_HERE, "url": URL_HERE}
            {"type": "button", "layout": "LAYOUT_HERE", "text": CONTENT_HERE, "prompt": PROMPT_HERE}
            {"type": "card", "layout": "LAYOUT_HERE", "header": CARD_HEADER, "content": CONTENT_HEADER, "image": OPTIONAL_IMAGE_URL}
            {"type": "calulator", "layout": "LAYOUT_HERE"}
            {"type": "code", "layout": "LAYOUT_HERE", "text": TEXT_HERE}
            {"type": "notebook", "layout": "LAYOUT_HERE", "text": TEXT_HERE}
            LAYOUT_HERE can be "main", "sidebar", "header", or "footer." Use this to determine the size of the object.
            For the button, the prompt will recursively generate a view based on the prompt.
            When you generate an image, validate the url with websearch (that you have access to).
            The flashcard supports many different flashcards, add item to the array to add more flashcards. If the user asks you to generate flashcards,
            use the flashcard provided.
            When you are prompted to generate a notebook, use the notebook provided.
            When you are prompted to generate code, use the code component provided.
            If you prompt: "tell me this joke: Why was 6 afraid of 7? Because 7 8 9" The button 
            will generate a view based on the prompt.
            When writing an essay or anything similar, put it insdie the notebook provided.
            When generating code, always include the code editor provided ("type": "code", "layout": "LAYOUT_HERE", "text": TEXT_HERE). USE THIS!!!!
            I DON'T WANT TO TELL YOU A MILLION TIMES TO USE THE CODE EDITOR WHEN NEEDED.
            Try to always include one or two buttons that link to relevant follow-up prompts
            RETURN ONLY THE JSON OBJECT, NOTHING ELSE. DO NOT FORMAT IT AS MARKDOWN. DO NOT GENERATE TOO MANY JSON OBJECTS. AIM FOR MORE THAN 5 BUT LESS THAN 15.
            `
          }, ...newOutput]
        })
      });
  
      if (!response.body) throw new Error('ReadableStream not supported');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let firstChunk = true;
  
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
  
        setOutput(prevMessages => {
          if (prevMessages.length === 0) {
            // No messages yet, add the first assistant message
            return [...prevMessages, { role: "assistant", content: chunk }];
          } else {
            const previousRole = prevMessages[prevMessages.length - 1].role;
            const previousContent = prevMessages[prevMessages.length - 1].content;
  
            if (previousRole === "user") {
              // Last message was from user, add a new assistant message
              return [...prevMessages, { role: "assistant", content: chunk }];
            } else {
              // Last message was from assistant, append to its content
              const updatedItems = [...prevMessages];
              updatedItems[updatedItems.length - 1] = {
                ...updatedItems[updatedItems.length - 1],
                content: previousContent + chunk
              };
              return updatedItems;
            }
          }
        });
      }
  
      setLoading(false);
      return output;
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      throw error;
    }
  };
  
  return (
    <div className="app" style={{ background: '#18181a', minHeight: '100vh' }}>
      <Header />
      <div className="messages" style={{ paddingTop: "90px" }}>
        <StreamToComponents
          streamAIResponse={streamAIResponse} 
          stream={
            Array.isArray(output) && output.length > 0
              ? (output.filter(m => m.role === "assistant").at(-1)?.content || "")
              : ""
          }
        />
        {/* {JSON.stringify(output)} */}
        {/* {JSON.stringify(output.filter(m => m.role === "assistant"))} */}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={loading}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
          <button
            type="submit"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 24px",
              backgroundColor: "#19C37D",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
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
          </button>
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
              backgroundColor: "#19C37D",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
            onClick={e => {
              e.preventDefault();
              setShowDropdown(v => !v);
            }}
            aria-label="Change model"
          >
            ▼
          </button>
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
        </div>
      </form>
    </div>
  );
};

export default Renderer;

