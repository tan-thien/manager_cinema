import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Admin Panel</h2>
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "☰" : "×"}
        </button>
      </div>

      <ul className="sidebar-menu">
        <li><Link className={location.pathname === "/admin" ? "active" : ""} to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/branches">Branches</Link></li>
        <li><Link to="/admin/cinemas">Cinemas</Link></li>
        <li><Link to="/admin/Cinemalist">Seat</Link></li>
        <li><Link to="/admin/schedules">Schedules</Link></li>
        <li><Link to="/admin/genres">Genres</Link></li>
        <li><Link to="/admin/movies">Movies</Link></li>
        <li><Link to="/admin/News">News</Link></li>
        <li><Link to="/admin/Orders">Orders</Link></li>
        <li><Link to="/admin/Services">Services</Link></li>
        <li><Link to="/admin/Statistics">Statistics</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
