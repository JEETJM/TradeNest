import { useCallback, useEffect, useState } from "react";
import {
  FaWallet,
  FaPlus,
  FaArrowDown,
  FaMoneyBillTransfer,
  FaRotate,
  FaCircleCheck,
  FaXmark,
} from "react-icons/fa6";

import "./FundsPage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/* =====================================================
   TOKEN
===================================================== */

const getToken = () => {
  return (
    localStorage.getItem("tradenest_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("tradenest_token") ||
    sessionStorage.getItem("token")
  );
};

/* =====================================================
   INITIAL FUNDS
===================================================== */

const INITIAL_FUNDS = {
  totalBalance: 0,
  availableBalance: 0,
  usedMargin: 0,
  withdrawable: 0,
};

/* =====================================================
   FUNDS PAGE
===================================================== */

function FundsPage() {
  const [funds, setFunds] = useState(INITIAL_FUNDS);

  const [amount, setAmount] = useState("");

  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [error, setError] = useState("");

  /* =====================================================
     FORMAT MONEY
  ===================================================== */

  const formatMoney = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  /* =====================================================
     LOAD FUNDS
  ===================================================== */

  const loadFunds = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`${API_URL}/funds`, {
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
      console.error("Funds loading error:", error);

      setError(error.message || "Unable to load funds.");
    } finally {
      setLoading(false);
    }
  }, []);

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    loadFunds();
  }, [loadFunds]);

  /* =====================================================
     FUND UPDATE LISTENER
  ===================================================== */

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

  /* =====================================================
     CLOSE MODALS
  ===================================================== */

  const closeModals = () => {
    if (processing) {
      return;
    }

    setAmount("");
    setShowAddMoney(false);
    setShowWithdraw(false);
  };

  /* =====================================================
     OPEN ADD MONEY
  ===================================================== */

  const openAddMoney = () => {
    setAmount("");
    setShowWithdraw(false);
    setShowAddMoney(true);
  };

  /* =====================================================
     OPEN WITHDRAW
  ===================================================== */

  const openWithdraw = () => {
    setAmount("");
    setShowAddMoney(false);
    setShowWithdraw(true);
  };

  /* =====================================================
     ADD MONEY
  ===================================================== */

  const handleAddMoney = async () => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      setProcessing(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`${API_URL}/funds/add`, {
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

      setAmount("");
      setShowAddMoney(false);

      window.dispatchEvent(new Event("tradenest-funds-update"));

      window.dispatchEvent(new Event("tradenest-update"));
    } catch (error) {
      console.error("Add money error:", error);

      setError(error.message || "Unable to add money.");
    } finally {
      setProcessing(false);
    }
  };

  /* =====================================================
     WITHDRAW MONEY
  ===================================================== */

  const handleWithdraw = async () => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (value > Number(funds.withdrawable || 0)) {
      setError("The withdrawal amount exceeds your withdrawable balance.");

      return;
    }

    try {
      setProcessing(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`${API_URL}/funds/withdraw`, {
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

      setAmount("");
      setShowWithdraw(false);

      window.dispatchEvent(new Event("tradenest-funds-update"));

      window.dispatchEvent(new Event("tradenest-update"));
    } catch (error) {
      console.error("Withdraw error:", error);

      setError(error.message || "Unable to withdraw money.");
    } finally {
      setProcessing(false);
    }
  };

  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && !processing) {
        closeModals();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [processing]);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <section className="fundsPage">
        <div className="fundLoadingCard">
          <div className="fundSpinner">
            <FaRotate />
          </div>

          <h3>Loading your funds</h3>

          <p>Please wait while we fetch your latest account balance.</p>
        </div>
      </section>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error && !showAddMoney && !showWithdraw) {
    return (
      <section className="fundsPage">
        <div className="fundError">
          <div className="fundErrorIcon">!</div>

          <h2>Unable to load funds</h2>

          <p>{error}</p>

          <button onClick={loadFunds}>
            <FaRotate />
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="fundsPage">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="fundsHeader">
        <div>
          <div className="fundPageTitle">
            <div className="fundPageIcon">
              <FaWallet />
            </div>

            <div>
              <h1>Funds</h1>

              <p>Manage your trading balance and available funds.</p>
            </div>
          </div>
        </div>

        <div className="fundHeaderActions">
          <button
            className="fundRefreshBtn"
            onClick={loadFunds}
            disabled={loading}
            title="Refresh funds"
          >
            <FaRotate />
            Refresh
          </button>

          <button className="addMoneyBtn" onClick={openAddMoney}>
            <FaPlus />
            Add Money
          </button>
        </div>
      </div>

      {/* =================================================
          BALANCE CARDS
      ================================================= */}

      <div className="fundCards">
        {/* Total */}

        <article className="fundCard totalFundCard">
          <div className="fundCardTop">
            <div className="fundCardIcon">
              <FaWallet />
            </div>

            <span className="fundCardBadge">Account</span>
          </div>

          <span className="fundCardLabel">Total Balance</span>

          <h2>{formatMoney(funds.totalBalance)}</h2>

          <small>Total funds in your account</small>
        </article>

        {/* Available */}

        <article className="fundCard availableFundCard">
          <div className="fundCardTop">
            <div className="fundCardIcon">
              <FaMoneyBillTransfer />
            </div>

            <span className="fundCardBadge successBadge">Available</span>
          </div>

          <span className="fundCardLabel">Available Balance</span>

          <h2>{formatMoney(funds.availableBalance)}</h2>

          <small>Available for trading</small>
        </article>

        {/* Used margin */}

        <article className="fundCard marginFundCard">
          <div className="fundCardTop">
            <div className="fundCardIcon">
              <FaArrowDown />
            </div>

            <span className="fundCardBadge">In Use</span>
          </div>

          <span className="fundCardLabel">Used Margin</span>

          <h2>{formatMoney(funds.usedMargin)}</h2>

          <small>Currently used for positions</small>
        </article>

        {/* Withdrawable */}

        <article className="fundCard withdrawFundCard">
          <div className="fundCardTop">
            <div className="fundCardIcon">
              <FaMoneyBillTransfer />
            </div>

            <span className="fundCardBadge successBadge">Ready</span>
          </div>

          <span className="fundCardLabel">Withdrawable</span>

          <h2>{formatMoney(funds.withdrawable)}</h2>

          <small>Available to withdraw</small>
        </article>
      </div>

      {/* =================================================
          FUND MANAGEMENT
      ================================================= */}

      <div className="fundSection">
        <div className="fundSectionHeader">
          <div>
            <h2>Fund Management</h2>

            <p>Add or withdraw money from your TradeNest account.</p>
          </div>
        </div>

        <div className="fundActions">
          {/* Add */}

          <div className="fundAction">
            <div className="fundActionIcon addActionIcon">
              <FaPlus />
            </div>

            <div className="fundActionContent">
              <h3>Add Money</h3>

              <p>
                Add funds to your trading account and increase your available
                balance.
              </p>
            </div>

            <button className="fundActionBtn" onClick={openAddMoney}>
              Add Money
            </button>
          </div>

          {/* Withdraw */}

          <div className="fundAction">
            <div className="fundActionIcon withdrawActionIcon">
              <FaArrowDown />
            </div>

            <div className="fundActionContent">
              <h3>Withdraw Money</h3>

              <p>
                Withdraw funds that are currently available from your account.
              </p>
            </div>

            <button className="fundActionBtn" onClick={openWithdraw}>
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
          ACCOUNT BALANCE
      ================================================= */}

      <div className="fundSection">
        <div className="fundSectionHeader">
          <div>
            <h2>Account Balance</h2>

            <p>Current balance information for your TradeNest account.</p>
          </div>
        </div>

        <div className="fundTransaction">
          <div className="fundTransactionIcon">
            <FaCircleCheck />
          </div>

          <div className="fundTransactionContent">
            <strong>Available Trading Balance</strong>

            <small>Funds currently available for placing trades</small>
          </div>

          <strong className="positiveFund">
            {formatMoney(funds.availableBalance)}
          </strong>
        </div>

        <div className="fundTransaction">
          <div className="fundTransactionIcon marginTransactionIcon">
            <FaArrowDown />
          </div>

          <div className="fundTransactionContent">
            <strong>Used Margin</strong>

            <small>Funds currently being used</small>
          </div>

          <strong>{formatMoney(funds.usedMargin)}</strong>
        </div>

        <div className="fundTransaction">
          <div className="fundTransactionIcon">
            <FaCircleCheck />
          </div>

          <div className="fundTransactionContent">
            <strong>Withdrawable Balance</strong>

            <small>Maximum amount currently available for withdrawal</small>
          </div>

          <strong className="positiveFund">
            {formatMoney(funds.withdrawable)}
          </strong>
        </div>
      </div>

      {/* =================================================
          ADD MONEY MODAL
      ================================================= */}

      {showAddMoney && (
        <div className="fundModalOverlay" onClick={closeModals}>
          <div
            className="fundModal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="fundModalHeader">
              <div className="modalTitleGroup">
                <div className="modalIcon addModalIcon">
                  <FaPlus />
                </div>

                <div>
                  <h2>Add Money</h2>

                  <p>Add funds to your trading account.</p>
                </div>
              </div>

              <button
                className="modalCloseBtn"
                onClick={closeModals}
                disabled={processing}
              >
                <FaXmark />
              </button>
            </div>

            <label className="fundModalLabel" htmlFor="addMoneyAmount">
              Amount
            </label>

            <div className="amountInputWrapper">
              <span>₹</span>

              <input
                id="addMoneyAmount"
                type="number"
                min="1"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                disabled={processing}
                autoFocus
              />
            </div>

            {error && <div className="fundModalError">{error}</div>}

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

      {/* =================================================
          WITHDRAW MODAL
      ================================================= */}

      {showWithdraw && (
        <div className="fundModalOverlay" onClick={closeModals}>
          <div
            className="fundModal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="fundModalHeader">
              <div className="modalTitleGroup">
                <div className="modalIcon withdrawModalIcon">
                  <FaArrowDown />
                </div>

                <div>
                  <h2>Withdraw Money</h2>

                  <p>Withdraw available funds.</p>
                </div>
              </div>

              <button
                className="modalCloseBtn"
                onClick={closeModals}
                disabled={processing}
              >
                <FaXmark />
              </button>
            </div>

            <div className="withdrawAvailable">
              <span>Available to withdraw</span>

              <strong>{formatMoney(funds.withdrawable)}</strong>
            </div>

            <label className="fundModalLabel" htmlFor="withdrawAmount">
              Amount
            </label>

            <div className="amountInputWrapper">
              <span>₹</span>

              <input
                id="withdrawAmount"
                type="number"
                min="1"
                max={funds.withdrawable}
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                disabled={processing}
                autoFocus
              />
            </div>

            {error && <div className="fundModalError">{error}</div>}

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
