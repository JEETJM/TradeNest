import "./SignupHero.css";

function SignupHero() {
  return (
    <section className="signupHero">
      <div className="container">
        {/* Heading */}

        <div className="row">
          <div className="col-12 text-center">
            <h1 className="heroHeading">
              Open a free demat and trading account online
            </h1>

            <p className="heroSubHeading">
              Start investing with zero account opening charges and begin your
              investment journey with TradeNest.
            </p>
          </div>
        </div>

        {/* Main */}

        <div className="row align-items-center mt-5">
          {/* Left */}

          <div className="col-lg-6 text-center">
            <img
              src="/Media/Images/account_open.svg"
              className="img-fluid heroImage"
              alt="Signup"
            />
          </div>

          {/* Right */}

          <div className="col-lg-6">
            <div className="signupCard">
              <h3>Signup now</h3>

              <p className="track">
                Already applied?
                <a href="/"> Track application</a>
              </p>

              <div className="mobileBox">
                <span>🇮🇳 +91</span>

                <input type="text" placeholder="Enter your mobile number" />
              </div>

              <button className="btn btn-primary w-100 mt-4 otpBtn">
                Get OTP
              </button>

              <small>
                By proceeding you agree to our
                <a href="/"> Terms</a> &<a href="/"> Privacy Policy</a>
              </small>

              <hr />

              <small>
                Looking to open NRI account?
                <a href="/"> Click here</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupHero;
