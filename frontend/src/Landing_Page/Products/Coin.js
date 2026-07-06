import "./styles/Coin.css";

function Coin() {
  return (
    <section className="coinSection">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT IMAGE */}

          <div className="col-lg-7 text-center">
            <img
              src="/Media/Images/products-coin.png"
              alt="TradeNest Funds"
              className="img-fluid coinImage"
            />
          </div>

          {/* RIGHT CONTENT */}

          <div className="col-lg-5">
            <h2>TradeNest Funds</h2>

            <p>
              Invest in direct mutual funds with zero commission and enjoy a
              smarter way to build long-term wealth. Start SIPs, explore top
              performing funds, monitor your portfolio, and manage all your
              investments from one secure platform.
            </p>

            <a href="/funds">Learn More →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Coin;
