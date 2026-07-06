import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import HomePage from "./Landing_Page/Home/HomePage";
import Signup from "./Landing_Page/Signup/Signiup";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/signup" element={<Signup />}></Route>

      <Route path="/about" element={<HomePage />}></Route>

      <Route path="/products" element={<HomePage />}></Route>

      <Route path="/pricing" element={<HomePage />}></Route>
      <Route path="/support" element={<HomePage />}></Route>
    </Routes>
  </BrowserRouter>,
);
