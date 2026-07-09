import "./AccountTypes.css";

function AccountTypes() {
  return (
    <section className="account-section">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="account-heading">
              Choose the account that's right for you
            </h2>

            <p className="account-subheading">
              TradeNest offers different account types to suit every investor's
              needs.
            </p>
          </div>
        </div>

        <div className="row g-4 mt-4">
          {/* Individual */}

          <div className="col-lg-4 col-md-6">
            <div className="account-card">
              <img src="/Media/Images/acop-individual.svg" alt="Individual" />

              <h4>Individual Account</h4>

              <p>
                Perfect for individual investors who want to invest in stocks,
                ETFs, mutual funds and IPOs.
              </p>

              <a href="/signup">Create Account →</a>
            </div>
          </div>

          {/* Minor */}

          <div className="col-lg-4 col-md-6">
            <div className="account-card">
              <img src="/Media/Images/acop-minor.svg" alt="Minor" />
              <h4>Minor Account</h4>
              <p>
                Start investing early by opening an account for minors under the
                guidance of a guardian.
              </p>
              <a href="/signup">Create Account →</a>{" "}
            </div>
          </div>

          {/* NRI */}

          <div className="col-lg-4 col-md-6">
            <div className="account-card">
              <img src="/Media/Images/acop-nri.svg" alt="NRI" />
              <h4>NRI Account</h4>
              <p>
                Designed for Non-Resident Indians to invest in Indian financial
                markets with ease.
              </p>
              <a href="/signup">Create Account →</a>{" "}
            </div>
          </div>

          {/* HUF */}

          <div className="col-lg-6 col-md-6">
            <div className="account-card">
              <img src="/Media/Images/acop-huf.svg" alt="HUF" />
              <h4>HUF Account</h4>
              <p>
                Manage investments under a Hindu Undivided Family with dedicated
                account support.
              </p>
              <a href="/signup">Create Account →</a>{" "}
            </div>
          </div>

          {/* Corporate */}

          <div className="col-lg-6 col-md-6">
            <div className="account-card">
              <img src="/Media/Images/acop-corporate.svg" alt="Corporate" />
              <h4>Corporate / LLP Account</h4>
              <p>
                A business account built for companies, LLPs, partnerships and
                organizations.
              </p>
              <a href="/signup">Create Account →</a>{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountTypes;
