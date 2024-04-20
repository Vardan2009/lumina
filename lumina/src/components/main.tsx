import { useEffect, useState } from "react";

interface changelog
{
    version:string;
    changelog:string[];
}

const Main = (params : any) => {
    const [electron,SetElectronInstance] = useState<any>();
    
    useEffect(()=>{
        SetElectronInstance((window as any).electron);
    },[])
    
    useEffect(()=>{
        setTimeout(() => {
            readChlog();
        }, 200);
    },[electron])

    const [changelog,setChangelog] = useState<changelog>();


    const readChlog = () => {
        if(!electron) return;
        electron.readChangelog((err : string, data : changelog) => {
            if (err) {
                console.error('Error reading changelog:', err);
            } else {
                setChangelog(data);
            }
        });
    };

    
    return ( <div id="start">
        {electron && <div>
            <h1>Lumina Code Editor</h1>
            <i>Illuminate Your Code</i><br/>

            <button onClick={electron.openFolder}>Open Folder</button>
            <button onClick={()=>{params.SetState("credits")}}>Credits</button>
        </div>}
        <div style={{textAlign:"right"}}>
        {
            changelog
            ?
            <>
              <h1>What's new in Lumina<i style={{color:"white"}}> v{changelog.version}</i></h1><br/>
            {
                changelog.changelog.map((change : string,idx : number)=>
                <i key={idx} style={{display:"block"}}><span style={{color:"white"}}>{idx+1}.</span> {change}</i>
                )
            }            
            </>
            :
            <i>Fetching info</i>
        }
      
        </div>
    </div> );
}
 
export default Main;