import React from "react";
import "../Landing_Page/Home/styles/OpenAccount.css";
import { useNavigate, useLocation } from "react-router-dom";

function OpenAccount() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignupClick = () => {
    // যদি already signup page-এ থাকে
    if (location.pathname === "/signup") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    // অন্য যেকোনো page থেকে signup page
    navigate("/signup");
  };

  return (
    <section className="container open-account-section text-center">
      <h2 className="open-title">Open a TradeNest account</h2>

      <p className="open-description">
        Modern platform for investing and trading with ₹0 account opening,
        seamless investing, and flat ₹20 intraday & F&O brokerage.
      </p>

      <button
        type="button"
        className="btn open-btn"
        onClick={handleSignupClick}
      >
        Sign up for free
      </button>
    </section>
  );
}

export default OpenAccount;