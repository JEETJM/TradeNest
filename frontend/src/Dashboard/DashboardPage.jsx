import "./Dashboard.css";

import { Routes, Route } from "react-router-dom";

import Sidebar from "./Layout/Sidebar";
import Topbar from "./Layout/Topbar";

import DashboardHome from "./Home/DashboardHome";

// Pages
import PortfolioPage from "./Pages/PortfolioPage";
import WatchlistPage from "./Pages/WatchlistPage";
import HoldingsPage from "./Pages/HoldingsPage";
import OrdersPage from "./Pages/OrdersPage";
import FundsPage from "./Pages/FundsPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import ProfilePage from "./Pages/ProfilePage";
import SettingsPage from "./Pages/SettingsPage";

function DashboardPage() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardMain">
        <Topbar />

        <Routes>
          <Route index element={<DashboardHome />} />

          <Route path="portfolio" element={<PortfolioPage />} />

          <Route path="watchlist" element={<WatchlistPage />} />

          <Route path="holdings" element={<HoldingsPage />} />

          <Route path="orders" element={<OrdersPage />} />

          <Route path="funds" element={<FundsPage />} />

          <Route path="analytics" element={<AnalyticsPage />} />

          <Route path="profile" element={<ProfilePage />} />

          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardPage;