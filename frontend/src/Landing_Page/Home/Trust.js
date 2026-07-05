import React from "react";
import "./styles/Trust.css";

function Trust() {
  return (
    <section className="container trust-section">
      <div className="row align-items-center">
        {/* Left Side */}
        <div className="col-lg-6">
          <h2 className="trust-heading">Trust with confidence</h2>

          <div className="trust-box">
            <h4>Customer-first always</h4>

            <p>
              At TradeNest, every feature is designed with investors in mind.
              Our secure platform, transparent pricing, and reliable technology
              help you invest with confidence every day.
            </p>
          </div>

          <div className="trust-box">
            <h4>No spam or gimmicks</h4>

            <p>
              No misleading offers, unnecessary notifications, or hidden
              charges. Just a clean, fast, and distraction-free investing
              experience.
            </p>
          </div>

          <div className="trust-box">
            <h4>The TradeNest ecosystem</h4>

            <p>
              TradeNest connects investing, mutual funds, portfolio tracking,
              and learning tools into one simple ecosystem.
            </p>
          </div>

          <div className="trust-box">
            <h4>Invest smarter</h4>

            <p>
              Advanced market insights, educational resources, and powerful
              analytics help you make better financial decisions.
            </p>
          </div>
        </div>

        {/* Right Side */}

        <div className="col-lg-6 text-center">
          <img
            src="Media/Images/ecosystem.png"
            alt="TradeNest Ecosystem"
            className="img-fluid trust-image"
          />

          <div className="trust-links mt-4">
            <a href="/">Explore our products</a>

            <a href="/" className="ms-4">
              Try TradeNest Demo
              <i className="fa-solid fa-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Trust;
