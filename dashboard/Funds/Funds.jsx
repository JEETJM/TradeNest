import "./Funds.css";
import dashboardData from "../../data/dashboard";

function Funds() {
  const funds = dashboardData.funds;

  return (
    <section className="fundsCard">
      <div className="fundsHeader">
        <h2>Funds</h2>

        <div className="fundButtons">
          <button className="addBtn">Add Funds</button>

          <button className="withdrawBtn">
            Withdraw
          </button>
        </div>
      </div>

      <div className="fundGrid">
        <div className="fundBox">
          <span>Available Balance</span>

          <h2>{funds.available.formatted}</h2>
        </div>

        <div className="fundBox">
          <span>Used Margin</span>

          <h2>{funds.used.formatted}</h2>
        </div>

        <div className="fundBox">
          <span>Total Balance</span>

          <h2>{funds.total.formatted}</h2>
        </div>

        <div className="fundBox">
          <span>Opening Balance</span>

          <h2>{funds.opening.formatted}</h2>
        </div>
      </div>
    </section>
  );
}

export default Funds;