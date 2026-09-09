import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaBell, FaChevronDown, FaSignOutAlt } from "react-icons/fa";

import "./Topbar.css";

import { fetchCurrentUser, getStoredUser, logout } from "../../Auth/auth";

function Topbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(getStoredUser());
  const [showMenu, setShowMenu] = useState(false);

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
     LISTEN FOR PROFILE UPDATE
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
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
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

  /*
   * Supports common backend property names.
   *
   * If your backend stores the image as
   * profileImage, it will work directly.
   */

  const profileImage =
    user?.profileImage ||
    user?.profilePicture ||
    user?.avatar ||
    user?.photo ||
    user?.image ||
    "";

  /* =====================================================
     PROFILE AVATAR
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

  return (
    <header className="topbar">
      {/* =================================================
          LEFT
      ================================================= */}

      <div className="topbarLeft">
        <div>
          <h2>Dashboard</h2>

          <p>Manage your investments and portfolio</p>
        </div>
      </div>

      {/* =================================================
          RIGHT
      ================================================= */}

      <div className="topbarRight">
        {/* ================= NOTIFICATION ================= */}

        <button type="button" className="iconBtn" title="Notifications">
          <FaBell />

          <span className="notificationDot" />
        </button>

        {/* ================= PROFILE ================= */}

        <div className="profileDropdown">
          <button
            type="button"
            className="profileBox"
            onClick={() => setShowMenu(!showMenu)}
          >
            {/* PROFILE IMAGE */}

            <div className="profileImage">{renderAvatar()}</div>

            {/* USER INFORMATION */}

            <div className="profileText">
              <strong>{fullName}</strong>

              <span>{email}</span>
            </div>

            {/* ARROW */}

            <FaChevronDown
              className={showMenu ? "profileArrow rotate" : "profileArrow"}
            />
          </button>

          {/* =================================================
              DROPDOWN
          ================================================= */}

          {showMenu && (
            <div className="profileMenu">
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);

                  navigate("/dashboard/profile");
                }}
              >
                <span>Profile</span>
              </button>

              <button type="button" onClick={handleLogout} className="danger">
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
