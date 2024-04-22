import { useEffect, useState } from "react";
import WordmarkImage from '../artwork/wordmark.png'
import bg from '../artwork/bg.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFolderOpen, faGears, faInfoCircle} from '@fortawesome/free-solid-svg-icons'

interface changelog
{
    version:string
    changelog:string[]
}

interface config
{
    starttext:string[]
}

const Main = (params : any) => {

    const [changelog,SetChangelog] = useState<changelog>()
    const [config,SetConfig] = useState<config>()

    useEffect(()=>{
        params.functions.readChlog(SetChangelog)
        params.functions.readConfig(SetConfig)
    },[params.functions])

    return (
        <div id="start" className="fadeincontainer">
       
        {params.electron && <div style={{textAlign:"left",display:"flex",flexWrap:"wrap",alignItems:"center"}}>
            <img className="mainWordmark" src={WordmarkImage} style={{width:"100%"}} draggable={false} />
            <i>{config?.starttext[Math.floor(Math.random()*config.starttext.length)]}</i>
            <button className="menubutton" onClick={params.functions.openFolder}> <FontAwesomeIcon icon={faFolderOpen} /> Open Folder</button>
            <button className="menubutton" onClick={()=>{params.functions.SetState("prefs")}}><FontAwesomeIcon icon={faGears} /> Preferences</button>
            <button className="menubutton" onClick={()=>{params.functions.SetState("credits")}}><FontAwesomeIcon icon={faInfoCircle} /> About Lumina...</button>
        </div>}
        <div style={{textAlign:"right"}}>
        { 
            changelog != null
            ?
            <>
             <img src={bg} style={{width:"100%"}} draggable={false} />
              <h1>What's new in Lumina<i style={{color:"white"}}> {changelog.version}</i></h1><br/>
              <ul>
                {
                    changelog.changelog.map((change : string,idx : number)=>
                        <li key={idx} style={{display:"block"}}><span style={{color:"white"}}>-</span> {change}</li>
                    )
                }     
            </ul>       
            </>
            :
            <i>Fetching info</i>
        }
    
        </div>
    </div>);
}
 
export default Main;