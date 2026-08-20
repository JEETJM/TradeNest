import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaLock } from "react-icons/fa";

import "./OTP.css";

function OTPPage() {
  const navigate = useNavigate();

  /* =====================================================
     STATE
  ===================================================== */

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [timer, setTimer] = useState(60);

  const inputRefs = useRef([]);

  /* =====================================================
     EMAIL
  ===================================================== */

  const email = localStorage.getItem("tradenest_reset_email");

  /* =====================================================
     CHECK EMAIL
  ===================================================== */

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", {
        replace: true,
      });
    }
  }, [email, navigate]);

  /* =====================================================
     TIMER
  ===================================================== */

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* =====================================================
     OTP INPUT
  ===================================================== */

  const handleChange = (value, index) => {
    /*
      Only allow numbers
    */

    if (!/^\d?$/.test(value)) {
      return;
    }

    const updatedOTP = [...otp];

    updatedOTP[index] = value;

    setOtp(updatedOTP);

    setError("");
    setSuccess("");

    /*
      Move to next input
    */

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* =====================================================
     BACKSPACE
  ===================================================== */

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* =====================================================
     PASTE OTP
  ===================================================== */

  const handlePaste = (event) => {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const updatedOTP = ["", "", "", "", "", ""];

    pasted.split("").forEach((number, index) => {
      updatedOTP[index] = number;
    });

    setOtp(updatedOTP);

    setError("");
    setSuccess("");

    /*
      Focus last entered digit
    */

    const focusIndex = Math.min(pasted.length, 5);

    inputRefs.current[focusIndex]?.focus();
  };

  /* =====================================================
     VERIFY OTP
  ===================================================== */

  const handleVerify = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const otpValue = otp.join("");

    /* ---------- Validate OTP ---------- */

    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");

      return;
    }

    /* ---------- Check email ---------- */

    if (!email) {
      setError("Email not found. Please request a new OTP.");

      return;
    }

    setLoading(true);

    try {
      /* =================================================
         CALL BACKEND
      ================================================= */

      const response = await fetch(
        "http://localhost:5000/api/auth/verify-reset-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            otp: otpValue,
          }),
        },
      );

      /* =================================================
         READ RESPONSE
      ================================================= */

      const data = await response.json();

      console.log("Verify OTP response:", data);

      /* =================================================
         HANDLE BACKEND ERROR
      ================================================= */

      if (!response.ok || !data.success) {
        setError(data.message || "Invalid or expired OTP.");

        return;
      }

      /* =================================================
         OTP VERIFIED
      ================================================= */

      setSuccess("OTP verified successfully.");

      /*
        Store verified OTP temporarily.

        ResetPasswordPage will use this OTP
        to change the password.
      */

      localStorage.setItem("tradenest_verified_otp", otpValue);

      /* =================================================
         GO TO RESET PASSWORD
      ================================================= */

      setTimeout(() => {
        navigate("/reset-password");
      }, 800);
    } catch (error) {
      console.error("OTP verification error:", error);

      setError(
        "Unable to connect to TradeNest server. Please make sure the backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     RESEND OTP
  ===================================================== */

  const handleResend = async () => {
    /*
      Don't allow resend while timer is running
    */

    if (timer > 0 || resending) {
      return;
    }

    setError("");
    setSuccess("");

    /* ---------- Check email ---------- */

    if (!email) {
      setError("Email not found. Please go back and enter your email.");

      return;
    }

    setResending(true);

    try {
      /* =================================================
         REQUEST NEW OTP
      ================================================= */

      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      console.log("Resend OTP response:", data);

      /* =================================================
         HANDLE ERROR
      ================================================= */

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to resend OTP.");

        return;
      }

      /* =================================================
         RESET OTP INPUTS
      ================================================= */

      setOtp(["", "", "", "", "", ""]);

      /* =================================================
         IMPORTANT
         Backend does NOT return OTP.
         OTP is sent securely through Gmail.
      ================================================= */

      setTimer(60);

      setSuccess("New OTP sent successfully. Please check your email.");

      /* ---------- Focus first input ---------- */

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (error) {
      console.error("Resend OTP error:", error);

      setError(
        "Unable to connect to TradeNest server. Please make sure the backend is running.",
      );
    } finally {
      setResending(false);
    }
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section className="otpPage">
      <div className="otpContainer">
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="otpLeft">
          <div className="otpLeftContent">
            <div className="otpSecurityIcon">
              <FaLock />
            </div>

            <span>Secure Verification</span>

            <h1>
              Verify
              <br />
              Your Identity
            </h1>

            <p>
              We sent a 6-digit verification code to your registered email
              address.
            </p>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="otpRight">
          <div className="otpCard">
            {/* ---------- ICON ---------- */}

            <div className="otpSuccessIcon">
              <FaCheckCircle />
            </div>

            {/* ---------- TITLE ---------- */}

            <h2>Enter OTP</h2>

            <p className="otpSubtitle">Enter the verification code sent to</p>

            <strong className="otpEmail">{email}</strong>

            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleVerify}>
              {/* ---------- OTP INPUTS ---------- */}

              <div className="otpInputs" onPaste={handlePaste}>
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={value}
                    onChange={(event) =>
                      handleChange(event.target.value, index)
                    }
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    autoFocus={index === 0}
                    disabled={loading}
                  />
                ))}
              </div>

              {/* =================================================
                  ERROR
              ================================================= */}

              {error && <div className="otpError">{error}</div>}

              {/* =================================================
                  SUCCESS
              ================================================= */}

              {success && <div className="otpSuccess">{success}</div>}

              {/* =================================================
                  VERIFY BUTTON
              ================================================= */}

              <button type="submit" className="verifyOtpBtn" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            {/* =================================================
                RESEND
            ================================================= */}

            <div className="resendSection">
              {timer > 0 ?
                <p>
                  Resend OTP in <strong>{timer}s</strong>
                </p>
              : <button
                  type="button"
                  className="resendBtn"
                  onClick={handleResend}
                  disabled={resending}
                >
                  {resending ? "Sending..." : "Resend OTP"}
                </button>
              }
            </div>

            {/* =================================================
                CHANGE EMAIL
            ================================================= */}

            <Link to="/forgot-password" className="backForgot">
              <FaArrowLeft />
              Change Email
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OTPPage;
