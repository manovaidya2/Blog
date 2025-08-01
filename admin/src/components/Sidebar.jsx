import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaBook,
  FaPenNib,
  FaUserEdit,
  FaUserCheck,
  FaFolderOpen,
  FaCog,
} from "react-icons/fa";
import "../style/sidebar.css";

const Sidebar = ({ isCollapsed, toggleCollapse, isOpen }) => {
  return (
    <>
      {/* Collapse/Expand Icon */}
      <button className="sidebar-collapse" onClick={toggleCollapse}>
        {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
      </button>

      <div
        className={`sidebar ${isOpen ? "open" : ""} ${
          isCollapsed ? "collapsed" : ""
        }`}
      >
        {!isCollapsed && <h2 className="sidebar-title">Admin Panel</h2>}

        <ul className="sidebar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
              <FaTachometerAlt className="icon" />
              {!isCollapsed && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/journals" className={({ isActive }) => isActive ? "active-link" : ""}>
              <FaBook className="icon" />
              {!isCollapsed && <span>Journals</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/blogs" className={({ isActive }) => isActive ? "active-link" : ""}>
              <FaPenNib className="icon" />
              {!isCollapsed && <span>Journal Blog</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/latest/blogs" className={({ isActive }) => isActive ? "active-link" : ""}>
              <FaUserEdit className="icon" />
              {!isCollapsed && <span>Latest Blog</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/submissions" className={({ isActive }) => isActive ? "active-link" : ""}>
              <FaUserCheck className="icon" />
              {!isCollapsed && <span>Menu Script</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/issues" className={({ isActive }) => isActive ? "active-link" : ""}>
              <FaFolderOpen className="icon" />
              {!isCollapsed && <span>Issues</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "active-link" : ""}>
              <FaCog className="icon" />
              {!isCollapsed && <span>Settings</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
