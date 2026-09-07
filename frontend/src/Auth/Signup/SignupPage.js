import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
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

  /* =====================================================
     HANDLE INPUT
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* =====================================================
     PASSWORD STRENGTH
  ===================================================== */

  const getPasswordStrength = () => {
    const password = form.password;

    if (!password) {
      return {
        text: "",
        className: "",
        width: "0%",
      };
    }

    if (password.length < 6) {
      return {
        text: "Weak password",
        className: "weak",
        width: "30%",
      };
    }

    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return {
        text: "Strong password",
        className: "strong",
        width: "100%",
      };
    }

    return {
      text: "Medium password",
      className: "medium",
      width: "65%",
    };
  };

  const strength = getPasswordStrength();

  /* =====================================================
     VALIDATION
  ===================================================== */

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
      setError("Email address is required.");
      return false;
    }

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
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

  /* =====================================================
     SIGNUP
  ===================================================== */

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
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
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Signup failed.");
        return;
      }

      /* =================================================
         SAVE AUTH DATA
      ================================================= */

      localStorage.setItem("tradenest_token", data.token);

      localStorage.setItem(
        "tradenest_user",
        JSON.stringify(data.user),
      );

      setSuccess("Account created successfully!");

      /* =================================================
         REDIRECT
      ================================================= */

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Signup error:", error);

      setError(
        "Unable to connect to server. Please make sure backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <main className="signupPage">

      {/* Animated Background */}

      <div className="signupGlow signupGlowOne"></div>
      <div className="signupGlow signupGlowTwo"></div>
      <div className="signupGlow signupGlowThree"></div>

      <div className="signupCard">

        {/* ================================================
            BRAND
        ================================================= */}

        <div className="signupBrand">
          <div className="brandMark">
            TN
          </div>

          <div>
            <h1>TradeNest</h1>
            <span>Trade • Invest • Grow</span>
          </div>
        </div>

        {/* ================================================
            HEADING
        ================================================= */}

        <div className="signupHeading">
          <h2>Create your account</h2>

          <p>
            Start your investment journey with TradeNest.
          </p>
        </div>

        {/* ================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSignup}>

          {/* NAME ROW */}

          <div className="nameRow">

            <div className="modernInput">
              <FaUser />

              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                autoComplete="given-name"
              />
            </div>

            <div className="modernInput">
              <FaUser />

              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                autoComplete="family-name"
              />
            </div>

          </div>

          {/* EMAIL */}

          <div className="modernInput">
            <FaEnvelope />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          {/* PHONE */}

          <div className="modernInput">

            <FaPhoneAlt />

            <input
              type="tel"
              name="phone"
              placeholder="Mobile number (optional)"
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
              autoComplete="tel"
            />

          </div>

          {/* PASSWORD */}

          <div className="modernInput">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />

            <button
              type="button"
              className="passwordToggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          {/* PASSWORD STRENGTH */}

          {form.password && (
            <div className="passwordStrength">

              <div className="strengthTrack">
                <div
                  className={`strengthProgress ${strength.className}`}
                  style={{
                    width: strength.width,
                  }}
                ></div>
              </div>

              <span className={strength.className}>
                {strength.text}
              </span>

            </div>
          )}

          {/* CONFIRM PASSWORD */}

          <div className="modernInput">

            <FaLock />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />

            <button
              type="button"
              className="passwordToggle"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword,
                )
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          {/* PASSWORD MATCH */}

          {form.confirmPassword &&
            form.password === form.confirmPassword && (
              <div className="passwordMatch">
                <FaCheckCircle />
                Passwords match
              </div>
            )}

          {/* ERROR */}

          {error && (
            <div className="formMessage errorMessage">
              {error}
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div className="formMessage successMessage">
              <FaCheckCircle />
              {success}
            </div>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            className="signupSubmit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loader"></span>
                Creating account...
              </>
            ) : (
              <>
                Create account
                <FaArrowRight />
              </>
            )}
          </button>

        </form>

        {/* ================================================
            DIVIDER
        ================================================= */}

        <div className="signupDivider">
          <span>OR</span>
        </div>

        {/* ================================================
            GOOGLE
        ================================================= */}

        <button
          type="button"
          className="googleSignup"
        >
          <FaGoogle />
          Continue with Google
        </button>

        {/* ================================================
            LOGIN
        ================================================= */}

        <p className="loginText">
          Already have an account?
          <Link to="/login">
            Login
          </Link>
        </p>

        {/* ================================================
            FOOTER
        ================================================= */}

        <div className="signupFooter">
          By creating an account, you agree to our{" "}
          <span>Terms</span> and <span>Privacy Policy</span>.
        </div>

      </div>

    </main>
  );
}

export default SignupPage;