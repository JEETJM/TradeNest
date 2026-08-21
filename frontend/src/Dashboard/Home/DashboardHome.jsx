import "./DashboardHome.css";

import SummaryCards from "../Cards/SummaryCards";
import Holdings from "../Holdings/Holdings";
import Analytics from "../Analytics/Analytics";
import Orders from "../Orders/Orders";
import MarketInsights from "../MarketInsights/MarketInsights";

import dashboardData from "../../data/dashboard";

function DashboardHome() {
  return (
    <section className="dashboardHome">
      {/* HEADER */}
      <div className="dashboardWelcome">
        <div>
          <h1>Dashboard</h1>
          <p>Manage your investments and portfolio</p>
        </div>
      </div>

      {/* SUMMARY */}
      <SummaryCards data={dashboardData.summary} />

      {/* HOLDINGS */}
      <Holdings holdings={dashboardData.holdings} />

      {/* ANALYTICS */}
      <Analytics />

      {/* ORDERS */}
      <Orders orders={dashboardData.orders} />

      {/* MARKET */}
      <MarketInsights />
    </section>
  );
}

export default DashboardHome;