import "./MarketInsights.css";

import TopGainers from "./TopGainers";
import TopLosers from "./TopLosers";
import Indices from "./Indices";

function MarketInsights() {
  return (
    <section className="marketInsights">

      <h2>Market Intelligence</h2>

      <div className="marketGrid">

        <TopGainers />

        <TopLosers />

        <Indices />

      </div>

    </section>
  );
}

export default MarketInsights;