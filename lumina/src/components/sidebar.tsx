import React, { useState } from 'react'
import { faFileCirclePlus,faFolderPlus,faRotateRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db,getClassWithColor } from 'file-icons-js';
import 'file-icons-js/css/style.css';


let lastClickedPath : string = "";

const Sidebar = (params : any) => {

    const createent = (type:'folder'|'file')=>
      {
        if(lastClickedPath === "") {lastClickedPath = params.projpath};
        params.functions.createFSEntry(
          ()=>{params.functions.openFolderWithPath(params.projpath)},type,lastClickedPath
        )
      }

    return (
        <div id="sidebar">
            <button className='smallbtn' onClick={()=>{createent('file')}}> <FontAwesomeIcon icon={faFileCirclePlus} /> </button>
            <button className='smallbtn' onClick={()=>{createent('folder')}}> <FontAwesomeIcon icon={faFolderPlus} /> </button>
            <button className='smallbtn' onClick={()=>{params.functions.openFolderWithPath(params.projpath)}}> <FontAwesomeIcon icon={faRotateRight} /> </button>
            <DirectoryTree tree={params.dirtree} SetCode={params.SetCode} abspath={params.projpath} functions={params.functions} />
        </div>
    );
}

const FolderButton = (params:any) => {
  const [childsVisible,SetChildsVisible] = useState<boolean>(false);

  const toggleVisibility = ()=>{
    lastClickedPath = params.abspath;
    SetChildsVisible(!childsVisible);
  }

  return ( 
    <div className="folder" key={params.nodeName}>
    <div style={{display:"flex",justifyContent:"space-between"}}><p className={childsVisible?'listbutton folderopen':'listbutton folderclose'} onClick={toggleVisibility}>{params.nodeName} </p> <i className='rmbutton' style={{color:'red',marginRight:5}}><FontAwesomeIcon onClick={()=>{params.functions.removeDirectory(params.abspath)}} icon={faTrash} /></i></div>
    <div className="subfiles">
      {Object.entries(params.node).length > 0 ?Object.entries(params.node).map(([subNodeName, subNode]) => (
        <React.Fragment key={subNodeName}>
          {childsVisible &&
            params.renderNode(subNode, subNodeName,undefined,params.abspath)
          }
        </React.Fragment>
      )): childsVisible && <i style={{opacity:0.5}}>[Empty]</i>}
    </div>
  </div>
   );
}

const getParentFolderPath = (filePath : string) => {
  // Split the file path by "/"
  const pathParts = filePath.split('\\');
  
  // Remove the file name (last part)
  pathParts.pop();
  
  // Join the remaining parts to form the parent folder path
  const parentFolderPath = pathParts.join('\\');
  
  return parentFolderPath;
};


const FileButton = (params:any) => {
  return (<div style={{display:"flex",justifyContent:"space-between"}}><p onClick={()=>{lastClickedPath = getParentFolderPath(params.node); params.SetCode(params.node)}} className="file listbutton" key={params.nodeName}><span className={getClassWithColor(params.node)}></span>&nbsp;{params.nodeName}</p> <i className='rmbutton' style={{color:'red',marginRight:5}}><FontAwesomeIcon onClick={()=>{params.functions.removeFile(params.node)}} icon={faTrash} /></i></div>);
}



const DirectoryTree= (params : any) => {
  let tree = params.tree;


  const renderNode = (node : any, nodeName: any,SetCode:any,path:any) => {
    if (typeof node === 'object' && node !== null) {
      return (
        <FolderButton node={node} nodeName={nodeName} abspath={path+"\\"+nodeName} renderNode={renderNode} functions={params.functions} />
      );
    } else {
      return <FileButton nodeName={nodeName} node={node} SetCode={params.SetCode} functions={params.functions}/>;
    }
  };
  return (
   
    <div className="file-tree">
      <p className='listbutton folderopen' style={{color:"var(--popout-color)"}} onClick={()=>{lastClickedPath = params.abspath}}>{params.abspath.split('\\').pop()}</p>
      <div style={{marginLeft:"1ch"}} className="subfiles">
        {Object.entries(tree).length >0 ?Object.entries(tree).map(([nodeName, node]) => (
          <React.Fragment key={nodeName}>
            {renderNode(node, nodeName,params.SetCode,params.abspath)}
          </React.Fragment>
        )): <i style={{opacity:0.5}}>[Empty]</i> }
      </div>
    </div>
  );
};
 
export default Sidebar;