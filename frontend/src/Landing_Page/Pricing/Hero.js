import { Link } from "react-router-dom";
import "./styles/Hero.css";

function Hero() {
  return (
    <section className="pricingHero">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1>Pricing</h1>

            <p>
              Free equity investments and transparent pricing. Invest with ₹0
              account opening and flat ₹20 brokerage on intraday and F&O trades.
            </p>

            <div className="heroButtons">
              <Link to="/signup" className="btn btn-primary btn-lg px-5">
                Open Account
              </Link>

              <button
                className="btn btn-outline-primary btn-lg px-5 ms-3"
                onClick={() => {
                  const element = document.getElementById("charges");

                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }}
              >
                View Charges
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
