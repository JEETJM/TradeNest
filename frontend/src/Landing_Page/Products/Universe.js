import "./styles/Universe.css";

function Universe() {
  return (
    <section className="universeSection">
      <div className="container">
        <div className="text-center">
          <h2>The TradeNest Universe</h2>

          <p>
            Extend your investing journey with our ecosystem of smart financial
            products and trusted partner platforms.
          </p>
        </div>

        <div className="row mt-5">
          <div className="col-lg-4 col-md-6 mb-5">
            <div className="universeCard">
              <img src="/Media/Images/zerodhaFundhouse.png" alt="FUND" />

              <p>
                Smart index funds designed to help you build long-term wealth
                through transparent investing.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-5">
            <div className="universeCard">
              <img style={{width:"280px"}} src="/Media/Images/sensibullLogo.svg" alt="BULL" />

              <p>
                Build, automate and backtest trading strategies without writing
                a single line of code.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-5">
            <div className="universeCard">
              <img src="/Media/Images/tijori.svg" alt="" />

              <p>
                Analyze options strategies, open interest, market positions, and
                advanced trading insights.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-5 mb-5">
            <div className="universeCard">
              <img src="/Media/Images/streakLogo.png" alt="" />

              <p>
                Invest in ready-made baskets of stocks and ETFs built around
                powerful market themes.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-5">
            <div className="universeCard">
              <img src="/Media/Images/smallcaseLogo.png" alt="" />

              <p>
                Discover detailed company research, financial reports, industry
                trends, and market insights.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-5">
            <div className="universeCard">
              <img src="/Media/Images/goldenPiLogo.png" alt="" />

              <p>
                Personalized life and health insurance guidance with complete
                transparency and zero spam.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          {/* <button
            className="btn btn-primary signupBtn"
            onClick={() => navigate("/signup")}
          >
            Sign up for free
          </button> */}
        </div>
      </div>
    </section>
  );
}

export default Universe;
