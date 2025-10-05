import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import "../styles/Topbar.css";

const Topbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="brand-title">🎬 Lumière Cinema Admin</h1>
      </div>
      <div className="topbar-right">
        <div className="user-menu" onClick={() => setOpen(!open)}>
          <img
            src="https://png.pngtree.com/png-clipart/20250117/original/pngtree-account-avatar-user-abstract-circle-background-flat-color-icon-png-image_4965046.png"
            alt="avatar"
            className="avatar"
          />
          <span>{user?.TenTK || "Admin"}</span>
          <div className={`dropdown ${open ? "show" : ""}`}>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
