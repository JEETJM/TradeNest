import "./styles/IPO.css";

function IPO() {
  return (
    <section className="ipoSection">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT CONTENT */}

          <div className="col-lg-5">
            <h2>Initial Public Offerings (IPO)</h2>

            <p>
              Apply for upcoming IPOs with a seamless, paperless process.
              Discover company details, issue timelines, price bands,
              subscription status, allotment updates, and listing information
              directly from your TradeNest account.
            </p>

            {/* <h5 className="availableTitle">Available on</h5> */}

            
          </div>

          {/* RIGHT IMAGE */}

          <div className="col-lg-7 text-center">
            <img
              src="/Media/Images/ipo-products.png"
              alt="TradeNest IPO"
              className="img-fluid ipoImage"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default IPO;
