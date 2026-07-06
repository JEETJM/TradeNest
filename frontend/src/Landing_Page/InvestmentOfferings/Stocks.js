import "./styles/Stocks.css";

function Stocks() {
  return (
    <section className="stocksSection">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT IMAGE */}

          <div className="col-lg-7 text-center">
            <img
              style={{ width: "450px" }}
              src="/Media/Images/investments-stocks.png"
              alt="TradeNest Stocks"
              className="img-fluid stocksImage"
            />
          </div>

          {/* RIGHT CONTENT */}

          <div className="col-lg-5">
            <h2>Stocks</h2>

            <p>
              Invest in thousands of listed companies across India's leading
              stock exchanges. Buy stocks for long-term wealth creation or trade
              intraday with real-time market data, advanced charts, watchlists,
              and lightning-fast execution.
            </p>

            <h5 className="availableTitle">Available on</h5>

            <div className="platformLinks">
              <a href="/InvestmentOfferings">TradeNest Pro →</a>

              <a href="/InvestmentOfferings">Console →</a>

              <a href="/InvestmentOfferings">ThemeInvest →</a>

              <a href="/InvestmentOfferings">Market Reports →</a>

              <a href="/InvestmentOfferings">Smart Scanner →</a>

              <a href="/InvestmentOfferings">Market Overview →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stocks;
