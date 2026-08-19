import { useState } from "react";

import dashboardData from "../../data/dashboard";

import "./ProfilePage.css";

function ProfilePage() {
  const profile = dashboardData.profile || {};

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(profile.name || "Jeet Mondal");

  const [email, setEmail] = useState(profile.email || "jeet@example.com");

  const [phone, setPhone] = useState(profile.phone || "+91 XXXXX XXXXX");

  const [city, setCity] = useState(profile.city || "West Bengal");

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <section className="profilePage">
      {/* ================= HEADER ================= */}

      <div className="profileHeader">
        <div>
          <h1>Profile</h1>

          <p>Manage your personal and account information.</p>
        </div>

        {!editing ?
          <button className="editProfileBtn" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        : <button className="saveProfileBtn" onClick={handleSave}>
            Save Changes
          </button>
        }
      </div>

      {/* ================= PROFILE CARD ================= */}

      <div className="profileGrid">
        {/* Personal Information */}

        <div className="profileCard">
          <div className="profileCardHeader">
            <h2>Personal Information</h2>

            <p>Your basic account information.</p>
          </div>

          <div className="profileForm">
            <div className="profileAvatar">
              {name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="profileField">
              <label>Full Name</label>

              <input
                type="text"
                value={name}
                disabled={!editing}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="profileField">
              <label>Email Address</label>

              <input
                type="email"
                value={email}
                disabled={!editing}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="profileField">
              <label>Phone Number</label>

              <input
                type="text"
                value={phone}
                disabled={!editing}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="profileField">
              <label>City</label>

              <input
                type="text"
                value={city}
                disabled={!editing}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Account Information */}

        <div className="profileCard">
          <div className="profileCardHeader">
            <h2>Account Information</h2>

            <p>Your TradeNest account details.</p>
          </div>

          <div className="accountInfo">
            <div className="accountRow">
              <span>Account Status</span>

              <strong className="activeStatus">Active</strong>
            </div>

            <div className="accountRow">
              <span>Account Type</span>

              <strong>Individual</strong>
            </div>

            <div className="accountRow">
              <span>Trading Segment</span>

              <strong>Equity</strong>
            </div>

            <div className="accountRow">
              <span>Account ID</span>

              <strong>TN-2026-001</strong>
            </div>

            <div className="accountRow">
              <span>KYC Status</span>

              <strong className="verifiedStatus">Verified</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECURITY ================= */}

      <div className="profileCard securityCard">
        <div className="profileCardHeader">
          <h2>Security</h2>

          <p>Manage your account security.</p>
        </div>

        <div className="securityRows">
          <div className="securityRow">
            <div>
              <strong>Password</strong>

              <p>Last changed recently</p>
            </div>

            <button>Change Password</button>
          </div>

          <div className="securityRow">
            <div>
              <strong>Two-Factor Authentication</strong>

              <p>Add an extra layer of security</p>
            </div>

            <button>Enable 2FA</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
