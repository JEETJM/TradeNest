import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useState } from "react";
import "./Signup.css";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const getPasswordStrength = () => {
    if (password.length === 0) {
      return {
        text: "",
        className: "",
      };
    }

    if (password.length < 6) {
      return {
        text: "Weak Password",
        className: "weak",
      };
    }

    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return {
        text: "Strong Password",
        className: "strong",
      };
    }

    return {
      text: "Medium Password",
      className: "medium",
    };
  };

  const strength = getPasswordStrength();
  return (
    <section className="signupPage">
      <div className="signupContainer">
        {/* LEFT */}

        <div className="leftSide">
          <div className="leftContent">
            {/* <img
              src="/Media/Images/logoSIgn.png"
              alt=""
              className="signupLogo"
            /> */}

            <span className="welcomeText">Welcome to</span>

            <h1>TradeNest</h1>

            <h2>
              Invest.
              <br />
              Trade.
              <br />
              Grow.
            </h2>

            <p>
              Build your financial future with India's modern investment
              platform.
            </p>
            <div className="featureList">
              <div className="featureCard">
                <span>💳</span>
                <div>
                  <h4>₹0 Account Opening</h4>
                  <p>No hidden charges to get started.</p>
                </div>
              </div>

              <div className="featureCard">
                <span>🛡️</span>
                <div>
                  <h4>Bank Grade Security</h4>
                  <p>Your data is encrypted and protected.</p>
                </div>
              </div>

              <div className="featureCard">
                <span>📈</span>
                <div>
                  <h4>Powerful Trading Platform</h4>
                  <p>Trade Stocks, IPOs, F&O and Mutual Funds.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="rightSide">
          <div className="signupCard">
            <h2>Create Account</h2>

            <p>Create your TradeNest account.</p>

            <form>
              <div className="inputBox">
                <FaUser />

                <input type="text" placeholder="Full Name" />
              </div>

              <div className="inputBox">
                <FaEnvelope />

                <input type="email" placeholder="Email Address" />
              </div>

              <div className="inputBox">
                <FaPhoneAlt />

                <input type="tel" placeholder="Mobile Number" />
              </div>

              <div className="inputBox">
                <FaLock />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="strengthWrapper">
                  <div className={`strengthBar ${strength.className}`}></div>

                  <small className={strength.className}>{strength.text}</small>
                </div>

                <span
                  className="eyeIcon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ?
                    <FaEyeSlash />
                  : <FaEye />}
                </span>
              </div>

              <div className="inputBox">
                <FaLock />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                />

                <span
                  className="eyeIcon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ?
                    <FaEyeSlash />
                  : <FaEye />}
                </span>
              </div>

              <button className="createBtn">Create Account</button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="terms">
              <input type="checkbox" id="agree" />

              <label htmlFor="agree">
                I agree to the
                <a href="/"> Terms </a>&<a href="/"> Privacy Policy</a>
              </label>
            </div>

            <button className="googleBtn">
              <FaGoogle />
              Continue with Google
            </button>

            <p className="bottomText">
              Already have an account?
              <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
