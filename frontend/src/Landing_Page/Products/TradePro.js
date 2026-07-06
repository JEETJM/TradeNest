import "./styles/TradePro.css";

function TradePro() {
  return (
    <section className="tradePro" id="products">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT IMAGE */}

          <div className="col-lg-7  text-center">
            <img 
              src="/Media/Images/products-kite.png"
              alt="TradeNest Pro"
              className="img-fluid tradeImage"
            />
          </div>

          {/* RIGHT CONTENT */}

          <div className="col-lg-5">
            <h2>TradeNest Pro</h2>

            <p>
              Experience lightning-fast order execution, live market streaming,
              professional-grade charts, watchlists, and a clean, intuitive
              interface. Trade seamlessly across desktop, Android, and iOS from
              a single account.
            </p>

            <div className="links">
              <a href="/demo">Try Demo →</a>

              <a href="/products/tradepro">Learn More →</a>
            </div>

            <div className="storeBadges">
              <img src="/Media/Images/googlePlayBadge.svg" alt="Google Play" />

              <img
                src="/Media/Images/appstore-badge-light.svg"
                alt="App Store"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TradePro;
