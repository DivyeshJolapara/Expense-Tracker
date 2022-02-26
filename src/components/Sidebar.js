import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="sidebar-bg">
      <button
        className="btn btn-primary close-sidebar"
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
          document.getElementsByClassName(
            "expense-list-body"
          )[0].style.marginLeft = "0";
        }}
      >
        X
      </button>
      <h1>Side Bar</h1>
      <Link to="/profile">My profile</Link>
      <div></div>
    </div>
  );
};

export default Sidebar;
