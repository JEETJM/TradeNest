import "./SummaryCards.css";
import {
  FaWallet,
  FaArrowTrendUp,
  FaChartLine,
  FaMoneyBillWave,
} from "react-icons/fa6";

const cards = [
  {
    title: "Portfolio Value",
    value: "₹ 2,48,520",
    icon: <FaWallet />,
  },
  {
    title: "Today's P&L",
    value: "+ ₹2,350",
    icon: <FaArrowTrendUp />,
  },
  {
    title: "Overall Return",
    value: "+18.62%",
    icon: <FaChartLine />,
  },
  {
    title: "Available Balance",
    value: "₹ 52,450",
    icon: <FaMoneyBillWave />,
  },
];

function SummaryCards() {
  return (
    <div className="summaryGrid">
      {cards.map((card, index) => (
        <div className="summaryCard" key={index}>
          <div className="cardIcon">{card.icon}</div>

          <h4>{card.title}</h4>

          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
