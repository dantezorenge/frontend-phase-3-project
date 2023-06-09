import React from "react";
import { Link } from "react-router-dom";
import "./App.css"

function Navbar() {
  return (
    <nav className="nav-link-container">
      
        <li className="nav-link">
          <Link to="/">Moviez</Link>
        </li>
        <li className="nav-link">
          <Link to="/review">Reviewz</Link>
        </li>
  
    </nav>
  );
}

export default Navbar;
