import "./styles/Console.css";

function Console() {
  return (
    <section className="consoleSection">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT CONTENT */}

          <div className="col-lg-5">
            <h2>TradeNest Console</h2>

            <p>
              Get a complete overview of your investments with an intelligent
              portfolio dashboard. Track holdings, profit & loss, transaction
              history, dividends, tax reports, and detailed analytics—all in one
              place.
            </p>

            <a href="/console">Learn More →</a>
          </div>

          {/* RIGHT IMAGE */}

          <div className="col-lg-7 text-center">
            <img
              src="/Media/Images/products-console.png"
              alt="TradeNest Console"
              className="img-fluid consoleImage"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Console;
