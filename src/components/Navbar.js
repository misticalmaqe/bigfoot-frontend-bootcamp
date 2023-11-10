import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <NavLink to="/" className="nav-link" activeClassName="active">
            Home
          </NavLink>
          <NavLink
            to="/sightings"
            className="nav-link"
            activeClassName="active"
          >
            Sightings
          </NavLink>
          <NavLink to="/new" className="nav-link" activeClassName="active">
            New Sighting
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
