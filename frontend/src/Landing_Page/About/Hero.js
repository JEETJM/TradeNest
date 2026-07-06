import "./styles/Hero.css";

function Hero() {
  return (
    <>
      {/* Hero */}

      <section className="aboutHero">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto text-center">
              <h1>Revolutionizing investing through technology.</h1>
              <img src="\Media\Images\coffe.png" alt="cofee"></img>

              <hr />

              <p>
                TradeNest was built with one vision — to make investing simple,
                transparent, and affordable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}

      <section className="companyStory">
        <div className="container">
          <div className="row">
            {/* Left */}

            <div className="col-lg-6">
              <p>
                TradeNest was founded to make investing simple, transparent, and
                affordable for everyone.
              </p>

              <p>
                We built a modern investment platform where anyone can invest in
                stocks, ETFs, mutual funds, IPOs, bonds, and more with ease.
              </p>

              <p>
                Our goal is to remove unnecessary complexity from investing and
                provide a seamless digital experience.
              </p>
            </div>

            {/* Right */}

            <div className="col-lg-6">
              <p>
                Every feature at TradeNest is designed with a customer-first
                approach, combining speed, security, and simplicity.
              </p>

              <p>
                Along with investing, we promote financial education through
                blogs, tutorials, and learning resources.
              </p>

              <p>
                As we continue to grow, our mission remains the same — helping
                millions of people invest with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
