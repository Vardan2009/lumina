const Credits = (params : any) => {
    return ( <div id="start">
        <div>
            <h1>Lumina</h1>
            <i>Illuminate your code</i>
            <hr />
            <br />
            <h2>Project by</h2>
            <h3>Vardan Petrosyan (Vardan2009)</h3>
            <br />
            <hr />
            <br />
            <i>Huge thanks to other contributors!</i>
            <button onClick={()=>{params.SetState("main")}}>Back</button>
        </div>
    </div> );
}
 
export default Credits;