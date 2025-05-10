import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const Notebook = ({text}) => {
  const [input, setInput] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(text);
  }, []);

  return (
    <div className="notebook-container" style={{ margin: "8px" }}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write anything here..."
        style={{
          width: '500px',
          height: '150px',
          backgroundColor: '#1e1e1e',
          color: '#f0f0f0',
          border: '1px solid #444',
          padding: '12px',
          fontSize: '15px',
          fontFamily: 'inherit',
          borderRadius: '6px',
          marginBottom: '1rem',
          resize: 'both',
          maxWidth: '90%',
          outline: 'none'
        }}
      />

      <div className="notebook-preview">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Notebook;