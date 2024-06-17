export default function Sidebar(props) {
  const { handleToggleSideBar, data } = props;
  return (
    <div className="sidebar">
      <div className="bgOverlay" onClick={handleToggleSideBar}></div>
      <div className="sidebarContents">
        <h2>{data?.title}</h2>
        <div className="descriptionContainer">
          <p className="descriptionTitle">{data?.date}</p>
          <p className="descriptionTitle">Description</p>
          <p>{data?.explanation}</p>
        </div>
        <button onClick={handleToggleSideBar}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
