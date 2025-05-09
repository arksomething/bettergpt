import React from 'react';
import MarkdownView from './MarkdownView';
import Button from './Button';
import Flashcard from './Flashcard';
import Card from './Card';
import Image from './Image';
import Calculator from './Calculator';
import './StreamToComponents.css';

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
  const items = safeParseJsonStream(stream);
  const headerItems = items.filter(item => item.layout === 'header');
  const sidebarItems = items.filter(item => item.layout === 'sidebar');
  const mainItems = items.filter(item => item.layout === 'main' || !item.layout);
  const footerItems = items.filter(item => item.layout === 'footer');

  const renderItem = (item, index) => {
    switch (item.type) {
      case 'text':
        return <MarkdownView key={index} text={item.text} />;
      case 'component':
        return <p key={index}>{item.content}</p>;
      case 'button':
        return <Button key={index} text={item.text} prompt={item.prompt} streamAIResponse={streamAIResponse} />;
      case 'flashcard':
        return <Flashcard key={index} front={item.front} back={item.back} />;
      case 'card':
        return <Card key={index} header={item.header} content={item.content} image={item.image} />;
      case 'image':
        return <Image key={index} src={item.url} alt={item.alt} />;
      default:
        return null;
    }
  };

  return (
    <div className="stream-container">
      {/* <Calculator /> */}
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


