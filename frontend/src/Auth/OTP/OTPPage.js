import "./OTP.css";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function OTPPage() {
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      alert("Please enter valid OTP");

      return;
    }

    navigate("/reset-password");
  };

  const handleChange = (value, index) => {
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split("");

      const newOtp = [...otp];

      pasted.forEach((digit, i) => {
        newOtp[i] = digit;
      });

      setOtp(newOtp);

      return;
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);

    setTimer(60);

    inputRefs.current[0].focus();
  };

  return (
    <section className="otpPage">
      <div className="otpCard">
        <h2>Email Verification</h2>

        <p>Enter the 6-digit verification code sent to your email.</p>

        <div className="otpInputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button className="verifyBtn" onClick={handleVerify}>
          Verify OTP
        </button>
        <div className="timer">
          {timer > 0 ?
            <p>
              Resend OTP in
              <strong>{timer}s</strong>
            </p>
          : <button onClick={handleResend}>Resend OTP</button>}
        </div>

        <Link className="backLogin" to="/login">
          ← Back to Login
        </Link>
      </div>
    </section>
  );
}

export default OTPPage;
