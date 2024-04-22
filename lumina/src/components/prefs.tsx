import WordmarkImage from '../artwork/wordmark.png'
import { faLeftLong,faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

interface config
{
    starttext:string[]
}

const Prefs = (params : any) => {
    const [config,SetConfig] = useState<config>()

    useEffect(()=>{
        params.functions.readConfig(SetConfig)
    },[params.functions])

    useEffect(()=>{
        const startTextArea = document.getElementById("starttextsarea");
        if(startTextArea)
            startTextArea.textContent! = config?.starttext.join("\n")!
    },[config])

    const handleStartTextAreaChange = () => {
        const startTextArea = document.getElementById("starttextsarea") as HTMLTextAreaElement | null;
        if (startTextArea) {
            startTextArea.textContent = startTextArea.textContent?.replace(/^\n+/, '')!;
            startTextArea.textContent = startTextArea.textContent?.replace(/\n+$/, '\n')!;
        }
    }
    

    return ( <div id="start" className='fadeincontainer'>
        <div>
            <FontAwesomeIcon className='bigLogoBg' icon={faGears} />
            <h1>Preferences</h1>
            <i>Also changeable in <code>lumina_config.json</code></i>
            <hr />
            <h2>Customization</h2>
            <hr />
            <h4>Start Texts:</h4>
            <i>Denote each one with a newline</i>
            <textarea onChange={handleStartTextAreaChange} id="starttextsarea" autoComplete='off' autoCapitalize='off' autoCorrect='off' spellCheck='false'></textarea>
            <button onClick={()=>{params.functions.SetState("main")}}> <FontAwesomeIcon icon={faLeftLong} /> Back</button>
        </div>
    </div> );
}
 
export default Prefs;