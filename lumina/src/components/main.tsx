import { useEffect, useState } from "react";
import WordmarkImage from '../artwork/wordmark.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFolderOpen, faGears, faInfoCircle} from '@fortawesome/free-solid-svg-icons'

const Main = (params : any) => {

    const [changelog,SetChangelog] = useState<any>()

    useEffect(()=>{
        params.functions.readChlog(SetChangelog)
    },[params.functions])

    return (
        <div id="start">
       
        {params.electron && <div style={{textAlign:"left"}}>
            <img src={WordmarkImage} style={{width:"100%"}} draggable={false} />

            <button onClick={params.functions.openFolder}> <FontAwesomeIcon icon={faFolderOpen} /> Open Folder</button>
            <button onClick={()=>{}}><FontAwesomeIcon icon={faGears} /> Preferences</button>
            <button onClick={()=>{params.functions.SetState("credits")}}><FontAwesomeIcon icon={faInfoCircle} /> About Lumina...</button>
        </div>}
        <div style={{textAlign:"right"}}>
        { 
            changelog != null
            ?
            <>
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