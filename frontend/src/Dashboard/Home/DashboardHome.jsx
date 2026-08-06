import "./DashboardHome.css";

import SummaryCards from "../Cards/SummaryCards";
import Holdings from "../Holdings/Holdings";
import Analytics from "../Analytics/Analytics";
import Orders from "../Orders/Orders";
import MarketInsights from "../MarketInsights/MarketInsights";
import dashboardData from "../../data/dashboard";

function DashboardHome() {
  return (
    <>
      <section className="dashboardHome">
        <h1>Welcome back, Jeet 👋</h1>

        <p>Here's a quick overview of your investments and portfolio.</p>
      </section>

      {/* Summary Cards */}
      <SummaryCards data={dashboardData.summary} />

      {/* Holdings */}
      <Holdings holdings={dashboardData.holdings} />

      {/* Analytics */}
      <Analytics />

      {/* Orders */}
      <Orders orders={dashboardData.orders} />
      <Orders orders={dashboardData.orders} />

      <MarketInsights />
    </>
  );
}

export default DashboardHome;
