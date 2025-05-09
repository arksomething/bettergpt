import React from 'react';
import Markdown from 'react-markdown'
import './MarkdownView.css';

const MarkdownView = ({ text }) => {
  return (
    <div className="markdown-view">
      <Markdown>{text}</Markdown>
    </div>
  );
};

export default MarkdownView;

