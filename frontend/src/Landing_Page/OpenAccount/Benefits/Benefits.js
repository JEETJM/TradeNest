import "./Benefits.css";

function Benefits() {
  return (
    <section className="benefits-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Image */}

          <div className="col-lg-6 text-center">
            <img
              src="/Media/Images/acop-benefits.svg"
              alt="TradeNest Benefits"
              className="benefits-image img-fluid"
            />

            <h3 className="benefits-title mt-4">
              Benefits of opening a TradeNest account
            </h3>
          </div>

          {/* Right Content */}

          <div className="col-lg-6">
            <div className="benefit-box">
              <h4>₹0 Account Opening</h4>

              <p>
                Start your investment journey with zero account opening charges
                and a quick online registration process.
              </p>
            </div>

            <div className="benefit-box">
              <h4>Flat ₹20 Brokerage</h4>

              <p>
                Transparent pricing with no hidden fees. Pay a flat brokerage
                for intraday and F&O trades.
              </p>
            </div>

            <div className="benefit-box">
              <h4>Secure & Reliable Platform</h4>

              <p>
                Experience fast order execution, real-time market data, and
                enterprise-grade security.
              </p>
            </div>

            <div className="benefit-box">
              <h4>TradeNest Ecosystem</h4>

              <p>
                Manage stocks, mutual funds, ETFs, IPOs and more from a single,
                easy-to-use platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;
