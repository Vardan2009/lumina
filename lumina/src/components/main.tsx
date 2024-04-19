const Main = (params : any) => {
    return ( <div id="start">
        <div>
            <h1>Lumina Code Editor</h1>
            <i>Illuminate Your Code</i><br/>

            <button onClick={()=>{params.SetState("editor")}}>Open Folder</button>
            <button onClick={()=>{params.SetState("credits")}}>Credits</button>
        </div>
        <div style={{textAlign:"right"}}>
            <h1>What's new</h1>
            <i>nothing, for now</i>
        </div>
    </div> );
}
 
export default Main;