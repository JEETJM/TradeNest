import "./Sidebar.css";

import {
  FaChartPie,
  FaBriefcase,
  FaBookmark,
  FaWallet,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChartLine,
  FaUniversity,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FaChartPie />,
  },
  {
    title: "Portfolio",
    icon: <FaChartLine />,
  },
  {
    title: "Watchlist",
    icon: <FaBookmark />,
  },
  {
    title: "Holdings",
    icon: <FaBriefcase />,
  },
  {
    title: "Orders",
    icon: <FaWallet />,
  },
  {
    title: "Funds",
    icon: <FaUniversity />,
  },
  {
    title: "Profile",
    icon: <FaUser />,
  },
  {
    title: "Settings",
    icon: <FaCog />,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebarLogo">
        <h2>TradeNest</h2>
      </div>

      <ul className="sidebarMenu">
        {menuItems.map((item, index) => (
          <li key={index} className={index === 0 ? "active" : ""}>
            <span>{item.icon}</span>

            <p>{item.title}</p>
          </li>
        ))}
      </ul>

      <button className="logoutBtn">
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
