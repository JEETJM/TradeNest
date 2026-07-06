import "./styles/Hero.css";

function Hero() {
  return (
    <section className="investmentHero">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1>Investment Offerings</h1>

            <p>
              Build long-term wealth with TradeNest's investment ecosystem.
              Invest confidently across stocks, mutual funds, ETFs, IPOs, bonds,
              digital gold, and more—all from a single platform.

            </p>
            <img style={{width:"450px"}} src="Media\Images\play.png" alt="PALY"></img>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
