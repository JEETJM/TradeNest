import "./Watchlist.css";

import { useState } from "react";

import dashboardData from "../../data/dashboard";

import SearchStock from "./SearchStock";

import WatchlistRow from "./WatchlistRow";

function Watchlist() {
  const [search, setSearch] = useState("");

  const stocks = dashboardData.watchlist;

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
      stock.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="watchlistCard">
      <div className="watchHeader">
        <h2>Watchlist</h2>

        <span>{filteredStocks.length} Stocks</span>
      </div>

      <SearchStock
        search={search}
        setSearch={setSearch}
      />

      <div className="watchContainer">
        {filteredStocks.map((stock) => (
          <WatchlistRow
            key={stock.id}
            stock={{
              symbol: stock.symbol,
              company: stock.company,
              price: stock.currentPrice,
              change: stock.changePercent,
              positive: stock.changePercent >= 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default Watchlist;