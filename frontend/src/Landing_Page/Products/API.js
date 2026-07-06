import "./styles/API.css";

function API() {
  return (
    <section className="apiSection">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT CONTENT */}

          <div className="col-lg-5">
            <h2>TradeNest API</h2>

            <p>
              Build your own trading and investing applications using our
              powerful REST APIs and WebSocket streams. Access real-time market
              data, place orders instantly, manage portfolios, and create custom
              fintech experiences with ease.
            </p>

            <div className="apiLinks">
              <a href="/developers">API Documentation →</a>

              <a href="/api">Learn More →</a>
            </div>
          </div>

          {/* RIGHT IMAGE */}

          <div className="col-lg-7 text-center">
            <img
              src="/Media/Images/tradeAPI.svg"
              alt="TradeNest API"
              className="img-fluid apiImage"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default API;
