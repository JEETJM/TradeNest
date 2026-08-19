import { useState } from "react";

import "./SettingsPage.css";

function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <section className="settingsPage">
      {/* Header */}

      <div className="settingsHeader">
        <div>
          <h1>Settings</h1>

          <p>Manage your TradeNest preferences.</p>
        </div>
      </div>

      {/* Preferences */}

      <div className="settingsCard">
        <div className="settingsCardHeader">
          <h2>Preferences</h2>

          <p>Customize how TradeNest works for you.</p>
        </div>

        <div className="settingsRows">
          <div className="settingsRow">
            <div>
              <strong>Push Notifications</strong>

              <p>Receive notifications about your account.</p>
            </div>

            <button
              className={notifications ? "toggle active" : "toggle"}
              onClick={() => setNotifications(!notifications)}
            >
              <span />
            </button>
          </div>

          <div className="settingsRow">
            <div>
              <strong>Email Alerts</strong>

              <p>Receive important updates through email.</p>
            </div>

            <button
              className={emailAlerts ? "toggle active" : "toggle"}
              onClick={() => setEmailAlerts(!emailAlerts)}
            >
              <span />
            </button>
          </div>

          <div className="settingsRow">
            <div>
              <strong>Order Alerts</strong>

              <p>Get notified when your orders are executed.</p>
            </div>

            <button
              className={orderAlerts ? "toggle active" : "toggle"}
              onClick={() => setOrderAlerts(!orderAlerts)}
            >
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* Appearance */}

      <div className="settingsCard">
        <div className="settingsCardHeader">
          <h2>Appearance</h2>

          <p>Choose how the dashboard looks.</p>
        </div>

        <div className="settingsRows">
          <div className="settingsRow">
            <div>
              <strong>Dark Mode</strong>

              <p>Switch between light and dark appearance.</p>
            </div>

            <button
              className={darkMode ? "toggle active" : "toggle"}
              onClick={() => setDarkMode(!darkMode)}
            >
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* Security */}

      <div className="settingsCard">
        <div className="settingsCardHeader">
          <h2>Security</h2>

          <p>Protect your TradeNest account.</p>
        </div>

        <div className="settingsRows">
          <div className="settingsRow">
            <div>
              <strong>Change Password</strong>

              <p>Update your account password.</p>
            </div>

            <button className="settingsAction">Change</button>
          </div>

          <div className="settingsRow">
            <div>
              <strong>Two-Factor Authentication</strong>

              <p>Add another layer of account protection.</p>
            </div>

            <button className="settingsAction">Enable</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SettingsPage;
