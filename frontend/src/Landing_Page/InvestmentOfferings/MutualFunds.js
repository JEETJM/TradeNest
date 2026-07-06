import "./styles/MutualFunds.css";

function MutualFunds() {
  return (
    <section className="mutualSection">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT CONTENT */}

          <div className="col-lg-5">
            <h2>Direct Mutual Funds</h2>

            <p>
              Build long-term wealth with commission-free direct mutual funds.
              Invest through SIPs or one-time investments, track your portfolio,
              compare fund performance, and manage everything from a single,
              easy-to-use platform.
            </p>

            <h5 className="availableTitle">Available on</h5>

            <div className="platformLinks">
              <a href="/products/funds">TradeNest Funds →</a>

              <a href="/products/console">Console →</a>

              <a href="/InvestmentOfferings">SIP Planner →</a>

              <a href="https:/portfolio-jm-web.netlify.app">Portfolio Tracker →</a>
            </div>
          </div>

          {/* RIGHT IMAGE */}

          <div className="col-lg-7 text-center">
            <img
            style={{width:"500px"}}
              src="/Media/Images/investments-mf.png"
              alt="Direct Mutual Funds"
              className="img-fluid mutualImage"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MutualFunds;
