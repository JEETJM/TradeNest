import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBell,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
  FaCog,
} from "react-icons/fa";

import "./Topbar.css";

import { fetchCurrentUser, getStoredUser, logout } from "../../Auth/auth";

function Topbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(getStoredUser());
  const [showMenu, setShowMenu] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  /* =====================================================
     LOAD CURRENT USER
  ===================================================== */

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await fetchCurrentUser();

        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Unable to load current user:", error);
      }
    };

    loadUser();
  }, []);

  /* =====================================================
     PROFILE UPDATE
  ===================================================== */

  useEffect(() => {
    const handleProfileUpdate = (event) => {
      const updatedUser = event?.detail;

      if (updatedUser) {
        setUser(updatedUser);
      } else {
        setUser(getStoredUser());
      }
    };

    window.addEventListener("tradenest-profile-update", handleProfileUpdate);

    return () => {
      window.removeEventListener(
        "tradenest-profile-update",
        handleProfileUpdate,
      );
    };
  }, []);

  /* =====================================================
     CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
  ===================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowMenu(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    setShowMenu(false);

    logout();

    navigate("/login", {
      replace: true,
    });
  };

  /* =====================================================
     USER DATA
  ===================================================== */

  const firstName = user?.firstName || "User";

  const lastName = user?.lastName || "";

  const fullName = `${firstName} ${lastName}`.trim();

  const email = user?.email || "";

  const initial = firstName.charAt(0).toUpperCase();

  /* =====================================================
     PROFILE IMAGE
  ===================================================== */

  const profileImage =
    user?.profileImage ||
    user?.profilePicture ||
    user?.avatar ||
    user?.photo ||
    user?.image ||
    "";

  /* =====================================================
     AVATAR
  ===================================================== */

  const renderAvatar = () => {
    if (profileImage) {
      return (
        <img
          src={profileImage}
          alt={fullName}
          className="topbarProfileImage"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      );
    }

    return initial;
  };

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const openProfile = () => {
    setShowMenu(false);

    navigate("/dashboard/profile");
  };

  const openSettings = () => {
    setShowMenu(false);

    navigate("/dashboard/settings");
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <header className="topbar">
      {/* =================================================
          LEFT
      ================================================= */}

      <div className="topbarLeft">
        <div>
          <div className="topbarEyebrow">TRADENEST</div>

          <h2>Dashboard</h2>

          <p>Manage your investments and portfolio</p>
        </div>
      </div>

      {/* =================================================
          RIGHT
      ================================================= */}

      <div className="topbarRight">
        {/* ===============================================
            MARKET STATUS
        =============================================== */}

        <div className="marketStatus">
          <span className="marketStatusDot" />

          <div>
            <strong>Market</strong>

            <small>Live</small>
          </div>
        </div>

        {/* ===============================================
            NOTIFICATION
        =============================================== */}

        <div className="notificationWrapper" ref={notificationRef}>
          <button
            type="button"
            className={notificationOpen ? "iconBtn active" : "iconBtn"}
            title="Notifications"
            aria-label="Notifications"
            onClick={() => {
              setNotificationOpen((previous) => !previous);

              setShowMenu(false);
            }}
          >
            <FaBell />

            <span className="notificationDot" />
          </button>

          {notificationOpen && (
            <div className="notificationMenu">
              <div className="notificationHeader">
                <div>
                  <strong>Notifications</strong>

                  <span>Recent activity</span>
                </div>

                <span className="notificationCount">1</span>
              </div>

              <div className="notificationItem">
                <div className="notificationIcon">
                  <FaBell />
                </div>

                <div>
                  <strong>Welcome to TradeNest</strong>

                  <p>Your trading dashboard is ready.</p>

                  <small>Just now</small>
                </div>
              </div>

              <div className="notificationFooter">You're all caught up.</div>
            </div>
          )}
        </div>

        {/* ===============================================
            PROFILE
        =============================================== */}

        <div className="profileDropdown" ref={profileRef}>
          <button
            type="button"
            className={showMenu ? "profileBox active" : "profileBox"}
            onClick={() => {
              setShowMenu((previous) => !previous);

              setNotificationOpen(false);
            }}
          >
            {/* AVATAR */}

            <div className="profileImage">{renderAvatar()}</div>

            {/* USER */}

            <div className="profileText">
              <strong>{fullName}</strong>

              <span>{email || "TradeNest user"}</span>
            </div>

            {/* ARROW */}

            <FaChevronDown
              className={showMenu ? "profileArrow rotate" : "profileArrow"}
            />
          </button>

          {/* =============================================
              PROFILE DROPDOWN
          ============================================= */}

          {showMenu && (
            <div className="profileMenu">
              <div className="profileMenuHeader">
                <div className="profileMenuAvatar">{renderAvatar()}</div>

                <div>
                  <strong>{fullName}</strong>

                  <span>{email}</span>
                </div>
              </div>

              <div className="profileMenuDivider" />

              <button type="button" onClick={openProfile}>
                <FaUser />

                <span>Profile</span>
              </button>

              <button type="button" onClick={openSettings}>
                <FaCog />

                <span>Settings</span>
              </button>

              <div className="profileMenuDivider" />

              <button type="button" className="danger" onClick={handleLogout}>
                <FaSignOutAlt />

                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
