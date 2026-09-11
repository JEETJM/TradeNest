import "./Login.css";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from "react-icons/fa";

import { useState } from "react";

import {
  saveToken,
  saveUser,
} from "../auth";


function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const [serverError, setServerError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);


  /* =========================================
     VALIDATION
  ========================================= */

  const validateForm = () => {

    const newErrors = {};

    /* EMAIL */

    if (!email.trim()) {

      newErrors.email = "Email is required.";

    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        email.trim()
      )
    ) {

      newErrors.email =
        "Enter a valid email address.";

    }


    /* PASSWORD */

    if (!password) {

      newErrors.password =
        "Password is required.";

    } else if (password.length < 6) {

      newErrors.password =
        "Password must be at least 6 characters.";

    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  /* =========================================
     LOGIN
  ========================================= */

  const handleLogin = async (e) => {

    e.preventDefault();

    setServerError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok || !data.success) {

        setServerError(
          data.message ||
          "Invalid email or password."
        );

        return;
      }


      /* =====================================
         SAVE AUTH DATA
      ===================================== */

      saveToken(
        data.token,
        rememberMe
      );

      saveUser(data.user);


      /* =====================================
         GO TO DASHBOARD
      ===================================== */

      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      setServerError(
        "Unable to connect to server. Please make sure backend is running."
      );

    } finally {

      setLoading(false);

    }

  };


  /* =========================================
     UI
  ========================================= */

  return (

    <main className="loginPage">

      {/* BACK TO HOME */}

      <div className="authHomeLink">

        <Link to="/">
          ← Back to Home
        </Link>

      </div>


      {/* BACKGROUND GLOW */}

      <div className="loginGlow loginGlowOne"></div>

      <div className="loginGlow loginGlowTwo"></div>


      {/* LOGIN CARD */}

      <div className="loginCard">


        {/* =================================
            BRAND
        ================================= */}

        <div className="loginBrand">

          <div className="brandIcon">
            T
          </div>

          <div className="brandText">

            <h1>
              Trade<span>Nest</span>
            </h1>

            <p>
              Trade smarter
            </p>

          </div>

        </div>


        {/* =================================
            HEADING
        ================================= */}

        <div className="loginHeading">

          <h2>
            Welcome back
          </h2>

          <p>
            Sign in to continue to your account
          </p>

        </div>


        {/* =================================
            FORM
        ================================= */}

        <form onSubmit={handleLogin}>


          {/* EMAIL */}

          <div className="fieldGroup">

            <label htmlFor="email">
              Email address
            </label>


            <div
              className={`loginInput ${
                errors.email
                  ? "inputError"
                  : ""
              }`}
            >

              <FaEnvelope />

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                autoComplete="email"

                onChange={(e) => {

                  setEmail(
                    e.target.value
                  );

                  if (errors.email) {

                    setErrors((prev) => ({
                      ...prev,
                      email: "",
                    }));

                  }

                }}
              />

            </div>


            {errors.email && (

              <span className="errorText">
                {errors.email}
              </span>

            )}

          </div>


          {/* PASSWORD */}

          <div className="fieldGroup">


            <div className="passwordLabel">

              <label htmlFor="password">
                Password
              </label>

              <Link to="/forgot-password">
                Forgot password?
              </Link>

            </div>


            <div
              className={`loginInput ${
                errors.password
                  ? "inputError"
                  : ""
              }`}
            >

              <FaLock />

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                autoComplete="current-password"

                onChange={(e) => {

                  setPassword(
                    e.target.value
                  );

                  if (errors.password) {

                    setErrors((prev) => ({
                      ...prev,
                      password: "",
                    }));

                  }

                }}
              />


              <button
                type="button"
                className="eyeButton"

                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }

                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
              >

                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}

              </button>

            </div>


            {errors.password && (

              <span className="errorText">
                {errors.password}
              </span>

            )}

          </div>


          {/* REMEMBER ME */}

          <div className="rememberRow">

            <label className="rememberCheck">

              <input
                type="checkbox"
                checked={rememberMe}

                onChange={(e) =>
                  setRememberMe(
                    e.target.checked
                  )
                }
              />

              <span className="customCheck"></span>

              <span>
                Remember me
              </span>

            </label>

          </div>


          {/* SERVER ERROR */}

          {serverError && (

            <div className="serverError">
              {serverError}
            </div>

          )}


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="loginButton"
            disabled={loading}
          >

            {loading ? (

              <>
                <span className="loader"></span>
                Signing in...
              </>

            ) : (

              <>
                <span>
                  Sign in
                </span>

                <strong>
                  →
                </strong>
              </>

            )}

          </button>

        </form>


        {/* =================================
            DIVIDER
        ================================= */}

        <div className="orDivider">

          <span></span>

          <p>
            OR
          </p>

          <span></span>

        </div>


        {/* =================================
            GOOGLE
        ================================= */}

        <button
          type="button"
          className="googleButton"

          onClick={() => {

            console.log(
              "Google login will be connected later."
            );

          }}
        >

          <FaGoogle />

          <span>
            Continue with Google
          </span>

        </button>


        {/* =================================
            SIGNUP
        ================================= */}

        <div className="createAccount">

          <span>
            Don't have an account?
          </span>

          <Link to="/signup">
            Create account
          </Link>

        </div>


        {/* =================================
            SECURITY
        ================================= */}

        <div className="secureText">

          <span className="secureDot">
            ●
          </span>

          Secure & encrypted connection

        </div>


      </div>

    </main>

  );

}

export default LoginPage;