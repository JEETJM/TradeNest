import "./styles/GiftStocks.css";

function GiftStocks() {
  return (
    <section className="giftSection">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT IMAGE */}

          <div className="col-lg-7 text-center">
            <img
              src="/Media/Images/gift-illustration.png"
              alt="Gift Stocks"
              className="img-fluid giftImage"
            />
          </div>

          {/* RIGHT CONTENT */}

          <div className="col-lg-5">
            <h2>Gift Stocks</h2>

            <p>
              Celebrate life's special moments by gifting stocks and ETFs to
              your family and friends. A meaningful way to encourage investing
              and help your loved ones build wealth for the future.
            </p>

            <h5 className="availableTitle">Available on</h5>

            <div className="platformLinks">
              <a href="/">Gift Center →</a>

              <a href="/products/tradenest-pro">TradeNest Pro →</a>


              <a href="https://portfolio-jm-web.netlify.app/">Portfolio →</a>


              <a href="/support">Help Center →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GiftStocks;
