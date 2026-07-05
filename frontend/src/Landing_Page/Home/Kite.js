import React from "react";
import "./styles/Kite.css";

function Kite() {
  return (
    <section className="developer-banner">

      <div className="container">

        <div className="row align-items-center">

          {/* Left */}

          <div className="col-lg-3 col-md-12 text-center text-lg-start">

            <div className="developer-logo">

              <img  timn
                src="Media/Images/kc-logo-landing.png"
                alt="TradeNest Connect"
                style={{height:"100px" ,width:"400px"}}
              />

              <h2>TradeNest Connect</h2>

            </div>

          </div>

          {/* Center */}

          <div className="col-lg-6 col-md-12">

            <p className="developer-text">

              Need more? Build your own trading and investing experience with
              <strong> TradeNest Connect</strong>, simple REST APIs to place
              orders, stream real-time market data, manage portfolios, and
              automate your trading strategies.

              <a href="/">
                Explore
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </a>

            </p>

          </div>

          {/* Right */}

          <div className="col-lg-3 d-none d-lg-block text-end">

            <img
              src="Media/Images/kc-banner-image.svg"
              alt="API"
              className="api-image"
              style={{height:"100px" ,width:"400px"}}
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Kite;