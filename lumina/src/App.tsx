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

let dirtreew : object = []
let projpath : string;

function MainPage(electron:any,functions:any): JSX.Element
{
  return <Main electron={electron} functions={functions}/>
}

function CreditsPage(electron:any,functions:any): JSX.Element
{
  return <Credits electron={electron} functions={functions}/>
}

function EditorPage(electron:any,functions:any,SetCurrentPath:any,SetCurrentCode:any,): JSX.Element
{ 
  return <Editor electron={electron} functions={functions} dirtree={dirtreew} projpath={projpath} SetCurrentPath={SetCurrentPath} SetCurrentCode={SetCurrentCode} />
}

interface changelog
{
    version:string;
    changelog:string[];
}

function App() {
  const [State,SetState] = useState<string>("main");
  const [electron,SetElectronInstance] = useState<any>();
  const [dirtree,SetDirtree] = useState({});
  const [currentPath,SetCurrentPath] = useState<string>("");
  const [currentCode,SetCurrentCode] = useState<string>("");

  useEffect(()=>{
    if(!electron) return;
    electron.setCurrentCode(currentCode);
    electron.setCurrentPath(currentPath);
  },[currentCode,currentPath])

  let set : boolean = false;  


  

  const openFolder = async ()=>{
    let s = await electron.openFolderDialog();
    if(s.canceled) return;
    openFolderWithPath(s.filePaths[0]);
    SetState("editor");
}

  const openFolderWithPath = async(p : string)=>{
    let dirListing = await electron.readFolderListing(p)
    if(!dirListing) return;
    projpath=p;
    dirtreew = dirListing;
    SetDirtree(dirListing);
  };

  useEffect(()=>{
        SetElectronInstance((window as any).electron);
  },[]);




  useEffect(()=>{
    if(!electron) return;
    if(set) return;
    set = true;
    electron.onOpenFolder(openFolder)
    
    electron.onExitEditor(()=>{
      SetDirtree({})
      projpath=""
      dirtreew = {};
      SetCurrentPath("");
      SetCurrentCode("");
      SetState("main")
    })
  },[electron])

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

  const readFile = (setTxt : any,path:string) => {
    if(!electron) return;
    electron.readFile((err : string, data : string) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
          setTxt(data);
        }
    },path);
};

  const createFSEntry = (reloadfunc:any,type: 'folder'|'file', path : string) =>
  {
    if(!electron) return;
    electron.createFSEntry(reloadfunc,type,path);
  }

 

  const functions = {
    openFolder:openFolder,
    openFolderWithPath:openFolderWithPath,
    readChlog:readChlog,
    SetState:SetState,
    readFile:readFile,
    createFSEntry:createFSEntry
  }

  return (
    <div className="App" >
      {Pages[State](electron,functions,SetCurrentPath,SetCurrentCode)}
    </div>
  );
}

export default App;