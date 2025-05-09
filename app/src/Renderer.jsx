import React from 'react';
import { useState } from 'react';
import './Renderer.css';
import StreamToComponents from './components/StreamToComponents';

const Renderer = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await streamAIResponse(input);
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  const streamAIResponse = async (input) => {
    try {
      const response = await fetch("https://streamendpoint-ckvwnqhcka-uc.a.run.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
        },
        body: JSON.stringify({ 
          model: "openai/gpt-4o-mini",
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
            {"type": "text", "layout": "LAYOUT_HERE", "text": TEXT_HERE}
            {"type": "flashcard", "layout": "LAYOUT_HERE", "front": TEXT_HERE, "back": TEXT_HERE}
            {"type": "image", "layout": "LAYOUT_HERE", "url": URL_HERE}
            {"type": "video", "layout": "LAYOUT_HERE", "url": URL_HERE}
            {"type": "button", "layout": "LAYOUT_HERE", "text": CONTENT_HERE, "prompt": PROMPT_HERE}
            {"type": "card", "layout": "LAYOUT_HERE", "header": CARD_HEADER, "content": CONTENT_HEADER, "image": OPTIONAL_IMAGE_URL}
            LAYOUT_HERE can be "main", "sidebar", "header", or "footer." Use this to determine the size of the object.
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
  
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  return (
    <div className="app">
      <div className="messages">
        {/* {output} */}
        <StreamToComponents streamAIResponse={streamAIResponse} stream={output} />
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
  );
};

export default Renderer;

