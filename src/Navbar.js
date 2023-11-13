import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/search">Search Verses</Link>
        </li>
        <li className="navbar-item">
          <Link to="/create">Create Verse</Link>
        </li>
        <li className="navbar-item">
          <Link to="/edit">Edit Verse</Link>
        </li>
        <li className="navbar-item">
          <Link to="/delete">Delete Verse</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
