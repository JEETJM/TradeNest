import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

function ForgotPasswordPage() {
  return (
    <section className="forgotPage">
      <div className="forgotCard">
        <h2>Forgot Password?</h2>

        <p>
          Enter your registered email address and we'll send you a verification
          code to reset your password.
        </p>

        <div className="inputGroup">
          <FaEnvelope className="inputIcon" />

          <input type="email" placeholder="Enter your email address" />
        </div>

        <button className="forgotBtn">Send OTP</button>

        <div className="backLogin">
          Remember your password? <Link to="/login">Login</Link>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;
