import "./Analytics.css";
import PortfolioGrowth from "./PortfolioGrowth";
import AssetAllocation from "./AssetAllocation";
import SectorAllocation from "./SectorAllocation";
import PerformanceCard from "./PerformanceCard";
function Analytics() {
  return (
    <section className="analyticsSection">
      <div className="analyticsHeader">
        <h2>Portfolio Analytics</h2>

        <p>Track your portfolio performance and allocation.</p>
      </div>

      <div className="analyticsGrid">
        <PortfolioGrowth />

        <AssetAllocation />

        <SectorAllocation />

        <PerformanceCard />
      </div>
    </section>
  );
}

export default Analytics;
