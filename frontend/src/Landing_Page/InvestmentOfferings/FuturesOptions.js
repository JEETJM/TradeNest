import "./styles/FuturesOptions.css";

function FuturesOptions() {
  return (
    <section className="foSection">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT IMAGE */}

          <div className="col-lg-7 text-center">
            <img
            style={{width:"400px", height:"350px"}}
              src="/Media/Images/investments-fo.png"
              alt="TradeNest Futures & Options"
              className="img-fluid foImage"
            />
          </div>

          {/* RIGHT CONTENT */}

          <div className="col-lg-5">
            <h2>Futures & Options</h2>

            <p>
              Trade index and stock futures & options with advanced charts, live
              option chain, Greeks, strategy builder, market depth, and
              ultra-fast order execution. Designed for both beginners and
              professional derivatives traders.
            </p>

            <h5 className="availableTitle">Available on</h5>

            <div className="platformLinks">
              <a href="/products/tradenest-pro">TradeNest Pro →</a>

              <a href="/products/options-lab">Options Lab →</a>

              <a href="/products/console">Console →</a>

              <a href="/products/strategy-builder">Strategy Builder →</a>

              <a href="/products/market-depth">Market Depth →</a>

              <a href="/markets/fno">F&O Overview →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FuturesOptions;
