import "./styles/Learn.css";

function Learn() {
  return (
    <section className="learnSection">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT IMAGE */}

          <div className="col-lg-7 text-center">
            <img
              src="/Media/Images/varsity-products.svg"
              alt="TradeNest Learn"
              className="img-fluid learnImage"
            />
          </div>

          {/* RIGHT CONTENT */}

          <div className="col-lg-5">
            <h2>TradeNest Learn</h2>

            <p>
              Learn investing and trading with easy-to-understand lessons,
              interactive illustrations, bite-sized modules, quizzes, and
              practical examples. Whether you're a beginner or an experienced
              investor, TradeNest Learn helps you grow your financial knowledge
              anytime, anywhere.
            </p>

            <a href="/learn">Explore Learning →</a>

            <div className="storeBadges">
              <img src="/Media/Images/googlePlayBadge.svg" alt="Google Play" />

              <img
                src="/Media/Images/appstore-badge-light.svg"
                alt="App Store"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Learn;
