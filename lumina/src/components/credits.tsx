import WordmarkImage from '../artwork/wordmark.png'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import bg from '../artwork/bg.png'

interface changelog
{
    version:string,
    changelog:string[]
}

const Credits = (params : any) => {
    const [changelog,SetChangelog] = useState<changelog>()

    useEffect(()=>{
        params.functions.readChlog(SetChangelog)
    },[params.functions])

    return ( <div id="start" className='fadeincontainer'>
        <div>
            <img className='bigImgBg' src={bg} style={{width:"100%"}} draggable={false} />
            <img src={WordmarkImage} style={{width:"100%"}} draggable={false} />
            <i style={{display:"block",textAlign:"right"}}>ver {changelog?.version}</i>
            <h2>Project by</h2>
            <h5 style={{margin:"20px 0px"}}>Vardan Petrosyan (Vardan2009)</h5>
            <i>Written in Electron, Node and React with JavaScript and TypeScript</i>
            <button onClick={()=>{params.functions.SetState("main")}}> <FontAwesomeIcon icon={faLeftLong} /> Back</button>
        </div>
    </div> );
}
 
export default Credits;