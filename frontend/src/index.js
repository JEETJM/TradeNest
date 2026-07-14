import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import HomePage from "./Landing_Page/Home/HomePage";
import OpenAccountPage from "./Landing_Page/OpenAccount/OpenAccountPage";
import AboutPage from "./Landing_Page/About/AboutPage";
import ProductsPage from "./Landing_Page/Products/ProductsPage";
import InvestmentOfferings from "./Landing_Page/InvestmentOfferings/InvestmentPage";
import PricingPage from "./Landing_Page/Pricing/PricingPage";
import SupportPage from "./Landing_Page/Support/SupportPage";
import Navbar from "./Landing_Page/Navbar";
import Footer from "./Landing_Page/Footer";
import NotFound from "./Landing_Page/NotFound";
import SignupPage from "./Auth/Signup/SignupPage";
import LoginPage from "./Auth/Login/LoginPage";
import ForgotPasswordPage from "./Auth/ForgotPassword/ForgotPasswordPage";
import OTPPage from "./Auth/OTP/OTPPage";
import ResetPasswordPage from "./Auth/ResetPassword/ResetPasswordPage";
import DashboardPage from "./Dashboard/DashboardPage";
import PortfolioChart from "./Dashboard/Charts/PortfolioChart";
import Watchlist from "./Dashboard/Watchlist/Watchlist";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/open-account" element={<OpenAccountPage />} />

      <Route path="/about" element={<AboutPage />} />

      <Route path="/products" element={<ProductsPage />} />
      <Route path="/InvestmentOfferings" element={<InvestmentOfferings />} />

      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/Watchlist" element={<Watchlist />} />
      <Route path="/PortfolioChart" element={<PortfolioChart />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>,
);
