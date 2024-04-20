import { useState,useEffect } from 'react';
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

function MainPage(electron:any,functions:any): JSX.Element
{
  return <Main electron={electron} functions={functions}/>
}

function CreditsPage(electron:any,functions:any): JSX.Element
{
  return <Credits electron={electron} functions={functions}/>
}

function EditorPage(electron:any,functions:any): JSX.Element
{
  return <>
          <Sidebar  electron={electron} functions={functions} />
          <Editor electron={electron} functions={functions}/>
        </>
}

interface changelog
{
    version:string;
    changelog:string[];
}

function App() {
  const [State,SetState] = useState<string>("main");
  const [electron,SetElectronInstance] = useState<any>();
    
  useEffect(()=>{
        SetElectronInstance((window as any).electron);
  },[])



  const readChlog = (setChangelog : any) => {
        if(!electron) return;
        electron.readChangelog((err : string, data : changelog) => {
            if (err) {
                console.error('Error reading changelog:', err);
            } else {
                setChangelog(data);
            }
        });
  };

  const openFolder = async()=>{
        let s = await electron.openFolderDialog();
        
        //SetState("editor")
  }

  const functions = {
    openFolder:openFolder,
    readChlog:readChlog,
    SetState:SetState
  }

  return (
    <div className="App">
      {Pages[State](electron,functions)}
    </div>
  );
}

export default App;