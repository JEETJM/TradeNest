import "./styles/GovernmentBonds.css";

function GovernmentBonds() {
  return (
    <section className="bondSection">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT CONTENT */}

          <div className="col-lg-5">
            <h2>Government Securities & Bonds</h2>

            <p>
              Invest in Government Securities (G-Secs), Treasury Bills, SDLs,
              and high-quality corporate bonds. Enjoy a secure investment option
              with predictable returns while diversifying your long-term
              portfolio.
            </p>

            <h5 className="availableTitle">Available on</h5>

            <div className="platformLinks">
              <a href="/">Bond Marketplace →</a>

              <a href="https://portfolio-jm-web.netlify.app/">Portfolio →</a>

              <a href="/signup">Bond Research →</a>

              <a href="/support">Learn More →</a>
            </div>
          </div>

          {/* RIGHT IMAGE */}

          <div className="col-lg-7 text-center">
            <img
            style={{width:"500px"}}
              src="/Media/Images/investments-income.png"
              alt="Government Bonds"
              className="img-fluid bondImage"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default GovernmentBonds;
