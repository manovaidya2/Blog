import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import "../style/layout.css"; // Put all layout-related CSS here

const AdminLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={`admin-container ${isCollapsed ? "collapsed" : ""}`}>
      <Sidebar
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
        isOpen={isSidebarOpen}
      />
      <div className="main-content">
        <Header onSidebarToggle={toggleSidebar} />
        <div className="page-container">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
