import React from 'react';
import Markdown from 'react-markdown'
const MarkdownView = ({ text }) => {
  return (
    <div className="markdown-view">
      <Markdown>{text}</Markdown>
    </div>
  );
};

export default MarkdownView;

