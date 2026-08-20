import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaEnvelope, FaArrowLeft, FaPaperPlane } from "react-icons/fa";

import "./ForgotPassword.css";

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to process request.");

        return;
      }

      /*
        Development OTP.

        Later email service connect হলে
        এটা remove করে দেব।
      */

      localStorage.setItem("tradenest_reset_email", email.trim());

      localStorage.setItem("tradenest_reset_otp", data.otp);

      setSuccess(`OTP sent successfully. Development OTP: ${data.otp}`);

      setTimeout(() => {
        navigate("/otp");
      }, 1200);
    } catch (error) {
      console.error("Forgot password error:", error);

      setError("Unable to connect to TradeNest server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="forgotPage">
      <div className="forgotContainer">
        {/* LEFT */}

        <div className="forgotLeft">
          <div className="forgotLeftContent">
            <span>TradeNest Security</span>

            <h1>
              Forgot
              <br />
              Password?
            </h1>

            <p>
              Don't worry. Enter your registered email address and we'll help
              you reset your password securely.
            </p>
          </div>
        </div>

        {/* RIGHT */}

        <div className="forgotRight">
          <div className="forgotCard">
            <div className="forgotIcon">
              <FaEnvelope />
            </div>

            <h2>Reset your password</h2>

            <p className="forgotSubtitle">
              Enter the email address associated with your TradeNest account.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="forgotInput">
                <FaEnvelope />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    setError("");
                    setSuccess("");
                  }}
                />
              </div>

              {error && <div className="forgotError">{error}</div>}

              {success && <div className="forgotSuccess">{success}</div>}

              <button type="submit" className="forgotBtn" disabled={loading}>
                {loading ?
                  "Sending..."
                : <>
                    Send OTP
                    <FaPaperPlane />
                  </>
                }
              </button>
            </form>

            <Link to="/login" className="backLogin">
              <FaArrowLeft />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;
