import "./styles/Hero.css";

function Hero() {
  return (
    <section className="supportHero">
      <div className="container">
        <div className="row align-items-center">
          {/* Left */}

          <div className="col-lg-8">
            <span className="supportBadge">TradeNest Support Portal</span>

            <h1>How can we help you?</h1>

            <p>
              Search for answers, browse help topics, or raise a support ticket.
            </p>

            <div className="searchBox">
              <input
                type="text"
                placeholder="Eg. account opening, IPO, fund transfer..."
              />

              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            <div className="popularLinks">
              <span>Popular:</span>

              <a href="/">Account Opening</a>

              <a href="/">KYC</a>

              <a href="/">IPO</a>

              <a href="/">Fund Transfer</a>

              <a href="/">Mutual Funds</a>
            </div>
          </div>

          {/* Right */}

          <div className="col-lg-4">
            <div className="ticketCard">
              <h4>Quick Support</h4>

              <a href="/">🎫 Track Ticket</a>

              <a href="/">📝 Raise New Ticket</a>

              <a href="/">📂 My Requests</a>

              <a href="/about">📞 Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
