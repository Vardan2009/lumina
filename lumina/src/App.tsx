import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Editor from './components/editor';
import Main from './components/main';
import Credits from './components/credits';


const Pages: { [id: string]: Function } = {
  "main": MainPage,
  "credits": CreditsPage,
  "editor": EditorPage
};

function MainPage(SetState:Function): JSX.Element
{
  return <Main SetState={SetState}/>
}

function CreditsPage(SetState:Function): JSX.Element
{
  return <Credits SetState={SetState}/>
}

function EditorPage(SetState:Function): JSX.Element
{
  return <>
          <Sidebar />
          <Editor />
        </>
}

function App() {
  const [State,SetState] = useState<string>("main");
  return (
    <div className="App">
      {Pages[State](SetState)}
    </div>
  );
}

export default App;