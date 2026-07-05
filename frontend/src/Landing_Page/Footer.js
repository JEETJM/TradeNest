import React from "react";
import "./Home/styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Column 1 */}

          <div className="col-lg-3 col-md-6">
            <a className="#" href="/">
              <img
                src="\Media\Images\TradeNest.png"
                alt="TradeNest Logo"
                className="footer-logo"
              />
            </a>

            <p className="copyright">
              © 2026 TradeNest Technologies.
              <br />
              All rights reserved.
            </p>

            <div className="social-icons">
              <a href="https://x.com/JEETJM04">
                <i className="fa-brands fa-x-twitter"></i>
              </a>

              <a href="https://www.instagram.com/igx_jeet/">
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a href="https://www.linkedin.com/in/jm1904/">
                <i className="fa-brands fa-linkedin"></i>
              </a>

              <a href="https://github.com/JEETJM">
                <i className="fa-brands fa-github"></i>
              </a>
              <div className="store-badges">
                <img
                  src="/Media/Images/googlePlayBadge.svg"
                  alt="Google Play"
                  className="store-badge"
                />

                <img
                  src="/Media/Images/appstore-badge-light.svg"
                  alt="App Store"
                  className="store-badge"
                />
              </div>
            </div>
          </div>

          {/* Column 2 */}

          <div className="col-lg-3 col-md-6">
            <h5>Account</h5>

            <ul>
              <li>
                <a href="/">Open Account</a>
              </li>

              <li>
                <a href="/">Login</a>
              </li>

              <li>
                <a href="https://portfolio-jm-web.netlify.app/">Portfolio</a>
              </li>

              <li>
                <a href="/">Pricing</a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}

          <div className="col-lg-3 col-md-6">
            <h5>Products</h5>

            <ul>
              <li>
                <a href="/">Stocks</a>
              </li>

              <li>
                <a href="/">Mutual Funds</a>
              </li>

              <li>
                <a href="/">IPO</a>
              </li>

              <li>
                <a href="/">Bonds</a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}

          <div className="col-lg-3 col-md-6">
            <h5>Company</h5>

            <ul>
              <li>
                <a href="/">About</a>
              </li>

              <li>
                <a href="/">Careers</a>
              </li>

              <li>
                <a href="/">Contact</a>
              </li>

              <li>
                <a href="/">Support</a>
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div className="footer-disclaimer">
          <p>
            TradeNest is a demo investment platform created for learning and
            portfolio purposes. Investing in securities involves market risk.
            Always research thoroughly before making any investment decisions.
          </p>

          <p>
            This website does not provide financial advice or investment
            recommendations. Information presented is for educational and
            demonstration purposes only.
          </p>
        </div>

        <div className="footer-bottom">
          <a href="/">Terms</a>

          <a href="/">Privacy</a>

          <a href="/">Disclaimer</a>

          <a href="/">Contact</a>

          <a href="/">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
