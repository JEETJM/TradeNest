import { useEffect, useState } from "react";

import dashboardData from "../../data/dashboard";

import TradeModal from "../Trading/TradeModal";

import {
  marketSocket,
  connectMarketSocket,
  disconnectMarketSocket,
} from "../../services/marketSocket";

import "./Watchlist.css";

/* =================================
   UPSTOX INSTRUMENT MAPPING
================================= */

const MARKET_INSTRUMENTS = {
  INFY: "NSE_EQ|INE009A01021",
  TCS: "NSE_EQ|INE467B01029",
  RELIANCE: "NSE_EQ|INE002A01018",
  HDFCBANK: "NSE_EQ|INE040A01034",
  SBIN: "NSE_EQ|INE062A01020",
  ICICIBANK: "NSE_EQ|INE090A01021",
  ITC: "NSE_EQ|INE154A01025",
  WIPRO: "NSE_EQ|INE075A01022",
  AXISBANK: "NSE_EQ|INE238A01034",
  KOTAKBANK: "NSE_EQ|INE237A01036",
};

/* =================================
   WATCHLIST
================================= */

function Watchlist() {
  const [watchlist, setWatchlist] = useState(dashboardData.watchlist || []);

  const [trade, setTrade] = useState(null);

  /* =================================
     CONNECT LIVE MARKET SOCKET
  ================================= */

  useEffect(() => {
    console.log("📡 Watchlist connecting to live market...");

    connectMarketSocket();

    /* ================================
       RECEIVE LIVE MARKET UPDATE
    ================================= */

    const handleMarketUpdate = (data) => {
      console.log("🔥 WATCHLIST LIVE UPDATE:", data);

      if (!data?.instrumentKey) {
        return;
      }

      const liveSymbol = Object.keys(MARKET_INSTRUMENTS).find(
        (symbol) => MARKET_INSTRUMENTS[symbol] === data.instrumentKey,
      );

      if (!liveSymbol) {
        return;
      }

      setWatchlist((previousWatchlist) =>
        previousWatchlist.map((stock) => {
          if (stock.symbol?.toUpperCase() !== liveSymbol) {
            return stock;
          }

          const livePrice = Number(data.ltp);

          const closePrice = Number(data.closePrice);

          /* ==========================
             CHANGE %
          ========================== */

          let changePercent = Number(stock.changePercent || 0);

          if (
            Number.isFinite(livePrice) &&
            Number.isFinite(closePrice) &&
            closePrice > 0
          ) {
            changePercent = ((livePrice - closePrice) / closePrice) * 100;
          }

          return {
            ...stock,

            /* LIVE PRICE */
            currentPrice:
              Number.isFinite(livePrice) ? livePrice : stock.currentPrice,

            /* LIVE CHANGE */
            changePercent: changePercent.toFixed(2),

            /* KEEP STATIC DAY HIGH/LOW */
            dayHigh: stock.dayHigh,

            dayLow: stock.dayLow,
          };
        }),
      );
    };

    marketSocket.on("market:update", handleMarketUpdate);

    /* =================================
       CLEANUP
    ================================= */

    return () => {
      marketSocket.off("market:update", handleMarketUpdate);

      disconnectMarketSocket();
    };
  }, []);

  /* =================================
     OPEN BUY / SELL
  ================================= */

  const openTrade = (stock, side) => {
    setTrade({
      stock,
      side,
    });
  };

  /* =================================
     CLOSE TRADE
  ================================= */

  const closeTrade = () => {
    setTrade(null);
  };

  /* =================================
     RENDER
  ================================= */

  return (
    <section className="watchlistPage">
      <div className="watchlistHeader">
        <div>
          <h1>Watchlist</h1>

          <p>Track your favourite stocks and place orders.</p>
        </div>
      </div>

      <div className="watchlistTableWrapper">
        <table className="watchlistTable">
          <thead>
            <tr>
              <th>Stock</th>

              <th>Price</th>

              <th>Change</th>

              <th>Day High</th>

              <th>Day Low</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {watchlist.map((stock) => {
              const positive = Number(stock.changePercent) >= 0;

              return (
                <tr key={stock.id || stock.symbol}>
                  {/* =====================
                      STOCK
                  ====================== */}

                  <td>
                    <div className="watchStock">
                      <strong>{stock.symbol}</strong>

                      <small>{stock.company}</small>
                    </div>
                  </td>

                  {/* =====================
                      LIVE PRICE
                  ====================== */}

                  <td>
                    ₹
                    {Number(stock.currentPrice).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  {/* =====================
                      LIVE CHANGE
                  ====================== */}

                  <td className={positive ? "watchPositive" : "watchNegative"}>
                    {positive ? "+" : ""}
                    {stock.changePercent}%
                  </td>

                  {/* =====================
                      DAY HIGH
                  ====================== */}

                  <td>
                    ₹
                    {Number(stock.dayHigh || 0).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  {/* =====================
                      DAY LOW
                  ====================== */}

                  <td>
                    ₹
                    {Number(stock.dayLow || 0).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  {/* =====================
                      ACTION
                  ====================== */}

                  <td>
                    <div className="watchActions">
                      <button
                        className="buyBtn"
                        onClick={() => openTrade(stock, "BUY")}
                      >
                        Buy
                      </button>

                      <button
                        className="sellBtn"
                        onClick={() => openTrade(stock, "SELL")}
                      >
                        Sell
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* =================================
          TRADE MODAL
      ================================= */}

      {trade && (
        <TradeModal
          stock={trade.stock}
          side={trade.side}
          onClose={closeTrade}
          onSuccess={() => {
            window.dispatchEvent(new Event("tradenest-update"));

            closeTrade();
          }}
        />
      )}
    </section>
  );
}

export default Watchlist;
