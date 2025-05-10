// import '../style.css';
// import '../styles/editor.css';

import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import './Code.css';
const Code = ({text}) => {
  const [code, setCode] = useState(text);

  useEffect(() => {
    setCode(text);
  }, [text]);

  return (
    <div className="editor-container">
      <CodeMirror
        value={code}
        height="200px"
        theme="dark"
        extensions={[javascript()]}
        onChange={(value) => setCode(value)}
        className="code-editor"
      />
    </div>
  );
};

export default Code;