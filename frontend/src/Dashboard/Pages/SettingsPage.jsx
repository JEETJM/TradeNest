import React, { useEffect, useState } from "react";
import {
  FaCog,
  FaBell,
  FaEnvelope,
  FaShoppingCart,
  FaMoon,
  FaSun,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaKey,
  FaCheckCircle,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import "./SettingsPage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const getToken = () =>
  localStorage.getItem("tradenest_token") ||
  sessionStorage.getItem("tradenest_token") ||
  localStorage.getItem("token") ||
  sessionStorage.getItem("token");

const getBooleanSetting = (key, defaultValue = true) => {
  const value = localStorage.getItem(key);

  if (value === null) return defaultValue;

  return value === "true";
};

function SettingsPage() {
  const [notifications, setNotifications] = useState(() =>
    getBooleanSetting("tradenest_notifications", true),
  );

  const [emailAlerts, setEmailAlerts] = useState(() =>
    getBooleanSetting("tradenest_email_alerts", true),
  );

  const [orderAlerts, setOrderAlerts] = useState(() =>
    getBooleanSetting("tradenest_order_alerts", true),
  );

  const [darkMode, setDarkMode] = useState(() =>
    getBooleanSetting("tradenest_dark_mode", false),
  );

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changingPassword, setChangingPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [savedMessage, setSavedMessage] = useState("");

  /* ---------------- SETTINGS HELPERS ---------------- */

  const saveSetting = (key, value) => {
    localStorage.setItem(key, String(value));

    setSavedMessage("Settings saved successfully.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2200);
  };

  const handleNotifications = () => {
    const value = !notifications;

    setNotifications(value);
    saveSetting("tradenest_notifications", value);
  };

  const handleEmailAlerts = () => {
    const value = !emailAlerts;

    setEmailAlerts(value);
    saveSetting("tradenest_email_alerts", value);
  };

  const handleOrderAlerts = () => {
    const value = !orderAlerts;

    setOrderAlerts(value);
    saveSetting("tradenest_order_alerts", value);
  };

  /* ---------------- DARK MODE ---------------- */

  const handleDarkMode = () => {
    const value = !darkMode;

    setDarkMode(value);

    localStorage.setItem("tradenest_dark_mode", String(value));

    document.documentElement.classList.toggle("dark", value);

    window.dispatchEvent(
      new CustomEvent("tradenest-theme-update", {
        detail: {
          darkMode: value,
        },
      }),
    );

    setSavedMessage(value ? "Dark mode enabled." : "Light mode enabled.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2200);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  /* ---------------- PASSWORD ---------------- */

  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setPasswordSuccess("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const openPasswordModal = () => {
    resetPasswordForm();
    setShowPasswordModal(true);
  };

  const closePasswordModal = () => {
    if (changingPassword) return;

    setShowPasswordModal(false);
    resetPasswordForm();
  };

  const validatePassword = () => {
    if (!currentPassword) {
      return "Please enter your current password.";
    }

    if (!newPassword) {
      return "Please enter a new password.";
    }

    if (newPassword.length < 8) {
      return "New password must contain at least 8 characters.";
    }

    if (newPassword === currentPassword) {
      return "New password must be different from your current password.";
    }

    if (!confirmPassword) {
      return "Please confirm your new password.";
    }

    if (newPassword !== confirmPassword) {
      return "New password and confirm password do not match.";
    }

    return "";
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const validationError = validatePassword();

    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    const token = getToken();

    if (!token) {
      setPasswordError("Your session has expired. Please login again.");
      return;
    }

    try {
      setChangingPassword(true);
      setPasswordError("");
      setPasswordSuccess("");

      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const raw = await response.text();

      let data = {};

      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error("Invalid response received from server.");
      }

      if (!response.ok) {
        throw new Error(data?.message || "Failed to change your password.");
      }

      setPasswordSuccess(data?.message || "Password changed successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess("");
      }, 1800);
    } catch (error) {
      console.error("Change password error:", error);

      setPasswordError(error.message || "Unable to change password.");
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="settingsPage">
      {/* HEADER */}

      <div className="settingsHeader">
        <div>
          <div className="settingsEyebrow">
            <FaCog />
            PREFERENCES
          </div>

          <h1>Settings</h1>

          <p>
            Manage your TradeNest preferences, notifications and account
            security.
          </p>
        </div>
      </div>

      {/* SAVE MESSAGE */}

      {savedMessage && (
        <div className="settingsSavedMessage">
          <FaCheckCircle />
          <span>{savedMessage}</span>
        </div>
      )}

      <div className="settingsGrid">
        {/* NOTIFICATIONS */}

        <section className="settingsCard">
          <div className="settingsCardHeader">
            <div className="settingsIcon blue">
              <FaBell />
            </div>

            <div>
              <h2>Notifications</h2>
              <p>Control how TradeNest keeps you updated.</p>
            </div>
          </div>

          <div className="settingsList">
            <div className="settingsRow">
              <div className="settingsRowInfo">
                <div className="settingsRowIcon">
                  <FaBell />
                </div>

                <div>
                  <strong>Push Notifications</strong>
                  <span>Receive important updates inside TradeNest.</span>
                </div>
              </div>

              <button
                type="button"
                className={`settingsToggle ${notifications ? "active" : ""}`}
                onClick={handleNotifications}
                aria-label="Toggle notifications"
              >
                <span />
              </button>
            </div>

            <div className="settingsRow">
              <div className="settingsRowInfo">
                <div className="settingsRowIcon">
                  <FaEnvelope />
                </div>

                <div>
                  <strong>Email Alerts</strong>
                  <span>Receive important account and market alerts.</span>
                </div>
              </div>

              <button
                type="button"
                className={`settingsToggle ${emailAlerts ? "active" : ""}`}
                onClick={handleEmailAlerts}
                aria-label="Toggle email alerts"
              >
                <span />
              </button>
            </div>

            <div className="settingsRow">
              <div className="settingsRowInfo">
                <div className="settingsRowIcon">
                  <FaShoppingCart />
                </div>

                <div>
                  <strong>Order Alerts</strong>
                  <span>Get notified when your orders are executed.</span>
                </div>
              </div>

              <button
                type="button"
                className={`settingsToggle ${orderAlerts ? "active" : ""}`}
                onClick={handleOrderAlerts}
                aria-label="Toggle order alerts"
              >
                <span />
              </button>
            </div>
          </div>
        </section>

        {/* APPEARANCE */}

        <section className="settingsCard">
          <div className="settingsCardHeader">
            <div className="settingsIcon purple">
              {darkMode ?
                <FaMoon />
              : <FaSun />}
            </div>

            <div>
              <h2>Appearance</h2>
              <p>Customize how TradeNest looks on your device.</p>
            </div>
          </div>

          <div className="settingsList">
            <div className="settingsRow">
              <div className="settingsRowInfo">
                <div className="settingsRowIcon">
                  {darkMode ?
                    <FaMoon />
                  : <FaSun />}
                </div>

                <div>
                  <strong>Dark Mode</strong>
                  <span>
                    {darkMode ?
                      "Use the dark TradeNest interface."
                    : "Use the light TradeNest interface."}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className={`settingsToggle ${darkMode ? "active" : ""}`}
                onClick={handleDarkMode}
                aria-label="Toggle dark mode"
              >
                <span />
              </button>
            </div>
          </div>
        </section>

        {/* SECURITY */}

        <section className="settingsCard">
          <div className="settingsCardHeader">
            <div className="settingsIcon green">
              <FaShieldAlt />
            </div>

            <div>
              <h2>Security</h2>
              <p>Keep your TradeNest account secure.</p>
            </div>
          </div>

          <div className="settingsSecurityBox">
            <div className="settingsSecurityIcon">
              <FaKey />
            </div>

            <div className="settingsSecurityInfo">
              <strong>Password</strong>

              <span>
                Change your account password regularly for better security.
              </span>
            </div>

            <button
              type="button"
              className="settingsActionBtn"
              onClick={openPasswordModal}
            >
              <FaLock />
              Change Password
            </button>
          </div>
        </section>

        {/* ACCOUNT SECURITY STATUS */}

        <section className="settingsCard">
          <div className="settingsCardHeader">
            <div className="settingsIcon orange">
              <FaShieldAlt />
            </div>

            <div>
              <h2>Account Protection</h2>
              <p>Current security information for your account.</p>
            </div>
          </div>

          <div className="settingsProtection">
            <div className="settingsProtectionRow">
              <div>
                <strong>Password Protection</strong>
                <span>Your account uses password authentication.</span>
              </div>

              <div className="settingsProtectionStatus">
                <FaCheckCircle />
                Active
              </div>
            </div>

            <div className="settingsProtectionRow">
              <div>
                <strong>Session Security</strong>
                <span>
                  Authenticated requests use your secure session token.
                </span>
              </div>

              <div className="settingsProtectionStatus">
                <FaCheckCircle />
                Active
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* PASSWORD MODAL */}

      {showPasswordModal && (
        <div
          className="settingsModalOverlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !changingPassword) {
              closePasswordModal();
            }
          }}
        >
          <div className="settingsModal">
            <div className="settingsModalHeader">
              <div>
                <div className="settingsModalIcon">
                  <FaLock />
                </div>

                <h2>Change Password</h2>

                <p>Create a new password for your TradeNest account.</p>
              </div>

              <button
                type="button"
                className="settingsModalClose"
                onClick={closePasswordModal}
                disabled={changingPassword}
              >
                <FaTimes />
              </button>
            </div>

            {passwordError && (
              <div className="settingsPasswordMessage error">
                <FaTimes />
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="settingsPasswordMessage success">
                <FaCheckCircle />
                {passwordSuccess}
              </div>
            )}

            <form
              className="settingsPasswordForm"
              onSubmit={handleChangePassword}
            >
              <div className="settingsPasswordField">
                <label htmlFor="currentPassword">Current Password</label>

                <div className="settingsPasswordInput">
                  <FaLock />

                  <input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      setPasswordError("");
                    }}
                    autoComplete="current-password"
                    disabled={changingPassword}
                    placeholder="Enter current password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((value) => !value)}
                    tabIndex={-1}
                  >
                    {showCurrentPassword ?
                      <FaEyeSlash />
                    : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="settingsPasswordField">
                <label htmlFor="newPassword">New Password</label>

                <div className="settingsPasswordInput">
                  <FaKey />

                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordError("");
                    }}
                    autoComplete="new-password"
                    disabled={changingPassword}
                    placeholder="Minimum 8 characters"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword((value) => !value)}
                    tabIndex={-1}
                  >
                    {showNewPassword ?
                      <FaEyeSlash />
                    : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="settingsPasswordField">
                <label htmlFor="confirmPassword">Confirm New Password</label>

                <div className="settingsPasswordInput">
                  <FaKey />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordError("");
                    }}
                    autoComplete="new-password"
                    disabled={changingPassword}
                    placeholder="Re-enter new password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ?
                      <FaEyeSlash />
                    : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="settingsPasswordHint">
                <FaShieldAlt />

                <span>
                  Use at least 8 characters and avoid using easily guessable
                  information.
                </span>
              </div>

              <div className="settingsModalActions">
                <button
                  type="button"
                  className="settingsModalCancel"
                  onClick={closePasswordModal}
                  disabled={changingPassword}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="settingsModalSubmit"
                  disabled={changingPassword}
                >
                  {changingPassword ?
                    <>
                      <FaSpinner className="settingsSpin" />
                      Updating...
                    </>
                  : <>
                      <FaLock />
                      Update Password
                    </>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
