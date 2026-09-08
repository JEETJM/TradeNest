import { useEffect, useState } from "react";

import {
  FaMoon,
  FaSun,
  FaBell,
  FaEnvelope,
  FaShoppingCart,
  FaLock,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";

import "./SettingsPage.css";

/* =====================================================
   SETTINGS PAGE
===================================================== */

function SettingsPage() {
  /* =====================================================
     SETTINGS STORAGE
  ===================================================== */

  const getSetting = (key, defaultValue) => {
    const saved = localStorage.getItem(key);

    if (saved === null) {
      return defaultValue;
    }

    return saved === "true";
  };

  /* =====================================================
     SETTINGS STATE
  ===================================================== */

  const [notifications, setNotifications] = useState(() =>
    getSetting("tradenest_notifications", true),
  );

  const [emailAlerts, setEmailAlerts] = useState(() =>
    getSetting("tradenest_email_alerts", true),
  );

  const [orderAlerts, setOrderAlerts] = useState(() =>
    getSetting("tradenest_order_alerts", true),
  );

  const [darkMode, setDarkMode] = useState(() =>
    getSetting("tradenest_dark_mode", false),
  );

  /* =====================================================
     PASSWORD MODAL STATE
  ===================================================== */

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordSaving, setPasswordSaving] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const [passwordSuccess, setPasswordSuccess] = useState("");

  /* =====================================================
     GLOBAL DARK MODE
  ===================================================== */

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("tradenest_dark_mode", String(darkMode));

    /* Tell other components theme changed */
    window.dispatchEvent(new Event("tradenest-theme-update"));
  }, [darkMode]);

  /* =====================================================
     PUSH NOTIFICATIONS
  ===================================================== */

  const toggleNotifications = () => {
    const value = !notifications;

    setNotifications(value);

    localStorage.setItem("tradenest_notifications", String(value));
  };

  /* =====================================================
     EMAIL ALERTS
  ===================================================== */

  const toggleEmailAlerts = () => {
    const value = !emailAlerts;

    setEmailAlerts(value);

    localStorage.setItem("tradenest_email_alerts", String(value));
  };

  /* =====================================================
     ORDER ALERTS
  ===================================================== */

  const toggleOrderAlerts = () => {
    const value = !orderAlerts;

    setOrderAlerts(value);

    localStorage.setItem("tradenest_order_alerts", String(value));
  };

  /* =====================================================
     OPEN PASSWORD MODAL
  ===================================================== */

  const openPasswordModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);

    setPasswordError("");
    setPasswordSuccess("");

    setShowPasswordModal(true);
  };

  /* =====================================================
     CLOSE PASSWORD MODAL
  ===================================================== */

  const closePasswordModal = () => {
    if (passwordSaving) {
      return;
    }

    setShowPasswordModal(false);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setPasswordError("");
    setPasswordSuccess("");
  };

  /* =====================================================
     CHANGE PASSWORD
  ===================================================== */

  const handlePasswordChange = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    /* ================================
       VALIDATION
    ================================= */

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }

    if (!newPassword) {
      setPasswordError("Please enter your new password.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must contain at least 8 characters.");
      return;
    }

    if (newPassword === currentPassword) {
      setPasswordError(
        "New password must be different from your current password.",
      );
      return;
    }

    if (!confirmPassword) {
      setPasswordError("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    /* ================================
       GET TOKEN
    ================================= */

    const token =
      localStorage.getItem("tradenest_token") ||
      sessionStorage.getItem("tradenest_token") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token) {
      setPasswordError("Your session has expired. Please login again.");
      return;
    }

    try {
      setPasswordSaving(true);

      /* ================================
         API REQUEST
      ================================= */

      const response = await fetch(
        "http://localhost:5000/api/auth/change-password",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        },
      );

      /* ================================
         READ RESPONSE
      ================================= */

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("❌ Change password invalid response:", text);

        throw new Error("Server returned an invalid response.");
      }

      /* ================================
         API ERROR
      ================================= */

      if (!response.ok) {
        throw new Error(data.message || "Unable to change password.");
      }

      /* ================================
         SUCCESS
      ================================= */

      setPasswordSuccess("Password changed successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess("");
      }, 1800);
    } catch (error) {
      console.error("❌ CHANGE PASSWORD ERROR:", error);

      setPasswordError(error.message || "Unable to change password.");
    } finally {
      setPasswordSaving(false);
    }
  };

  /* =====================================================
     JSX
  ===================================================== */

  return (
    <section className="settingsPage">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="settingsHeader">
        <h1>Settings</h1>

        <p>Manage your TradeNest preferences and account security.</p>
      </div>

      {/* =================================================
          PREFERENCES
      ================================================= */}

      <div className="settingsCard">
        <div className="settingsCardHeader">
          <h2>Preferences</h2>

          <p>Customize how TradeNest works for you.</p>
        </div>

        <div className="settingsRows">
          {/* PUSH NOTIFICATIONS */}

          <div className="settingsRow">
            <div className="settingsRowInfo">
              <div className="settingsIcon">
                <FaBell />
              </div>

              <div>
                <strong>Push Notifications</strong>

                <p>Receive notifications about your account.</p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Toggle push notifications"
              className={notifications ? "toggle active" : "toggle"}
              onClick={toggleNotifications}
            >
              <span />
            </button>
          </div>

          {/* EMAIL ALERTS */}

          <div className="settingsRow">
            <div className="settingsRowInfo">
              <div className="settingsIcon">
                <FaEnvelope />
              </div>

              <div>
                <strong>Email Alerts</strong>

                <p>Receive important updates through email.</p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Toggle email alerts"
              className={emailAlerts ? "toggle active" : "toggle"}
              onClick={toggleEmailAlerts}
            >
              <span />
            </button>
          </div>

          {/* ORDER ALERTS */}

          <div className="settingsRow">
            <div className="settingsRowInfo">
              <div className="settingsIcon">
                <FaShoppingCart />
              </div>

              <div>
                <strong>Order Alerts</strong>

                <p>Get notified when your orders are executed.</p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Toggle order alerts"
              className={orderAlerts ? "toggle active" : "toggle"}
              onClick={toggleOrderAlerts}
            >
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
          APPEARANCE
      ================================================= */}

      <div className="settingsCard">
        <div className="settingsCardHeader">
          <h2>Appearance</h2>

          <p>Customize the look of your dashboard.</p>
        </div>

        <div className="settingsRows">
          <div className="settingsRow">
            <div className="settingsRowInfo">
              <div className="settingsIcon">
                {darkMode ?
                  <FaMoon />
                : <FaSun />}
              </div>

              <div>
                <strong>Dark Mode</strong>

                <p>Apply dark mode to the entire TradeNest platform.</p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Toggle dark mode"
              className={darkMode ? "toggle active" : "toggle"}
              onClick={() => setDarkMode((previous) => !previous)}
            >
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
          SECURITY
      ================================================= */}

      <div className="settingsCard">
        <div className="settingsCardHeader">
          <h2>Security</h2>

          <p>Protect your TradeNest account.</p>
        </div>

        <div className="settingsRows">
          <div className="settingsRow">
            <div className="settingsRowInfo">
              <div className="settingsIcon">
                <FaLock />
              </div>

              <div>
                <strong>Change Password</strong>

                <p>Update your account password.</p>
              </div>
            </div>

            <button
              type="button"
              className="settingsAction"
              onClick={openPasswordModal}
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
          PASSWORD MODAL
      ================================================= */}

      {showPasswordModal && (
        <div
          className="passwordModalOverlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePasswordModal();
            }
          }}
        >
          <div className="passwordModal">
            {/* MODAL HEADER */}

            <div className="passwordModalHeader">
              <div>
                <h2>Change Password</h2>

                <p>Keep your TradeNest account secure.</p>
              </div>

              <button
                type="button"
                className="passwordModalClose"
                onClick={closePasswordModal}
                disabled={passwordSaving}
              >
                <FaTimes />
              </button>
            </div>

            {/* ERROR */}

            {passwordError && (
              <div className="passwordError">{passwordError}</div>
            )}

            {/* SUCCESS */}

            {passwordSuccess && (
              <div className="passwordSuccess">
                <FaCheckCircle />

                <span>{passwordSuccess}</span>
              </div>
            )}

            {/* FORM */}

            {!passwordSuccess && (
              <div className="passwordForm">
                {/* CURRENT PASSWORD */}

                <div className="passwordField">
                  <label>Current Password</label>

                  <div className="passwordInput">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(event) =>
                        setCurrentPassword(event.target.value)
                      }
                      placeholder="Enter current password"
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword((previous) => !previous)
                      }
                    >
                      {showCurrentPassword ?
                        <FaEyeSlash />
                      : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* NEW PASSWORD */}

                <div className="passwordField">
                  <label>New Password</label>

                  <div className="passwordInput">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword((previous) => !previous)
                      }
                    >
                      {showNewPassword ?
                        <FaEyeSlash />
                      : <FaEye />}
                    </button>
                  </div>

                  <small>Minimum 8 characters.</small>
                </div>

                {/* CONFIRM PASSWORD */}

                <div className="passwordField">
                  <label>Confirm New Password</label>

                  <div className="passwordInput">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((previous) => !previous)
                      }
                    >
                      {showConfirmPassword ?
                        <FaEyeSlash />
                      : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="passwordModalActions">
                  <button
                    type="button"
                    className="passwordCancelBtn"
                    onClick={closePasswordModal}
                    disabled={passwordSaving}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="passwordSaveBtn"
                    onClick={handlePasswordChange}
                    disabled={passwordSaving}
                  >
                    {passwordSaving ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default SettingsPage;
