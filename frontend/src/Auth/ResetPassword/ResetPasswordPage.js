import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";

import "./ResetPassword.css";

function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const email = localStorage.getItem(
    "tradenest_reset_email",
  );

  const otp = localStorage.getItem(
    "tradenest_verified_otp",
  );

  /* =========================
     CHECK RESET SESSION
  ========================= */

  useEffect(() => {
    if (!email || !otp) {
      navigate("/forgot-password", {
        replace: true,
      });
    }
  }, [email, otp, navigate]);

  /* =========================
     PASSWORD STRENGTH
  ========================= */

  const getStrength = () => {
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
      /[a-z]/.test(password) &&
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

  const strength = getStrength();

  /* =========================
     RESET PASSWORD
  ========================= */

  const handleReset = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!password) {
      setError("Please enter a new password.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            otp,
            newPassword: password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Unable to reset password.",
        );

        return;
      }

      setSuccess(
        "Password reset successfully!",
      );

      /* Clear reset data */

      localStorage.removeItem(
        "tradenest_reset_email",
      );

      localStorage.removeItem(
        "tradenest_reset_otp",
      );

      localStorage.removeItem(
        "tradenest_verified_otp",
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(
        "Reset password error:",
        error,
      );

      setError(
        "Unable to connect to TradeNest server.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="resetPage">

      <div className="resetContainer">

        {/* =========================
            LEFT
        ========================= */}

        <div className="resetLeft">

          <div className="resetLeftContent">

            <div className="resetIcon">
              <FaCheckCircle />
            </div>

            <span>Password Recovery</span>

            <h1>
              Create
              <br />
              New Password
            </h1>

            <p>
              Choose a strong password to keep
              your TradeNest account secure.
            </p>

          </div>

        </div>

        {/* =========================
            RIGHT
        ========================= */}

        <div className="resetRight">

          <div className="resetCard">

            <h2>Reset Password</h2>

            <p className="resetSubtitle">
              Create a new password for
            </p>

            <strong className="resetEmail">
              {email}
            </strong>

            <form onSubmit={handleReset}>

              {/* PASSWORD */}

              <div className="resetInput">

                <FaLock />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="New Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(
                      event.target.value,
                    );

                    setError("");
                    setSuccess("");
                  }}
                />

                <button
                  type="button"
                  className="passwordEye"
                  onClick={() =>
                    setShowPassword(
                      !showPassword,
                    )
                  }
                >
                  {showPassword ?
                    <FaEyeSlash />
                  : <FaEye />}
                </button>

              </div>

              {/* STRENGTH */}

              {password && (
                <div className="passwordStrength">

                  <div
                    className={`strengthLine ${strength.className}`}
                  ></div>

                  <small
                    className={
                      strength.className
                    }
                  >
                    {strength.text}
                  </small>

                </div>
              )}

              {/* CONFIRM */}

              <div className="resetInput">

                <FaLock />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(
                      event.target.value,
                    );

                    setError("");
                    setSuccess("");
                  }}
                />

                <button
                  type="button"
                  className="passwordEye"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword,
                    )
                  }
                >
                  {showConfirmPassword ?
                    <FaEyeSlash />
                  : <FaEye />}
                </button>

              </div>

              {/* ERROR */}

              {error && (
                <div className="resetError">
                  {error}
                </div>
              )}

              {/* SUCCESS */}

              {success && (
                <div className="resetSuccess">
                  {success}
                </div>
              )}

              {/* BUTTON */}

              <button
                type="submit"
                className="resetBtn"
                disabled={loading}
              >
                {loading ?
                  "Updating Password..."
                : "Reset Password"}
              </button>

            </form>

            <Link
              to="/login"
              className="resetLogin"
            >
              Back to Login
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ResetPasswordPage;