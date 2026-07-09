import React from "react";
import "./Home/styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container">
        {/* Logo */}

        <a className="navbar-brand" href="/">
          <img
            src="/Media/Images/logo.png"
            alt="TradeNest"
            style={{ height: "70px", width: "260px" }}
            className="logo"
          />
        </a>

        {/* Mobile Toggle */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/open-account">
                Signup
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/products">
                Products
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/pricing">
                Pricing
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/support">
                Support
              </a>
            </li>

            <li className="nav-item">
              <button className="menu-btn">
                <i className="fa-solid fa-bars"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
