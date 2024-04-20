import React, { useState } from 'react'
const Sidebar = (params : any) => {
    return (
        <div id="sidebar">
            <h1 style={{fontFamily:"Montserrat"}}>Lumina</h1><br/>
            <DirectoryTree tree={params.dirtree} SetCode={params.SetCode} />
        </div>
    );
}

const FolderButton = (params:any) => {
  const [childsVisible,SetChildsVisible] = useState<boolean>(false);

  const toggleVisibility = ()=>{
    SetChildsVisible(!childsVisible);
  }

  return ( 
    <div className="folder" key={params.nodeName}>
    <p className={childsVisible?'listbutton folderopen':'listbutton folderclose'} onClick={toggleVisibility}>{params.nodeName}</p>
    <div className="subfiles">
      {Object.entries(params.node).map(([subNodeName, subNode]) => (
        <React.Fragment key={subNodeName}>
          {childsVisible &&
            params.renderNode(subNode, subNodeName)
          }
        </React.Fragment>
      ))}
    </div>
  </div>
   );
}

const FileButton = (params:any) => {
  return (<p onClick={()=>{params.SetCode(params.node)}} className="file listbutton" key={params.nodeName}>{params.nodeName}</p>);
}



const DirectoryTree= (params : any) => {
  let tree = params.tree;


  const renderNode = (node : any, nodeName: any,SetCode:any) => {
    if (typeof node === 'object' && node !== null) {
      return (
        <FolderButton node={node} nodeName={nodeName} renderNode={renderNode} />
      );
    } else {
      return <FileButton nodeName={nodeName} node={node} SetCode={params.SetCode}/>;
    }
  };
  console.log(tree)
  return (
   
    <div className="file-tree">
      {Object.entries(tree).map(([nodeName, node]) => (
        <React.Fragment key={nodeName}>
          {renderNode(node, nodeName,params.SetCode)}
        </React.Fragment>
      ))}
    </div>
  );
};
 
export default Sidebar;