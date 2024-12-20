import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/api/users">Users</Link>
      <Link className="nav-link" to="/api/sources">BBC News</Link>
      <Link className="nav-link" to="/api/technologies">Technology</Link>
      <Link className="nav-link" to="/api/search">Search</Link>
    </nav>
  );
};
  
export default Navbar;