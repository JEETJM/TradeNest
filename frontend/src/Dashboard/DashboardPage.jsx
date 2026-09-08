import "./Dashboard.css";

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./Layout/Sidebar";
import Topbar from "./Layout/Topbar";

import DashboardHome from "./Home/DashboardHome";

/* =====================================================
   PAGES
===================================================== */

import PortfolioPage from "./Pages/PortfolioPage";
import WatchlistPage from "./Pages/WatchlistPage";
import HoldingsPage from "./Pages/HoldingsPage";
import OrdersPage from "./Pages/OrdersPage";
import FundsPage from "./Pages/FundsPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import ProfilePage from "./Pages/ProfilePage";
import SettingsPage from "./Pages/SettingsPage";

/* =====================================================
   INVESTMENT OFFERING
===================================================== */

import InvestmentPage from "../Landing_Page/InvestmentOfferings/InvestmentPage";

/* =====================================================
   LIVE MARKET SOCKET
===================================================== */

import {
  marketSocket,
  connectMarketSocket,
  disconnectMarketSocket,
} from "../services/marketSocket";

/* =====================================================
   DASHBOARD PAGE
===================================================== */

function DashboardPage() {

  /* ===================================================
     GLOBAL THEME INITIALIZATION
  =================================================== */

  useEffect(() => {
    const savedDarkMode =
      localStorage.getItem(
        "tradenest_dark_mode"
      ) === "true";

    const root = document.documentElement;

    if (savedDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  /* ===================================================
     LISTEN FOR THEME CHANGES
  =================================================== */

  useEffect(() => {
    const handleThemeUpdate = () => {
      const savedDarkMode =
        localStorage.getItem(
          "tradenest_dark_mode"
        ) === "true";

      const root =
        document.documentElement;

      if (savedDarkMode) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    window.addEventListener(
      "tradenest-theme-update",
      handleThemeUpdate
    );

    return () => {
      window.removeEventListener(
        "tradenest-theme-update",
        handleThemeUpdate
      );
    };
  }, []);

  /* ===================================================
     LIVE MARKET CONNECTION
  =================================================== */

  useEffect(() => {

    console.log(
      "📡 Connecting to TradeNest live market..."
    );

    connectMarketSocket();

    /* =========================
       CONNECT
    ========================= */

    const handleConnect = () => {
      console.log(
        "🟢 Connected to TradeNest Market Server:",
        marketSocket.id
      );
    };

    /* =========================
       MARKET UPDATE
    ========================= */

    const handleMarketUpdate = (data) => {
      console.log(
        "🔥 LIVE MARKET UPDATE:",
        data
      );
    };

    /* =========================
       DISCONNECT
    ========================= */

    const handleDisconnect = (reason) => {
      console.log(
        "🔴 Market Socket Disconnected:",
        reason
      );
    };

    /* =========================
       CONNECTION ERROR
    ========================= */

    const handleConnectError = (error) => {
      console.error(
        "❌ Market Socket Connection Error:",
        error.message
      );
    };

    /* =========================
       SOCKET EVENTS
    ========================= */

    marketSocket.on(
      "connect",
      handleConnect
    );

    marketSocket.on(
      "market:update",
      handleMarketUpdate
    );

    marketSocket.on(
      "disconnect",
      handleDisconnect
    );

    marketSocket.on(
      "connect_error",
      handleConnectError
    );

    /* =========================
       CLEANUP
    ========================= */

    return () => {

      marketSocket.off(
        "connect",
        handleConnect
      );

      marketSocket.off(
        "market:update",
        handleMarketUpdate
      );

      marketSocket.off(
        "disconnect",
        handleDisconnect
      );

      marketSocket.off(
        "connect_error",
        handleConnectError
      );

      disconnectMarketSocket();
    };

  }, []);

  /* ===================================================
     RENDER
  =================================================== */

  return (

    <div className="dashboard">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar />

      {/* =================================================
          MAIN DASHBOARD
      ================================================= */}

      <div className="dashboardMain">

        {/* TOPBAR */}

        <Topbar />

        {/* =================================================
            NESTED ROUTES
        ================================================= */}

        <Routes>

          {/* DASHBOARD HOME */}

          <Route
            index
            element={<DashboardHome />}
          />

          {/* PORTFOLIO */}

          <Route
            path="portfolio"
            element={<PortfolioPage />}
          />

          {/* WATCHLIST */}

          <Route
            path="watchlist"
            element={<WatchlistPage />}
          />

          {/* HOLDINGS */}

          <Route
            path="holdings"
            element={<HoldingsPage />}
          />

          {/* ORDERS */}

          <Route
            path="orders"
            element={<OrdersPage />}
          />

          {/* FUNDS */}

          <Route
            path="funds"
            element={<FundsPage />}
          />

          {/* ANALYTICS */}

          <Route
            path="analytics"
            element={<AnalyticsPage />}
          />

          {/* INVESTMENT OFFERING */}

          <Route
            path="investment-offering"
            element={<InvestmentPage />}
          />

          {/* PROFILE */}

          <Route
            path="profile"
            element={<ProfilePage />}
          />

          {/* SETTINGS */}

          <Route
            path="settings"
            element={<SettingsPage />}
          />

        </Routes>

      </div>

    </div>
  );
}

export default DashboardPage;