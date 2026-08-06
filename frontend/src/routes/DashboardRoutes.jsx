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
      <Route index element={<DashboardHome />} />

      <Route path="market" element={<MarketOverview />} />

      <Route path="watchlist" element={<Watchlist />} />

      <Route path="holdings" element={<Holdings />} />

      <Route path="orders" element={<Orders />} />

      <Route path="positions" element={<Positions />} />

      <Route path="funds" element={<Funds />} />

      <Route path="profile" element={<Profile />} />

      <Route path="settings" element={<Settings />} />
    </Routes>
  );
}

export default DashboardRoutes;