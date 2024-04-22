import WordmarkImage from '../artwork/wordmark.png'
import { faLeftLong,faGears,faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

interface config
{
    starttext:string[]
}

const Prefs = (params : any) => {
    const [config,SetConfig] = useState<config>()
    const [saved,SetSaved] = useState<boolean>(true);

    const limitLineLength = (text : string, maxLength : number) => {
        const lines = text.split('\n'); 
        const truncatedLines = lines.map(line => {
            if (line.length > maxLength) {
                return line.substring(0, maxLength); 
            }
            return line;
        });
        return truncatedLines.join('\n');
    }

    useEffect(()=>{
        params.functions.readConfig(SetConfig)
    },[params.functions])

    useEffect(()=>{
        const startTextArea = document.getElementById("starttextsarea") as HTMLTextAreaElement | null;
        if(startTextArea)
            startTextArea.value! = config?.starttext.join("\n")!
    },[config])

    const handleStartTextAreaChange = (event : any) => {
        SetSaved(false)
        const startTextArea = document.getElementById("starttextsarea") as HTMLTextAreaElement | null;
        if (startTextArea) {
            startTextArea.value = startTextArea.value?.replace(/^\n+/, '')!;
            startTextArea.value = startTextArea.value?.replace(/\n+$/, '\n')!;
            startTextArea.value = limitLineLength(startTextArea.value,35)
            SetConfig({ ...config, starttext: startTextArea.value.split('\n') });
        }
    }

    const saveConfig = () => {
        params.electron.saveFile("./lumina_config.json",JSON.stringify({ ...config, starttext: config?.starttext.filter(s => s.trim().length > 0) }))
        SetSaved(true)
    }
    

    return ( <div id="start" className='fadeincontainer'>
        <div style={{overflowY:"scroll",height:"50px"}}>
            <FontAwesomeIcon className='bigLogoBg' icon={faGears} />
            <h1>Preferences</h1>
            <i>Also changeable in <code>lumina_config.json</code></i>
            <hr />
            <h2>Customization</h2>
            <hr />
            <h4>Start Texts:</h4>
            <i>Denote each one with a newline</i>
            <textarea onChange={handleStartTextAreaChange} id="starttextsarea" autoComplete='off' autoCapitalize='off' autoCorrect='off' spellCheck='false'></textarea>
            
        </div>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"stretch",width:300}}>
            <button onClick={saveConfig}> <FontAwesomeIcon icon={faCheck} /> Apply</button>
            <button onClick={()=>{params.functions.SetState("main")}}> <FontAwesomeIcon icon={faLeftLong} /> Back {!saved && <><br/><i style={{color:"orange"}}>Unsaved Changes</i></>}</button>
        </div>
    </div> );
}
 
export default Prefs;