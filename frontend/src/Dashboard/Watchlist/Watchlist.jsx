import "./Watchlist.css";

const stocks = [
  {
    name: "Reliance",

    price: "₹2,985",

    change: "+2.15%",

    green: true,
  },

  {
    name: "TCS",

    price: "₹4,125",

    change: "+1.10%",

    green: true,
  },

  {
    name: "Infosys",

    price: "₹1,654",

    change: "-0.64%",

    green: false,
  },

  {
    name: "HDFC Bank",

    price: "₹1,785",

    change: "+0.82%",

    green: true,
  },

  {
    name: "ITC",

    price: "₹468",

    change: "-1.22%",

    green: false,
  },
];

function Watchlist() {
  return (
    <div className="watchlistCard">
      <h2>Watchlist</h2>

      {stocks.map((stock, index) => (
        <div key={index} className="stockRow">
          <div>
            <h4>{stock.name}</h4>
          </div>

          <div>
            <h3>{stock.price}</h3>

            <p className={stock.green ? "green" : "red"}>{stock.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
