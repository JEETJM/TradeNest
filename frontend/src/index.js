import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import HomePage from "./Landing_Page/Home/HomePage";
import Signup from "./Landing_Page/Signup/Signiup";
import AboutPage from "./Landing_Page/About/AboutPage";
import ProductsPage from "./Landing_Page/Products/ProductsPage";
import PricingPage from "./Landing_Page/Home/Pricing";
import SupportPage from "./Landing_Page/Support/SupportPage";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/about" element={<AboutPage />} />

      <Route path="/products" element={<ProductsPage />} />

      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
    </Routes>
  </BrowserRouter>,
);
