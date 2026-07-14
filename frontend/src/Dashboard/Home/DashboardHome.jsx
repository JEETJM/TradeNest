import "./DashboardHome.css";

import SummaryCards from "../Cards/SummaryCards";
import Holdings from "../Holdings/Holdings";
import Orders from "../Orders/Orders";
const holdings = [
  {
    id: 1,
    stock: "Reliance",
    qty: 10,
    avgPrice: "₹2750",
    ltp: "₹2985",
    pnl: "+₹2350",
    profit: true,
  },

  {
    id: 2,
    stock: "TCS",
    qty: 6,
    avgPrice: "₹3900",
    ltp: "₹4120",
    pnl: "+₹1320",
    profit: true,
  },

  {
    id: 3,
    stock: "Infosys",
    qty: 12,
    avgPrice: "₹1700",
    ltp: "₹1650",
    pnl: "-₹600",
    profit: false,
  },
];

const summaryData = {
  portfolioValue: "₹2,48,520",
  todayPNL: "+₹2,350",
  overallReturn: "+18.62%",
  availableBalance: "₹52,450",
};

const orders = [
  {
    id: 1,
    stock: "Reliance",
    type: "BUY",
    qty: 5,
    price: "₹2,980",
    status: "Completed",
  },

  {
    id: 2,
    stock: "TCS",
    type: "SELL",
    qty: 2,
    price: "₹4,100",
    status: "Pending",
  },

  {
    id: 3,
    stock: "Infosys",
    type: "BUY",
    qty: 10,
    price: "₹1,650",
    status: "Completed",
  },
];

<SummaryCards data={summaryData} />;
function DashboardHome() {
  return (
    <>
      <section className="dashboardHome">
        <h1>Welcome back, Jeet 👋</h1>

        <p>Here's a quick overview of your investments and portfolio.</p>
      </section>
      <SummaryCards data={summaryData} />
      <Holdings holdings={holdings} /> <Orders orders={orders} />
    </>
  );
}

export default DashboardHome;
