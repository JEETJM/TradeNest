import React from "react";
import "./styles/Pricing.css";

function Pricing() {
  return (
    <section className="container pricing-section">

      <div className="row align-items-center">

        {/* Left */}

        <div className="col-lg-5">

          <h2 className="pricing-heading">
            Unbeatable pricing
          </h2>

          <p className="pricing-description">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>

          <a href="/" className="pricing-link">
            See pricing
            <i className="fa-solid fa-arrow-right ms-2"></i>
          </a>

        </div>

        {/* Right */}

        <div className="col-lg-7">

          <div className="d-flex justify-content-between align-items-end pricing-images">

            <div className="price-box">

              <img
                src="Media/Images/pricing0.svg"
                alt="0"
              />

              <p>
                Free account
                <br />
                opening
              </p>

            </div>

            <div className="price-box">

              <img
                src="Media/Images/pricing0.svg"
                alt="0"
              />

              <p>
                Free equity delivery
                <br />
                and direct mutual funds
              </p>

            </div>

            <div className="price-box">

              <img
                src="Media/Images/pricingEquity.svg"
                alt="20"
              />

              <p>
                Intraday and
                <br />
                F&O
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Pricing;