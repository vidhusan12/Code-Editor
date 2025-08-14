import React from 'react'
import { useState } from 'react'
import './App.css'

const highlightSyntax = (code) => {
  let highlighted = code;

  highlighted = highlighted.replace(/"[^"]*"/g, '<span style="color: #ce9178">$&</span>')
  highlighted = highlighted.replace(/'[^']*'/g, '<span style="color: #ce9178">$&</span>')
  highlighted = highlighted.replace(/\b(function|const|let|if|else|return|for|while)\b/g, '<span style="color: #569cd6">$&</span>')


  return highlighted;
}

const App = () => {
  const [fileContents, setFileContents] = useState({
    './index.js': '',
    './app.js': ''
  });
  const [activeTab, setActiveTab] = useState('./index.js')
  return (
    <div className="editor-container">
      <div className="tab-bar">
        <div className={activeTab === './index.js' ? 'tab active' : 'tab'} onClick={() => setActiveTab('./index.js')}>
          index.js
        </div>
        <div className={activeTab === './app.js' ? 'tab active' : 'tab'} onClick={() => setActiveTab('./app.js')}>
          app.js
        </div>
      </div>
      <div className="editor-main">
        <div
          className='code-preview'
          dangerouslySetInnerHTML={{ __html: highlightSyntax(fileContents[activeTab]) }}
        />
        <textarea
          value={fileContents[activeTab]}
          onChange={(e) => setFileContents({
            ...fileContents, [activeTab]: e.target.value
          })}
          placeholder='Start typing your code here'
          className='code-input'
        />
      </div>
      <div className="output-panel">Output</div>
    </div>
  )
}

export default App