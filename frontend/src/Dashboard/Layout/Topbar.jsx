import "./Topbar.css";

import { FaSearch, FaBell, FaMoon } from "react-icons/fa";

function Topbar() {
  return (
    <header className="topbar">
      <div className="searchBox">
        <FaSearch className="searchIcon" />

        <input type="text" placeholder="Search stocks, mutual funds..." />
      </div>

      <div className="topbarRight">
        <button className="iconBtn">
          <FaMoon />
        </button>

        <button className="iconBtn notificationBtn">
          <FaBell />

          <span className="notificationDot"></span>
        </button>

        <div className="profileBox">
          <div className="profileImage">JM</div>

          <div>
            <h4>Jeet Mondal</h4>

            <p>Premium Investor</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
