import { NavLink } from "react-router-dom";
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
} from "react-icons/fa";

const menuItems = [
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
  return (
    <aside className="sidebar">
      <div className="sidebarLogo">
        <h2>TradeNest</h2>
      </div>

      <ul className="sidebarMenu">
        {menuItems.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                isActive ? "menuLink active" : "menuLink"
              }
            >
              <span>{item.icon}</span>

              <p>{item.title}</p>
            </NavLink>
          </li>
        ))}
      </ul>

      <button className="logoutBtn">
        <FaSignOutAlt />

        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;