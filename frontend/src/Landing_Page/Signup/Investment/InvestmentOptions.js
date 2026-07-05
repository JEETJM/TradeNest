import "./InvestmentOptions.css";

function InvestmentOptions() {
  return (
    <section className="investment-section">
      <div className="container">
        {/* Heading */}

        <div className="row">
          <div className="col-12 text-center">
            <h2 className="investment-heading">
              Investment options with TradeNest account
            </h2>
          </div>
        </div>

        {/* Cards */}

        <div className="row mt-5 gy-5">
          <div className="col-lg-6">
            <div className="investment-card">
              <img src="/Media/Images/stocks.svg" alt="Stocks" />

              <div>
                <h4>Stocks</h4>

                <p>
                  Invest in all exchange-listed companies with ease and
                  confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="investment-card">
              <img src="/Media/Images/mutual-funds.svg" alt="Mutual Funds" />

              <div>
                <h4>Mutual Funds</h4>

                <p>Invest in direct mutual funds with zero commission.</p>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="investment-card">
              <img src="/Media/Images/ipo.svg" alt="IPO" />

              <div>
                <h4>IPO</h4>

                <p>
                  Apply for the latest IPOs instantly with a seamless process.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="investment-card">
              <img src="/Media/Images/future-options.svg" alt="Futures & Options" />

              <div>
                <h4>Futures & Options</h4>

                <p>
                  Trade derivatives with advanced charts and risk management.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}

        <div className="text-center mt-5">
          <button className="btn btn-primary px-5 py-3">
            Explore Investments
          </button>
        </div>
      </div>
    </section>
  );
}

export default InvestmentOptions;
