import { NavLink, useNavigate } from "react-router-dom";

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

function Sidebar() {
  const navigate = useNavigate();

  const user = getStoredUser();

  const firstName = user?.firstName || "User";
  const lastName = user?.lastName || "";

  const fullName = `${firstName} ${lastName}`.trim();

  const email = user?.email || "";

  const initial = firstName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <aside className="sidebar">
      {/* =================================================
          LOGO
      ================================================= */}

      <div className="sidebarLogo">
        <h2>
          Trade<span>Nest</span>
        </h2>
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
        <div className="userAvatar">{initial}</div>

        <div className="sidebarUserInfo">
          <strong>{fullName}</strong>

          <span>{email}</span>
        </div>

        {/* Edit Profile */}

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
