import React from 'react';
import MarkdownView from './MarkdownView';
import Button from './Button';
import Flashcard from './Flashcard';

const StreamToComponents = ({ streamAIResponse, stream }) => {

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
        // If it's the last chunk and it doesn't end with '}', assume it's incomplete
        if (i === chunks.length - 1 && !jsonStr.endsWith('}')) {
          // Do not push, skip it
          continue;
        }
        // If it's invalid but not clearly partial, also discard
        console.warn('Skipping invalid JSON chunk:', jsonStr);
      }
    }
  
    return result;
  }

  return (
    <div>
      {safeParseJsonStream(stream).map((item, index) => (
        <div key={index}>
          {item.type === 'text' && <MarkdownView text={item.text} />}
          {item.type === 'component' && <p>{item.content}</p>}
          {item.type === 'button' && <Button text={item.text} prompt={item.prompt} streamAIResponse={streamAIResponse} />}
          {item.type === 'flashcard' && <Flashcard front={item.front} back={item.back} />}
        </div>
      ))}
    </div>
  );
};

export default StreamToComponents;


