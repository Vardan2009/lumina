import React from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Editor from './components/editor';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Editor />
    </div>
  );
}

export default App;