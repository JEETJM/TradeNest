import "./SummaryCards.css";
import {
  FaWallet,
  FaArrowTrendUp,
  FaChartLine,
  FaMoneyBillWave,
} from "react-icons/fa6";

function SummaryCards({ data }) {
  const cards = [
    {
      title: "Portfolio Value",
      value: data.portfolioValue.formatted,
      icon: <FaWallet />,
    },

    {
      title: "Today's P&L",
      value: data.todaysPnL.formatted,
      icon: <FaArrowTrendUp />,
      positive: data.todaysPnL.positive,
    },

    {
      title: "Overall Return",
      value: `${data.overallReturn.formatted} (${data.overallReturn.percentage})`,
      icon: <FaChartLine />,
      positive: data.overallReturn.positive,
    },

    {
      title: "Available Balance",
      value: data.availableBalance.formatted,
      icon: <FaMoneyBillWave />,
    },
  ];

  return (
    <div className="summaryGrid">
      {cards.map((card, index) => (
        <div className="summaryCard" key={index}>
          <div className="cardIcon">{card.icon}</div>

          <h4>{card.title}</h4>

          <h2
            className={
              card.positive === true ? "profit"
              : card.positive === false ?
                "loss"
              : ""
            }
          >
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
