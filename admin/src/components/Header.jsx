import React from "react";
import "../style/header.css";
import { FaBars } from "react-icons/fa";

const Header = ({ onSidebarToggle }) => {
  return (
    <header className="admin-header">
      {/* Hamburger icon - visible only on mobile */}
      <button className="sidebar-toggle-mobile" onClick={onSidebarToggle}>
        <FaBars />
      </button>

      <h1 className="admin-title">Admin Dashboard</h1>
    </header>
  );
};

export default Header;
