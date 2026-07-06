import "./styles/Hero.css";

function Hero() {
  return (
    <section className="products-hero">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1>
              Powerful platforms for
              <br />
              smarter investing
            </h1>

            <p>
              Discover TradeNest's ecosystem of modern trading, investing,
              portfolio management, and developer tools.
            </p>

            <a className="OFF" href="/InvestmentOfferings">
              🔥 Check out our investment offerings →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
