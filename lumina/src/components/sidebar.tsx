const Sidebar = (params : any) => {
    return (
        <div id="sidebar">
            <h1>Lumina</h1>
            <DirectoryTree tree={params.dirtree} />
        </div>
    );
}

const DirectoryTree= (params : any) => {
  return (
    <div>
      <h2>Directory Tree</h2>
      {
      params.tree.map((f:string)=><p>{f}</p>)
      }
    </div>
  );
};
 
export default Sidebar;