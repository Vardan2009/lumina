import { useEffect, useState } from "react";



const Main = (params : any) => {

    const [changelog,SetChangelog] = useState<any>()

    useEffect(()=>{
        params.functions.readChlog(SetChangelog)
    },[params.functions])

    return ( <div id="start">
        {params.electron && <div>
            <h1>Lumina Code Editor</h1>
            <i>Illuminate Your Code</i><br/>

            <button onClick={params.functions.openFolder}>Open Folder</button>
            <button onClick={()=>{params.functions.SetState("credits")}}>Credits</button>
        </div>}
        <div style={{textAlign:"right"}}>
        {
            changelog != null
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