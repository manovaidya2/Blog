import React from "react";
import { Link } from "react-router-dom";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import "../style/sidebar.css";

const Sidebar = ({ isCollapsed, toggleCollapse, isOpen }) => {
  return (
    <>
      {/* Collapse/Expand Icon (Desktop) */}
      <button className="sidebar-collapse" onClick={toggleCollapse}>
        {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? "open" : ""} ${
          isCollapsed ? "collapsed" : ""
        }`}
      >
        {!isCollapsed && <h2 className="sidebar-title">Admin Panel</h2>}
        <ul className="sidebar-links">
          <li><Link to="/">Dashboard</Link></li>
       <li><Link to="/admin/journals">Journals</Link></li>

          <li><Link to="/admin/blogs">Admin Blog</Link></li>
          <li><Link to="/admin/editors">Editors</Link></li>
          <li><Link to="/admin/reviewers">Reviewers</Link></li>
          <li><Link to="/admin/issues">Issues</Link></li>
          <li><Link to="/admin/settings">Settings</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
