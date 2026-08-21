import { useEffect, useState } from "react";

import {
  FaMoon,
  FaSun,
  FaBell,
  FaEnvelope,
  FaShoppingCart,
  FaLock,
} from "react-icons/fa";

import "./SettingsPage.css";

function SettingsPage() {
  const [notifications, setNotifications] =
    useState(true);

  const [emailAlerts, setEmailAlerts] =
    useState(true);

  const [orderAlerts, setOrderAlerts] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem(
        "tradenest_dark_mode",
      ) === "true",
    );

  /* =========================
     APPLY DARK MODE
  ========================= */

  useEffect(() => {
    document.body.classList.toggle(
      "dark",
      darkMode,
    );

    localStorage.setItem(
      "tradenest_dark_mode",
      darkMode,
    );
  }, [darkMode]);

  return (
    <section className="settingsPage">

      {/* HEADER */}

      <div className="settingsHeader">

        <div>
          <h1>Settings</h1>

          <p>
            Manage your TradeNest preferences.
          </p>
        </div>

      </div>

      {/* PREFERENCES */}

      <div className="settingsCard">

        <div className="settingsCardHeader">
          <h2>Preferences</h2>

          <p>
            Customize how TradeNest works for you.
          </p>
        </div>

        <div className="settingsRows">

          <div className="settingsRow">

            <div className="settingsRowInfo">

              <div className="settingsIcon">
                <FaBell />
              </div>

              <div>
                <strong>
                  Push Notifications
                </strong>

                <p>
                  Receive notifications about your
                  account.
                </p>
              </div>

            </div>

            <button
              className={
                notifications
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                setNotifications(
                  !notifications,
                )
              }
            >
              <span />
            </button>

          </div>

          <div className="settingsRow">

            <div className="settingsRowInfo">

              <div className="settingsIcon">
                <FaEnvelope />
              </div>

              <div>
                <strong>
                  Email Alerts
                </strong>

                <p>
                  Receive important updates
                  through email.
                </p>
              </div>

            </div>

            <button
              className={
                emailAlerts
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                setEmailAlerts(
                  !emailAlerts,
                )
              }
            >
              <span />
            </button>

          </div>

          <div className="settingsRow">

            <div className="settingsRowInfo">

              <div className="settingsIcon">
                <FaShoppingCart />
              </div>

              <div>
                <strong>
                  Order Alerts
                </strong>

                <p>
                  Get notified when your orders
                  are executed.
                </p>
              </div>

            </div>

            <button
              className={
                orderAlerts
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                setOrderAlerts(
                  !orderAlerts,
                )
              }
            >
              <span />
            </button>

          </div>

        </div>

      </div>

      {/* APPEARANCE */}

      <div className="settingsCard">

        <div className="settingsCardHeader">
          <h2>Appearance</h2>

          <p>
            Customize the look of your dashboard.
          </p>
        </div>

        <div className="settingsRows">

          <div className="settingsRow">

            <div className="settingsRowInfo">

              <div className="settingsIcon">
                {darkMode ? (
                  <FaMoon />
                ) : (
                  <FaSun />
                )}
              </div>

              <div>

                <strong>
                  Dark Mode
                </strong>

                <p>
                  Apply dark mode to the entire
                  TradeNest dashboard.
                </p>

              </div>

            </div>

            <button
              className={
                darkMode
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              <span />
            </button>

          </div>

        </div>

      </div>

      {/* SECURITY */}

      <div className="settingsCard">

        <div className="settingsCardHeader">

          <h2>Security</h2>

          <p>
            Protect your TradeNest account.
          </p>

        </div>

        <div className="settingsRows">

          <div className="settingsRow">

            <div className="settingsRowInfo">

              <div className="settingsIcon">
                <FaLock />
              </div>

              <div>

                <strong>
                  Change Password
                </strong>

                <p>
                  Update your account password.
                </p>

              </div>

            </div>

            <button className="settingsAction">
              Change
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default SettingsPage;