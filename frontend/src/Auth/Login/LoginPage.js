import "./Login.css";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaGoogle,
  FaEyeSlash,
} from "react-icons/fa";
import { useState } from "react";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    // Email
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      alert("Backend Login API will be connected here.");
    }, 1500);
  };
  return (
    <section className="loginPage">
      <div className="loginContainer">
        {/* LEFT */}

        <div className="loginLeft">
          <div className="loginLeftContent">
            {/* <img
              src="/Media/Images/logoSign.png"
              alt="TradeNest"
              className="loginLogo"
            /> */}

            <span>Welcome Back</span>

            <h1>TradeNest</h1>

            <h2>
              Invest.
              <br />
              Trade.
              <br />
              Grow.
            </h2>

            <p>
              Securely access your investments and continue your financial
              journey.
            </p>
          </div>
        </div>

        {/* RIGHT */}

        <div className="loginRight">
          <div className="loginCard">
            <h2>Welcome Back</h2>

            <p>Login to your TradeNest account.</p>

            <div className="inputBox">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              {errors.email && (
                <small className="errorText">{errors.email}</small>
              )}
            </div>

            <div className="inputBox">
              <FaLock />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              <span
                className="eyeIcon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ?
                  <FaEyeSlash />
                : <FaEye />}
              </span>{" "}
            </div>

            <div className="loginOptions">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />{" "}
                Remember me
              </label>

              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button className="loginBtn" onClick={handleLogin}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="divider">
              <span>OR</span>
            </div>

            <button className="googleBtn">
              <FaGoogle />
              Continue with Google
            </button>

            <div className="signupLink">
              Don't have an account?
              <Link to="/signup">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
