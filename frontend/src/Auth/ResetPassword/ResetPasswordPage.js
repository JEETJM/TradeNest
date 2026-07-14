import "./ResetPassword.css";
import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ResetPasswordPage() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters.");

      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");

      return;
    }

    alert("Password changed successfully.");

    navigate("/login");
  };

  return (
    <section className="resetPage">
      <div className="resetCard">
        <h2>Create New Password</h2>

        <p>Your new password must be different from your previous password.</p>

        {/* New Password */}

        <div className="resetInput">
          <FaLock />

          <input
            type={showNew ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <span onClick={() => setShowNew(!showNew)}>
            {showNew ?
              <FaEyeSlash />
            : <FaEye />}
          </span>
        </div>

        {/* Confirm Password */}

        <div className="resetInput">
          <FaLock />

          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <span onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ?
              <FaEyeSlash />
            : <FaEye />}
          </span>
        </div>

        <button className="resetBtn" onClick={handleReset}>
          Reset Password
        </button>
      </div>
    </section>
  );
}

export default ResetPasswordPage;
