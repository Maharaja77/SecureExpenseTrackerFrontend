import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../asset/logo.jpg";

function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); 

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Search Query:", query);
    
  };

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="rounded-circle me-2"
          />
          <span>SecureExpenseTracker</span>
        </Link>

        
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

        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!localStorage.getItem("token") && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
            {localStorage.getItem("token") && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/expense">
                    Dashboard
                  </Link>
                </li>
                {role === "ROLE_ADMIN" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Admin Panel
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>

          
          <form className="d-flex mt-2 mt-lg-0" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-light border border-dark ps-2" type="submit">
              Search
            </button>
          </form>

          
          {localStorage.getItem("token") && (
            <button
              className="btn btn-danger ms-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
