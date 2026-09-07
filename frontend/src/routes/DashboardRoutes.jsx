import { Routes, Route } from "react-router-dom";

import DashboardHome from "../Dashboard/Home/DashboardHome";

import MarketOverview from "../Dashboard/Market/MarketOverview";

import Watchlist from "../Dashboard/Watchlist/Watchlist";

import Holdings from "../Dashboard/Holdings/Holdings";

import Orders from "../Dashboard/Orders/Orders";

import Positions from "../Dashboard/Positions/Positions";

import Funds from "../Dashboard/Funds/Funds";

import Profile from "../Dashboard/Profile/Profile";

import Settings from "../Dashboard/Settings/Settings";


function DashboardRoutes() {
  return (
    <Routes>

      {/* ==========================================
          DASHBOARD HOME

          /dashboard
      ========================================== */}

      <Route
        index
        element={<DashboardHome />}
      />


      {/* ==========================================
          MARKET

          /dashboard/market
      ========================================== */}

      <Route
        path="market"
        element={<MarketOverview />}
      />


      {/* ==========================================
          WATCHLIST

          /dashboard/watchlist
      ========================================== */}

      <Route
        path="watchlist"
        element={<Watchlist />}
      />


      {/* ==========================================
          HOLDINGS

          /dashboard/holdings
      ========================================== */}

      <Route
        path="holdings"
        element={<Holdings />}
      />


      {/* ==========================================
          ORDERS

          /dashboard/orders
      ========================================== */}

      <Route
        path="orders"
        element={<Orders />}
      />


      {/* ==========================================
          POSITIONS

          /dashboard/positions
      ========================================== */}

      <Route
        path="positions"
        element={<Positions />}
      />


      {/* ==========================================
          FUNDS

          /dashboard/funds
      ========================================== */}

      <Route
        path="funds"
        element={<Funds />}
      />


      {/* ==========================================
          PROFILE

          /dashboard/profile
      ========================================== */}

      <Route
        path="profile"
        element={<Profile />}
      />


      {/* ==========================================
          SETTINGS

          /dashboard/settings
      ========================================== */}

      <Route
        path="settings"
        element={<Settings />}
      />

    </Routes>
  );
}

export default DashboardRoutes;