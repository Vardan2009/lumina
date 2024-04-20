import React, { useState } from 'react'

const Sidebar = (params : any) => {
    return (
        <div id="sidebar">
            <h1 style={{fontFamily:"Montserrat"}}>Lumina</h1><br/>
            <DirectoryTree tree={params.dirtree} />
        </div>
    );
}

const FolderButton = (params:any) => {
  const [childsVisible,SetChildsVisible] = useState<boolean>(false);

  const toggleVisibility = ()=>{
    SetChildsVisible(!childsVisible);
  }

  return ( 
    <div className="folder listbutton" key={params.nodeName}>
    <p  onClick={toggleVisibility}>{params.nodeName}</p>
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
 


const DirectoryTree= (params : any) => {
  let tree = params.tree;


  const renderNode = (node : any, nodeName: any) => {
    if (typeof node === 'object' && node !== null) {
      return (
        <FolderButton node={node} nodeName={nodeName} renderNode={renderNode} />
      );
    } else {
      return <p className="file" key={nodeName}>{nodeName}</p>;
    }
  };
  console.log(tree)
  return (
   
    <div className="file-tree">
      {Object.entries(tree).map(([nodeName, node]) => (
        <React.Fragment key={nodeName}>
          {renderNode(node, nodeName)}
        </React.Fragment>
      ))}
    </div>
  );
};
 
export default Sidebar;