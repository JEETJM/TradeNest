import React from "react";
// import Navbar from "../Navbar";
import Hero from "./Hero";

import Universe from "./Universe";
// import Footer from "../Footer";
import TradePro from "./TradePro";
import Console from "./Console";
import Coin from "./Coin";
import API from "./API";
import Learn from "./Learn";
import OpenAccount from "../OpenAccount"
function ProductsPage() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <TradePro />
      <Console />
      <Coin />
      <API />
      <Learn />

      <Universe />
      <OpenAccount />
      {/* <Footer /> */}
    </>
  );
}

export default ProductsPage;
