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
import { useNavigate, Link } from "react-router-dom";

import "./Signup.css";

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const getPasswordStrength = () => {
    const password = form.password;

    if (!password) {
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

  const validateForm = () => {
    if (!form.firstName.trim()) {
      setError("First name is required.");
      return false;
    }

    if (!form.lastName.trim()) {
      setError("Last name is required.");
      return false;
    }

    if (!form.email.trim()) {
      setError("Email is required.");
      return false;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return false;
    }

    if (!form.password) {
      setError("Password is required.");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          password: form.password,
          phone: form.phone.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Signup failed.");
        return;
      }

      /*
       * =========================
       * SAVE AUTH DATA
       * =========================
       */

      localStorage.setItem("tradenest_token", data.token);

      localStorage.setItem("tradenest_user", JSON.stringify(data.user));

      setSuccess("Account created successfully!");

      /*
       * =========================
       * REDIRECT
       * =========================
       */

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      console.error("Signup error:", error);

      setError(
        "Unable to connect to server. Please make sure backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signupPage">
      <div className="signupContainer">
        {/* ================= LEFT ================= */}

        <div className="leftSide">
          <div className="leftContent">
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

        {/* ================= RIGHT ================= */}

        <div className="rightSide">
          <div className="signupCard">
            <h2>Create Account</h2>

            <p>Create your TradeNest account.</p>

            <form onSubmit={handleSignup}>
              {/* FIRST NAME */}

              <div className="inputBox">
                <FaUser />

                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>

              {/* LAST NAME */}

              <div className="inputBox">
                <FaUser />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>

              {/* EMAIL */}

              <div className="inputBox">
                <FaEnvelope />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              {/* PHONE */}

              <div className="inputBox">
                <FaPhoneAlt />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    setForm((prev) => ({
                      ...prev,
                      phone: value,
                    }));

                    setError("");
                    setSuccess("");
                  }}
                />
              </div>

              {/* PASSWORD */}

              <div className="inputBox">
                <FaLock />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
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

              {/* PASSWORD STRENGTH */}

              {form.password && (
                <div className="strengthWrapper">
                  <div className={`strengthBar ${strength.className}`}></div>

                  <small className={strength.className}>{strength.text}</small>
                </div>
              )}

              {/* CONFIRM PASSWORD */}

              <div className="inputBox">
                <FaLock />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
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

              {/* ERROR */}

              {error && <div className="signupError">{error}</div>}

              {/* SUCCESS */}

              {success && <div className="signupSuccess">{success}</div>}

              {/* CREATE ACCOUNT */}

              <button type="submit" className="createBtn" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
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

            {/* LOGIN */}

            <p className="bottomText">
              Already have an account?
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
