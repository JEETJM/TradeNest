import "./Dashboard.css";

import { useEffect } from "react";
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

// Investment
import InvestmentPage from "../Landing_Page/InvestmentOfferings/InvestmentPage";

// Live market socket
import {
  marketSocket,
  connectMarketSocket,
  disconnectMarketSocket,
} from "../services/marketSocket";

function DashboardPage() {
  /* =====================================================
     THEME INITIALIZATION
  ===================================================== */

  useEffect(() => {
    const savedDarkMode =
      localStorage.getItem("tradenest_dark_mode") === "true";

    const root = document.documentElement;

    if (savedDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  /* =====================================================
     THEME UPDATE LISTENER
  ===================================================== */

  useEffect(() => {
    const handleThemeUpdate = () => {
      const savedDarkMode =
        localStorage.getItem("tradenest_dark_mode") === "true";

      const root = document.documentElement;

      if (savedDarkMode) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    window.addEventListener("tradenest-theme-update", handleThemeUpdate);

    return () => {
      window.removeEventListener("tradenest-theme-update", handleThemeUpdate);
    };
  }, []);

  /* =====================================================
     LIVE MARKET SOCKET
  ===================================================== */

  useEffect(() => {
    connectMarketSocket();

    const handleConnect = () => {
      console.log("🟢 TradeNest market socket connected:", marketSocket.id);
    };

    const handleMarketUpdate = (data) => {
      if (!data) return;

      window.dispatchEvent(
        new CustomEvent("tradenest-market-update", {
          detail: data,
        }),
      );
    };

    const handleDisconnect = (reason) => {
      console.log("🔴 TradeNest market socket disconnected:", reason);
    };

    const handleConnectError = (error) => {
      console.error(
        "❌ TradeNest market socket error:",
        error?.message || error,
      );
    };

    marketSocket.on("connect", handleConnect);
    marketSocket.on("market:update", handleMarketUpdate);
    marketSocket.on("disconnect", handleDisconnect);
    marketSocket.on("connect_error", handleConnectError);

    return () => {
      marketSocket.off("connect", handleConnect);
      marketSocket.off("market:update", handleMarketUpdate);
      marketSocket.off("disconnect", handleDisconnect);
      marketSocket.off("connect_error", handleConnectError);

      disconnectMarketSocket();
    };
  }, []);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="dashboard">
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="dashboardMain">
        {/* =================================================
            TOPBAR
        ================================================= */}

        <Topbar />

        {/* =================================================
            DASHBOARD ROUTES
        ================================================= */}

        <div className="dashboardContent">
          <Routes>
            {/* HOME */}

            <Route index element={<DashboardHome />} />

            {/* PORTFOLIO */}

            <Route path="portfolio" element={<PortfolioPage />} />

            {/* WATCHLIST */}

            <Route path="watchlist" element={<WatchlistPage />} />

            {/* HOLDINGS */}

            <Route path="holdings" element={<HoldingsPage />} />

            {/* ORDERS */}

            <Route path="orders" element={<OrdersPage />} />

            {/* FUNDS */}

            <Route path="funds" element={<FundsPage />} />

            {/* ANALYTICS */}

            <Route path="analytics" element={<AnalyticsPage />} />

            {/* INVESTMENT OFFERING */}

            <Route path="investment-offering" element={<InvestmentPage />} />

            {/* PROFILE */}

            <Route path="profile" element={<ProfilePage />} />

            {/* SETTINGS */}

            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
