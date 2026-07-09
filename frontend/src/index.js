import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import HomePage from "./Landing_Page/Home/HomePage";
import Signup from "./Landing_Page/Signup/Signiup";
import AboutPage from "./Landing_Page/About/AboutPage";
import ProductsPage from "./Landing_Page/Products/ProductsPage";
import InvestmentOfferings from "./Landing_Page/InvestmentOfferings/InvestmentPage";
import PricingPage from "./Landing_Page/Pricing/PricingPage";
import SupportPage from "./Landing_Page/Support/SupportPage";
import Navbar from "./Landing_Page/Navbar";
import Footer from "./Landing_Page/Footer";
import NotFound from "./Landing_Page/NotFound";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/about" element={<AboutPage />} />

      <Route path="/products" element={<ProductsPage />} />
      <Route path="/InvestmentOfferings" element={<InvestmentOfferings />} />

      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}

      <Route path="/*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>,
);
