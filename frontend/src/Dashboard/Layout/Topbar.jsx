import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function Topbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  /* =====================================
     GET LOGGED IN USER
  ===================================== */

  useEffect(() => {
    const storedUser =
      localStorage.getItem("tradenest_user") ||
      sessionStorage.getItem("tradenest_user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);
      } catch (error) {
        console.error("Unable to read logged in user:", error);
      }
    }
  }, []);

  /* =====================================
     LOGOUT
  ===================================== */

  const handleLogout = () => {
    // Local storage clear
    localStorage.removeItem("tradenest_token");
    localStorage.removeItem("tradenest_user");

    // Session storage clear
    sessionStorage.removeItem("tradenest_token");
    sessionStorage.removeItem("tradenest_user");

    // Go to login
    navigate("/login", {
      replace: true,
    });
  };

  /* =====================================
     USER NAME
  ===================================== */

  const firstName = user?.firstName || "User";

  const fullName = user ? `${user.firstName} ${user.lastName}` : "User";

  return (
    <header className="topbar">
      {/* =================================
          LEFT
      ================================= */}

      <div className="topbarLeft">
        <div>
          <h2>Welcome back, {firstName} 👋</h2>

          <p>Here's what's happening with your investments today.</p>
        </div>
      </div>

      {/* =================================
          RIGHT
      ================================= */}

      <div className="topbarRight">
        {/* Notification */}

        <button className="notificationBtn" type="button">
          <FaBell />
        </button>

        {/* User */}

        <div className="profileInfo">
          <FaUserCircle className="profileIcon" />

          <div>
            <strong>{fullName}</strong>

            <span>{user?.email || ""}</span>
          </div>
        </div>

        {/* Logout */}

        <button className="logoutBtn" type="button" onClick={handleLogout}>
          <FaSignOutAlt />

          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;
