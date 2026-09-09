import { useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";

import "./Sidebar.css";

import {
  FaChartPie,
  FaChartLine,
  FaBookmark,
  FaBriefcase,
  FaWallet,
  FaUniversity,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaPen,
} from "react-icons/fa";

import { getStoredUser, logout } from "../../Auth/auth";

/* =====================================================
   MAIN MENU
===================================================== */

const mainMenu = [
  {
    title: "Dashboard",
    icon: <FaChartPie />,
    path: "/dashboard",
  },
  {
    title: "Portfolio",
    icon: <FaChartLine />,
    path: "/dashboard/portfolio",
  },
  {
    title: "Watchlist",
    icon: <FaBookmark />,
    path: "/dashboard/watchlist",
  },
  {
    title: "Holdings",
    icon: <FaBriefcase />,
    path: "/dashboard/holdings",
  },
  {
    title: "Orders",
    icon: <FaWallet />,
    path: "/dashboard/orders",
  },
  {
    title: "Funds",
    icon: <FaUniversity />,
    path: "/dashboard/funds",
  },
];

/* =====================================================
   ACCOUNT MENU
===================================================== */

const accountMenu = [
  {
    title: "Profile",
    icon: <FaUser />,
    path: "/dashboard/profile",
  },
  {
    title: "Settings",
    icon: <FaCog />,
    path: "/dashboard/settings",
  },
];

/* =====================================================
   SIDEBAR
===================================================== */

function Sidebar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(getStoredUser());

  /* ===================================================
     PROFILE UPDATE LISTENER
  =================================================== */

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

  /* ===================================================
     USER INFORMATION
  =================================================== */

  const firstName = user?.firstName || "User";

  const lastName = user?.lastName || "";

  const fullName = `${firstName} ${lastName}`.trim();

  const email = user?.email || "";

  const initial = firstName.charAt(0).toUpperCase();

  /* ===================================================
     PROFILE IMAGE
  =================================================== */

  const profileImage =
    user?.profileImage ||
    user?.profilePicture ||
    user?.avatar ||
    user?.photo ||
    user?.image ||
    "";

  /* ===================================================
     LOGOUT
  =================================================== */

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  /* ===================================================
     AVATAR
  =================================================== */

  const renderAvatar = () => {
    if (profileImage) {
      return (
        <img
          src={profileImage}
          alt={fullName}
          className="sidebarProfileImage"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      );
    }

    return initial;
  };

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <aside className="sidebar">
      {/* =================================================
          LOGO → HOME
      ================================================= */}

      <div className="sidebarLogo">
        <Link
          to="/"
          className="sidebarLogoLink"
          aria-label="Go to TradeNest home"
        >
          <h2>
            Trade<span>Nest</span>
          </h2>
        </Link>
      </div>

      {/* =================================================
          MAIN MENU
      ================================================= */}

      <div className="sidebarLabel">MAIN MENU</div>

      <ul className="sidebarMenu">
        {mainMenu.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                isActive ? "menuLink active" : "menuLink"
              }
            >
              <span className="menuIcon">{item.icon}</span>

              <span>{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* =================================================
          ACCOUNT
      ================================================= */}

      <div className="accountSection">
        <div className="sidebarLabel">ACCOUNT</div>

        <ul className="sidebarMenu">
          {accountMenu.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "menuLink active" : "menuLink"
                }
              >
                <span className="menuIcon">{item.icon}</span>

                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* =================================================
          USER CARD
      ================================================= */}

      <div className="sidebarUserCard">
        {/* PROFILE AVATAR */}

        <div className="userAvatar">{renderAvatar()}</div>

        {/* USER INFO */}

        <div className="sidebarUserInfo">
          <strong>{fullName}</strong>

          <span>{email}</span>
        </div>

        {/* EDIT PROFILE */}

        <button
          type="button"
          className="editProfileBtn"
          title="Edit Profile"
          onClick={() => navigate("/dashboard/profile")}
        >
          <FaPen />
        </button>
      </div>

      {/* =================================================
          LOGOUT
      ================================================= */}

      <button type="button" className="sidebarLogoutBtn" onClick={handleLogout}>
        <FaSignOutAlt />

        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;
