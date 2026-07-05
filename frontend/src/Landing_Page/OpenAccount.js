import React from "react";
import "../Landing_Page/Home/styles/OpenAccount.css";

function OpenAccount() {
  return (
    <section className="container open-account-section text-center">
      <h2 className="open-title">Open a TradeNest account</h2>

      <p className="open-description">
        Modern platform for investing and trading with ₹0 account opening,
        seamless investing, and flat ₹20 intraday & F&O brokerage.
      </p>

      <button className="btn open-btn">Sign up for free</button>
    </section>
  );
}

export default OpenAccount;
