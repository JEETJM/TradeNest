import React from "react";
import "./styles/Awards.css";

function Awards() {
  return (
    <section className="container awards-section">

      <div className="row align-items-center">

        {/* Left Image */}

        <div className="col-lg-6  text-center">

          <img
            src="Media/Images/largestBroker.svg"
            alt="TradeNest Statistics"
            className="img-fluid awards-img"
          />

        </div>

        {/* Right Content */}

        <div className="col-lg-6">

          <h2 className="awards-title ">
            India's Trusted Trading Platform
          </h2>

          <p className="awards-desc">
            Millions of investors trust TradeNest for secure investing,
            lightning-fast order execution, transparent pricing, and a seamless
            trading experience across stocks, mutual funds, ETFs, IPOs, and more.
          </p>

          <div className="row mt-4">

            <div className="col-6">

              <ul className="awards-list">
                <li>Stocks & IPOs</li>
                <li>Futures & Options</li>
                <li>Mutual Funds</li>
              </ul>

            </div>

            <div className="col-6">

              <ul className="awards-list">
                <li>ETFs</li>
                <li>Bonds</li>
                <li>Government Securities</li>
              </ul>

            </div>

          </div>
          <img src="Media\Images\pressLogos.png" alt="PresLOGO HERE" style={{width:"85%"}}></img>

        </div>

      </div>

    </section>
  );
}

export default Awards;