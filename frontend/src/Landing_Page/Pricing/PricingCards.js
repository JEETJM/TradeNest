import "./styles/PricingCards.css";

function PricingCards() {
  return (
    <section className="pricingCards">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {/* Card 1 */}

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="priceCard">
              <img
                src="/Media/Images/pricing0.svg"
                alt="Free Account"
                className="priceImage"
              />

              <h4>Free account opening</h4>

              <p>
                Open your TradeNest trading and demat account at absolutely no
                cost.
              </p>
            </div>
          </div>

          {/* Card 2 */}

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="priceCard">
              <img
                src="/Media/Images/pricing0.svg"
                alt="Free Delivery"
                className="priceImage"
              />

              <h4>Free equity delivery</h4>

              <p>
                Invest in stocks and direct mutual funds with zero brokerage
                charges.
              </p>
            </div>
          </div>

          {/* Card 3 */}

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="priceCard">
              <img
                src="/Media/Images/pricingEquity.svg"
                alt="Flat Brokerage"
                className="priceImage"
              />

              <h4>Intraday & F&O</h4>

              <p>Flat ₹20 or 0.03% per executed order, whichever is lower.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingCards;
