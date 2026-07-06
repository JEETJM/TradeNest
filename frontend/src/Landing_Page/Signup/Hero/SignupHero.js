import { useState } from "react";
import "./SignupHero.css";

function SignupHero() {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGetOTP = () => {
    setError("");
    setSuccess("");

    if (mobile.trim() !== "") {
      if (!/^[6-9]\d{9}$/.test(mobile)) {
        setError("Please enter a valid 10-digit mobile number.");
        return;
      }

      setSuccess("OTP has been sent to your mobile number.");
      return;
    }

    if (email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      setSuccess("OTP has been sent to your email successfully.");
      return;
    }

    setError("Please enter your mobile number or email address.");
  };

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

        {/* Main Section */}
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

              {/* Mobile Input */}

              <div className="mobileBox">
                <span className="country-code">
                  <img src="/Media/Images/india-flag.svg" alt="India Flag" />
                  +91
                </span>

                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setMobile(value);
                    setError("");
                    setSuccess("");
                  }}
                />
              </div>

              <center className="my-3">
                <b>OR</b>
              </center>

              {/* Email Input */}

              <div className="inputBox">
                <i className="fa-regular fa-envelope inputIcon"></i>

                <input
                  type="email"
                  className="emailInput"
                  placeholder="Enter your Gmail ID"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                />
              </div>

              {/* Error */}

              {error && (
                <p className="message error">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {error}
                </p>
              )}

              {/* Success */}

              {success && (
                <p className="message success">
                  <i className="fa-solid fa-inbox"></i>
                  {success}
                </p>
              )}

              {/* Button */}

              <button
                className="btn btn-primary w-100 mt-4 otpBtn"
                onClick={handleGetOTP}
              >
                Get OTP
              </button>

              <small className="d-block mt-3">
                By proceeding you agree to our
                <a href="/"> Terms</a> & <a href="/"> Privacy Policy</a>
              </small>

              <hr />

              <small>
                Looking to open NRI account?
                <a href="/signup"> Click here</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupHero;
