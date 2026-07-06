import React from "react";
import "./styles/Hero.css";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="container hero-section text-center">
      <img
        src="Media/Images/HomeHero.svg"
        alt="TradeNest Hero"
        className="img-fluid hero-img"
      />

      <h1 className="hero-title">Invest in everything</h1>

      <p className="hero-subtitle">
        Online platform to invest in stocks, mutual funds, ETFs, bonds, and
        more.
      </p>

      <Link to="/signup" className="btn open-btn">
        Sign up for free
      </Link>
    </section>
  );
}

export default Hero;
