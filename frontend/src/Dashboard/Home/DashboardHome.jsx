import "./DashboardHome.css";

import SummaryCards from "../Cards/SummaryCards";
import Holdings from "../Holdings/Holdings";
import Analytics from "../Analytics/Analytics";
import Orders from "../Orders/Orders";
import MarketInsights from "../MarketInsights/MarketInsights";

import dashboardData from "../../data/dashboard";

function DashboardHome() {
  return (
    <main className="dashboardHome">
      {/* =========================
          PAGE HEADER
      ========================= */}
      <section className="dashboardHomeHeader">
        <div>
          <span className="dashboardEyebrow">TRADENEST OVERVIEW</span>

          <h1>Dashboard</h1>

          <p>
            Manage your investments, portfolio and market activity from one
            place.
          </p>
        </div>

        <div className="dashboardHeaderBadge">
          <span className="dashboardLiveDot"></span>
          <span>Market Live</span>
        </div>
      </section>

      {/* =========================
          SUMMARY CARDS
      ========================= */}
      <section className="dashboardSection">
        <div className="dashboardSectionHeader">
          <div>
            <h2>Portfolio Overview</h2>
            <p>Your account summary at a glance</p>
          </div>
        </div>

        <SummaryCards data={dashboardData?.summary || {}} />
      </section>

      {/* =========================
          HOLDINGS
      ========================= */}
      <section className="dashboardSection">
        <Holdings holdings={dashboardData?.holdings || []} />
      </section>

      {/* =========================
          ANALYTICS
      ========================= */}
      <section className="dashboardSection">
        <Analytics />
      </section>

      {/* =========================
          ORDERS
      ========================= */}
      <section className="dashboardSection">
        <Orders orders={dashboardData?.orders || []} />
      </section>

      {/* =========================
          MARKET INSIGHTS
      ========================= */}
      <section className="dashboardSection dashboardLastSection">
        <MarketInsights />
      </section>
    </main>
  );
}

export default DashboardHome;
