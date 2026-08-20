import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaGoogle,
  FaEyeSlash,
} from "react-icons/fa";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setServerError(data.message || "Login failed.");
        return;
      }

      /*
       * =========================
       * SAVE AUTH DATA
       * =========================
       */

      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("tradenest_token", data.token);
      storage.setItem("tradenest_user", JSON.stringify(data.user));

      /*
       * =========================
       * REDIRECT
       * =========================
       */

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setServerError(
        "Unable to connect to server. Please make sure backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="loginPage">
      <div className="loginContainer">
        {/* ================= LEFT ================= */}

        <div className="loginLeft">
          <div className="loginLeftContent">
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

        {/* ================= RIGHT ================= */}

        <div className="loginRight">
          <div className="loginCard">
            <h2>Welcome Back</h2>

            <p>Login to your TradeNest account.</p>

            <form onSubmit={handleLogin}>
              {/* EMAIL */}

              <div className="inputBox">
                <FaEnvelope />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setServerError("");
                  }}
                />
              </div>

              {errors.email && (
                <small className="errorText">{errors.email}</small>
              )}

              {/* PASSWORD */}

              <div className="inputBox">
                <FaLock />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setServerError("");
                  }}
                />

                <span
                  className="eyeIcon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ?
                    <FaEyeSlash />
                  : <FaEye />}
                </span>
              </div>

              {errors.password && (
                <small className="errorText">{errors.password}</small>
              )}

              {/* SERVER ERROR */}

              {serverError && <div className="serverError">{serverError}</div>}

              {/* OPTIONS */}

              <div className="loginOptions">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>

                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              {/* LOGIN */}

              <button type="submit" className="loginBtn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* DIVIDER */}

            <div className="divider">
              <span>OR</span>
            </div>

            {/* GOOGLE */}

            <button className="googleBtn" type="button">
              <FaGoogle />
              Continue with Google
            </button>

            {/* SIGNUP */}

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
