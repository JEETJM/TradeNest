import "./Dashboard.css";

import Sidebar from "./Layout/Sidebar";
import Topbar from "./Layout/Topbar";

import DashboardHome from "./Home/DashboardHome";
import MarketOverview from "./Market/MarketOverview";
import SummaryCards from "./Cards/SummaryCards";
import PortfolioChart from "./Charts/PortfolioChart";
// import MarketOverview from "./Market/MarketOverview"
import Watchlist from "./Watchlist/Watchlist";
function DashboardPage() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardMain">
        <Topbar />

        <DashboardHome />
        <SummaryCards />

        <MarketOverview />

        <div className="dashboardBottom">
          <PortfolioChart />

          <Watchlist />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
