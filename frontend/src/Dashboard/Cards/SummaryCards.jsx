import "./SummaryCards.css";

import {
  FaWallet,
  FaArrowTrendUp,
  FaChartLine,
  FaMoneyBillWave,
} from "react-icons/fa6";

function SummaryCards({ data = {} }) {
  const portfolioValue = data?.portfolioValue || {};
  const todaysPnL = data?.todaysPnL || {};
  const overallReturn = data?.overallReturn || {};
  const availableBalance = data?.availableBalance || {};

  const cards = [
    {
      title: "Portfolio Value",
      value: portfolioValue.formatted || "₹0.00",
      icon: <FaWallet />,
      type: "portfolio",
    },
    {
      title: "Today's P&L",
      value: todaysPnL.formatted || "₹0.00",
      icon: <FaArrowTrendUp />,
      positive: todaysPnL.positive,
      type: "pnl",
    },
    {
      title: "Overall Return",
      value: overallReturn.formatted || "₹0.00",
      percentage: overallReturn.percentage,
      icon: <FaChartLine />,
      positive: overallReturn.positive,
      type: "return",
    },
    {
      title: "Available Balance",
      value: availableBalance.formatted || "₹0.00",
      icon: <FaMoneyBillWave />,
      type: "balance",
    },
  ];

  return (
    <div className="summaryGrid">
      {cards.map((card) => {
        const valueClass =
          card.positive === true ? "profit"
          : card.positive === false ? "loss"
          : "";

        return (
          <article className={`summaryCard ${card.type}`} key={card.title}>
            <div className="summaryCardTop">
              <div className="cardIcon">{card.icon}</div>

              {card.positive !== undefined && (
                <span
                  className={`cardTrend ${
                    card.positive ? "trendPositive" : "trendNegative"
                  }`}
                >
                  {card.positive ? "Positive" : "Negative"}
                </span>
              )}
            </div>

            <div className="summaryCardContent">
              <p className="summaryCardTitle">{card.title}</p>

              <h2 className={valueClass}>{card.value}</h2>

              {card.percentage && (
                <span className={`summaryPercentage ${valueClass}`}>
                  {card.percentage}
                </span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default SummaryCards;
