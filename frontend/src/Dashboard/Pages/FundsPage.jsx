import { useCallback, useEffect, useState } from "react";
import "./FundsPage.css";

const API_URL = "http://localhost:5000";

function FundsPage() {
  const [funds, setFunds] = useState({
    totalBalance: 0,
    availableBalance: 0,
    usedMargin: 0,
    withdrawable: 0,
  });

  const [amount, setAmount] = useState("");
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  /* =========================
     TOKEN
  ========================= */

  const getToken = () => {
    return (
      localStorage.getItem("tradenest_token") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("tradenest_token") ||
      sessionStorage.getItem("token")
    );
  };

  /* =========================
     FORMAT MONEY
  ========================= */

  const formatMoney = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  /* =========================
     LOAD FUNDS
  ========================= */

  const loadFunds = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`${API_URL}/api/funds`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load funds.");
      }

      setFunds({
        totalBalance: Number(data.funds?.totalBalance || 0),
        availableBalance: Number(data.funds?.availableBalance || 0),
        usedMargin: Number(data.funds?.usedMargin || 0),
        withdrawable: Number(data.funds?.withdrawable || 0),
      });
    } catch (error) {
      console.error("❌ Funds loading error:", error);

      setError(error.message || "Unable to load funds.");
    } finally {
      setLoading(false);
    }
  }, []);

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    loadFunds();
  }, [loadFunds]);

  /* =========================
     LISTEN FOR FUND UPDATES
  ========================= */

  useEffect(() => {
    const handleFundsUpdate = () => {
      loadFunds();
    };

    window.addEventListener("tradenest-funds-update", handleFundsUpdate);

    window.addEventListener("tradenest-update", handleFundsUpdate);

    return () => {
      window.removeEventListener("tradenest-funds-update", handleFundsUpdate);

      window.removeEventListener("tradenest-update", handleFundsUpdate);
    };
  }, [loadFunds]);

  /* =========================
     ADD MONEY
  ========================= */

  const handleAddMoney = async () => {
    const value = Number(amount);

    if (!value || value <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      setProcessing(true);

      const token = getToken();

      if (!token) {
        alert("Authentication token not found.");
        return;
      }

      const response = await fetch(`${API_URL}/api/funds/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add money.");
      }

      setFunds({
        totalBalance: Number(data.funds?.totalBalance || 0),
        availableBalance: Number(data.funds?.availableBalance || 0),
        usedMargin: Number(data.funds?.usedMargin || 0),
        withdrawable: Number(data.funds?.withdrawable || 0),
      });

      alert(data.message || "Money added successfully.");

      setAmount("");
      setShowAddMoney(false);

      window.dispatchEvent(new Event("tradenest-funds-update"));

      window.dispatchEvent(new Event("tradenest-update"));
    } catch (error) {
      console.error("❌ Add money error:", error);

      alert(error.message || "Unable to add money.");
    } finally {
      setProcessing(false);
    }
  };

  /* =========================
     WITHDRAW MONEY
  ========================= */

  const handleWithdraw = async () => {
    const value = Number(amount);

    if (!value || value <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (value > Number(funds.withdrawable || 0)) {
      alert("Insufficient available balance.");
      return;
    }

    try {
      setProcessing(true);

      const token = getToken();

      if (!token) {
        alert("Authentication token not found.");
        return;
      }

      const response = await fetch(`${API_URL}/api/funds/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to withdraw money.");
      }

      setFunds({
        totalBalance: Number(data.funds?.totalBalance || 0),
        availableBalance: Number(data.funds?.availableBalance || 0),
        usedMargin: Number(data.funds?.usedMargin || 0),
        withdrawable: Number(data.funds?.withdrawable || 0),
      });

      alert(data.message || "Money withdrawn successfully.");

      setAmount("");
      setShowWithdraw(false);

      window.dispatchEvent(new Event("tradenest-funds-update"));

      window.dispatchEvent(new Event("tradenest-update"));
    } catch (error) {
      console.error("❌ Withdraw error:", error);

      alert(error.message || "Unable to withdraw money.");
    } finally {
      setProcessing(false);
    }
  };

  /* =========================
     OPEN ADD MONEY
  ========================= */

  const openAddMoney = () => {
    setAmount("");
    setShowWithdraw(false);
    setShowAddMoney(true);
  };

  /* =========================
     OPEN WITHDRAW
  ========================= */

  const openWithdraw = () => {
    setAmount("");
    setShowAddMoney(false);
    setShowWithdraw(true);
  };

  /* =========================
     CLOSE MODALS
  ========================= */

  const closeModals = () => {
    if (processing) return;

    setAmount("");
    setShowAddMoney(false);
    setShowWithdraw(false);
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <section className="fundsPage">
        <div className="fundLoading">Loading your funds...</div>
      </section>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <section className="fundsPage">
        <div className="fundError">
          <h2>Unable to load funds</h2>

          <p>{error}</p>

          <button onClick={loadFunds}>Retry</button>
        </div>
      </section>
    );
  }

  return (
    <section className="fundsPage">
      {/* =========================
          HEADER
      ========================= */}

      <div className="fundsHeader">
        <div>
          <h1>Funds</h1>

          <p>Manage your trading balance and available funds.</p>
        </div>

        <button className="addMoneyBtn" onClick={openAddMoney}>
          + Add Money
        </button>
      </div>

      {/* =========================
          BALANCE CARDS
      ========================= */}

      <div className="fundCards">
        {/* TOTAL */}

        <div className="fundCard">
          <span>Total Balance</span>

          <h2>{formatMoney(funds.totalBalance)}</h2>

          <small>Total funds in your account</small>
        </div>

        {/* AVAILABLE */}

        <div className="fundCard">
          <span>Available Balance</span>

          <h2 className="availableMoney">
            {formatMoney(funds.availableBalance)}
          </h2>

          <small>Available for trading</small>
        </div>

        {/* USED MARGIN */}

        <div className="fundCard">
          <span>Used Margin</span>

          <h2>{formatMoney(funds.usedMargin)}</h2>

          <small>Currently used</small>
        </div>

        {/* WITHDRAWABLE */}

        <div className="fundCard">
          <span>Withdrawable</span>

          <h2>{formatMoney(funds.withdrawable)}</h2>

          <small>Available to withdraw</small>
        </div>
      </div>

      {/* =========================
          FUND MANAGEMENT
      ========================= */}

      <div className="fundSection">
        <div className="fundSectionHeader">
          <h2>Fund Management</h2>

          <p>Add or withdraw money from your TradeNest account.</p>
        </div>

        <div className="fundActions">
          {/* ADD MONEY */}

          <div className="fundAction">
            <div className="fundActionIcon">+</div>

            <div>
              <h3>Add Money</h3>

              <p>Add funds to your trading account.</p>
            </div>

            <button onClick={openAddMoney}>Add</button>
          </div>

          {/* WITHDRAW */}

          <div className="fundAction">
            <div className="fundActionIcon withdrawIcon">↓</div>

            <div>
              <h3>Withdraw Money</h3>

              <p>Transfer available funds to your bank.</p>
            </div>

            <button onClick={openWithdraw}>Withdraw</button>
          </div>
        </div>
      </div>

      {/* =========================
          ACCOUNT BALANCE
      ========================= */}

      <div className="fundSection">
        <div className="fundSectionHeader">
          <h2>Account Balance</h2>

          <p>Your current TradeNest balance.</p>
        </div>

        <div className="fundTransaction">
          <div>
            <strong>Available Trading Balance</strong>

            <small>Funds currently available for trading</small>
          </div>

          <strong className="positiveFund">
            {formatMoney(funds.availableBalance)}
          </strong>
        </div>
      </div>

      {/* =========================
          ADD MONEY MODAL
      ========================= */}

      {showAddMoney && (
        <div className="fundModalOverlay" onClick={closeModals}>
          <div className="fundModal" onClick={(e) => e.stopPropagation()}>
            <h2>Add Money</h2>

            <p>Enter the amount you want to add.</p>

            <input
              type="number"
              min="1"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={processing}
            />

            <div className="fundModalActions">
              <button
                className="cancelBtn"
                disabled={processing}
                onClick={closeModals}
              >
                Cancel
              </button>

              <button
                className="confirmBtn"
                disabled={processing}
                onClick={handleAddMoney}
              >
                {processing ? "Processing..." : "Add Money"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================
          WITHDRAW MODAL
      ========================= */}

      {showWithdraw && (
        <div className="fundModalOverlay" onClick={closeModals}>
          <div className="fundModal" onClick={(e) => e.stopPropagation()}>
            <h2>Withdraw Money</h2>

            <p>
              Available to withdraw:{" "}
              <strong>{formatMoney(funds.withdrawable)}</strong>
            </p>

            <input
              type="number"
              min="1"
              max={funds.withdrawable}
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={processing}
            />

            <div className="fundModalActions">
              <button
                className="cancelBtn"
                disabled={processing}
                onClick={closeModals}
              >
                Cancel
              </button>

              <button
                className="confirmBtn"
                disabled={processing}
                onClick={handleWithdraw}
              >
                {processing ? "Processing..." : "Withdraw"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default FundsPage;
