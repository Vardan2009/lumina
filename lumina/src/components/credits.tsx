import WordmarkImage from '../artwork/wordmark.png'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Credits = (params : any) => {
    return ( <div id="start">
        <div>
            <img src={WordmarkImage} style={{width:"100%"}} draggable={false} />
            <hr />
            <br />
            <h2>Project by</h2>
            <h5>Vardan Petrosyan (Vardan2009)</h5>
            <br />
            <hr />
            <br />
            <i>Huge thanks to other contributors!</i>
            <button onClick={()=>{params.functions.SetState("main")}}> <FontAwesomeIcon icon={faLeftLong} /> Back</button>
        </div>
    </div> );
}
 
export default Credits;