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
     GET CURRENT USER
  ===================================================== */

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await fetchCurrentUser();

        setUser(currentUser);
      } catch (error) {
        console.error("Unable to load current user:", error);
      }
    };

    loadUser();
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
     USER
  ===================================================== */

  const firstName = user?.firstName || "User";

  const fullName = user ? `${user.firstName} ${user.lastName}` : "User";

  const email = user?.email || "";

  const initial = firstName.charAt(0).toUpperCase();

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
        {/* Notification */}

        <button type="button" className="iconBtn" title="Notifications">
          <FaBell />

          <span className="notificationDot" />
        </button>

        {/* Profile */}

        <div className="profileDropdown">
          <button
            type="button"
            className="profileBox"
            onClick={() => setShowMenu(!showMenu)}
          >
            <div className="profileImage">{initial}</div>

            <div className="profileText">
              <strong>{fullName}</strong>

              <span>{email}</span>
            </div>

            <FaChevronDown
              className={showMenu ? "profileArrow rotate" : "profileArrow"}
            />
          </button>

          {/* Dropdown */}

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
