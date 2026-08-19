import { useState } from "react";
import dashboardData from "../../data/dashboard";
import "./FundsPage.css";

function FundsPage() {
  const funds = dashboardData.funds || {};

  const [amount, setAmount] = useState("");
  const [showAddMoney, setShowAddMoney] = useState(false);

  const available = funds.availableBalance ?? funds.available ?? 25000;

  const used = funds.usedMargin ?? funds.used ?? 0;

  const total = funds.totalBalance ?? available + used;

  const formatMoney = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const handleAddMoney = () => {
    if (!amount || Number(amount) <= 0) return;

    alert(`₹${Number(amount).toLocaleString("en-IN")} added successfully!`);

    setAmount("");
    setShowAddMoney(false);
  };

  return (
    <section className="fundsPage">
      {/* Header */}

      <div className="fundsHeader">
        <div>
          <h1>Funds</h1>
          <p>Manage your trading balance and available funds.</p>
        </div>

        <button className="addMoneyBtn" onClick={() => setShowAddMoney(true)}>
          + Add Money
        </button>
      </div>

      {/* Balance Cards */}

      <div className="fundCards">
        <div className="fundCard">
          <span>Total Balance</span>

          <h2>{formatMoney(total)}</h2>

          <small>Total funds in your account</small>
        </div>

        <div className="fundCard">
          <span>Available Balance</span>

          <h2 className="availableMoney">{formatMoney(available)}</h2>

          <small>Available for trading</small>
        </div>

        <div className="fundCard">
          <span>Used Margin</span>

          <h2>{formatMoney(used)}</h2>

          <small>Currently used</small>
        </div>

        <div className="fundCard">
          <span>Withdrawable</span>

          <h2>{formatMoney(available)}</h2>

          <small>Available to withdraw</small>
        </div>
      </div>

      {/* Fund Actions */}

      <div className="fundSection">
        <div className="fundSectionHeader">
          <h2>Fund Management</h2>

          <p>Add or withdraw money from your TradeNest account.</p>
        </div>

        <div className="fundActions">
          <div className="fundAction">
            <div className="fundActionIcon">+</div>

            <div>
              <h3>Add Money</h3>

              <p>Add funds to your trading account.</p>
            </div>

            <button onClick={() => setShowAddMoney(true)}>Add</button>
          </div>

          <div className="fundAction">
            <div className="fundActionIcon withdrawIcon">↓</div>

            <div>
              <h3>Withdraw Money</h3>

              <p>Transfer available funds to your bank.</p>
            </div>

            <button>Withdraw</button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}

      <div className="fundSection">
        <div className="fundSectionHeader">
          <h2>Recent Fund Activity</h2>

          <p>Your recent deposits and withdrawals.</p>
        </div>

        <div className="fundTransaction">
          <div>
            <strong>Account Balance</strong>
            <small>Current available balance</small>
          </div>

          <strong className="positiveFund">{formatMoney(available)}</strong>
        </div>
      </div>

      {/* Modal */}

      {showAddMoney && (
        <div
          className="fundModalOverlay"
          onClick={() => setShowAddMoney(false)}
        >
          <div className="fundModal" onClick={(e) => e.stopPropagation()}>
            <h2>Add Money</h2>

            <p>Enter the amount you want to add.</p>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="fundModalActions">
              <button
                className="cancelBtn"
                onClick={() => setShowAddMoney(false)}
              >
                Cancel
              </button>

              <button className="confirmBtn" onClick={handleAddMoney}>
                Add Money
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default FundsPage;
