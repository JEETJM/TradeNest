import "./Steps.css";

function Steps() {
  return (
    <section className="steps-section">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="steps-heading">Steps to open a TradeNest account</h2>
          </div>
        </div>

        <div className="row align-items-center mt-5">
          {/* Left Image */}

          <div className="col-lg-6 text-center">
            <img
              src="/Media/Images/steps-acop.svg"
              alt="Open Account"
              className="steps-image img-fluid"
            />
          </div>

          {/* Right Steps */}

          <div className="col-lg-6">
            <div className="step-item">
              <div className="step-number">01</div>

              <div className="step-content">
                <h5>Enter your mobile number</h5>

                <p>
                  Verify your phone number securely with OTP authentication.
                </p>
              </div>
            </div>

            <div className="step-divider"></div>

            <div className="step-item">
              <div className="step-number">02</div>

              <div className="step-content">
                <h5>Complete KYC verification</h5>

                <p>
                  Upload your PAN, Aadhaar and bank details to complete KYC.
                </p>
              </div>
            </div>

            <div className="step-divider"></div>

            <div className="step-item">
              <div className="step-number">03</div>

              <div className="step-content">
                <h5>Start investing</h5>

                <p>
                  Access stocks, mutual funds, ETFs and more from one account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;
