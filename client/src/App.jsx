
import React from "react";
import { NavLink } from "react-router-dom";

export default function App({ children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">PS</div>
          <div>
            <h2>Placement<span>Track</span></h2>
            <small>Skill Monitoring System</small>
          </div>
        </div>

        <div className="top-info">
          <span className="online-dot"></span>
          Management Portal
        </div>
      </header>

      <nav className="navbar">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/add">Add Student</NavLink>
        <NavLink to="/students">Student Skill List</NavLink>
      </nav>

      <main className="container">
        {children}
      </main>

      <footer>
        <p>© 2026 PlacementHub</p>
        <p>Student Skill Monitoring Management System</p>
      </footer>
    </div>
  );
}
