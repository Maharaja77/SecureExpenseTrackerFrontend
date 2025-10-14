//import React{useState} from "react";
import logo from "../asset/logo.jpg";

import React, { useState } from "react";
//import { Link, useNavigate } from "react-router-dom";
//import API from "../api";

function Header() {

  const [query, setQuery] = useState("");
   const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // This runs when user clicks the search button
  const handleSearch = (event) => {
    event.preventDefault(); // stop page reload
    console.log("Search Query:", query); // check in console
    // You can call an API or filter data here
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        {/* Logo and Brand */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="rounded-circle me-2"
          />
          <span>SecureExpenseTracker</span>
        </a>

        {/* Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links and Search */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="Register">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='Login'>
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='Register'>
                Register
              </a>
            </li>
          </ul>

          {/* Search Form */}
          <form className="d-flex mt-2 mt-lg-0" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={handleInputChange}          
            />
            <button
              className="btn btn-outline-light border border-dark ps-2"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
