import React from 'react';
import MarkdownView from './MarkdownView';
import Button from './Button';
import Flashcard from './Flashcard';
import Card from './Card';
import Image from './Image';
import Calculator from './Calculator';
import Code from './Code';
import Notebook from './Notebook';
import './StreamToComponents.css';
import { CardStack } from './ui/card-stack';

function safeParseJsonStream(input, delimiter = '␟') {
  const chunks = input.split(delimiter);
  const result = [];
  for (let i = 0; i < chunks.length; i++) {
    const jsonStr = chunks[i].trim();
    if (!jsonStr) continue;
    try {
      const obj = JSON.parse(jsonStr);
      result.push(obj);
    } catch (e) {
      if (i === chunks.length - 1 && !jsonStr.endsWith('}')) {
        continue;
      }
      console.warn('Skipping invalid JSON chunk:', jsonStr);
    }
  }
  return result;
}

const StreamToComponents = ({ streamAIResponse, stream }) => {

  const isLoading = stream === "Loading...";
  let items = [];
  let isValidJson = true;

  try {
    items = safeParseJsonStream(stream);
    if (!Array.isArray(items) || items.length === 0) {
      isValidJson = false;
    }
  } catch {
    isValidJson = false;
  }

  const headerItems = items.filter(item => item.layout === 'header');
  const sidebarItems = items.filter(item => item.layout === 'sidebar');
  const mainItems = items.filter(item => item.layout === 'main' || !item.layout);
  const footerItems = items.filter(item => item.layout === 'footer');

  const renderItem = (item, index) => {
    switch (item.type) {
      case 'text':
        return <MarkdownView key={index} text={item.text} />;
      case 'button':
        return <Button key={index} text={item.text} prompt={item.prompt} streamAIResponse={streamAIResponse} />;
      case 'flashcard':
        return <CardStack key={index} items={item.items} />;
      case 'card':
        return <Card key={index} header={item.header} content={item.content} image={item.image} />;
      case 'notebook':
        return <Notebook key={index} text={item.text} />;
      case 'code':
        return <Code key={index} text={item.text} />;
      default:
        return null;
    }
  };
  if (!stream) {
    return (
      <div className="stream-container" style={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{ fontSize: "1.2em", color: "#aaa" }}>Ask me anything...</div>
        </div>
      </div>
    );
  }

  if (isLoading || !isValidJson) {
    return (
      <div className="stream-container" style={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{ fontSize: "1.2em", color: "#aaa" }}>Generating content...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="stream-container">
      {headerItems.length > 0 && (
        <div className="header">
          {headerItems.map((item, index) => renderItem(item, index))}
        </div>
      )}
      <div className="content-row">
        {sidebarItems.length > 0 && (
          <div className="sidebar">
            {sidebarItems.map((item, index) => renderItem(item, index))}
          </div>
        )}
        <div className="main-content">
          {mainItems.map((item, index) => renderItem(item, index))}
        </div>
      </div>
      {footerItems.length > 0 && (
        <div className="footer">
          {footerItems.map((item, index) => renderItem(item, index))}
        </div>
      )}
    </div>
  );
};

export default StreamToComponents;


