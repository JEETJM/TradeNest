import Hero from "./Hero";
// import Navbar from "../Navbar";
// import Footer from "../Footer";
import Stocks from "./Stocks";
import MutualFunds from "./MutualFunds";
import FuturesOptions from "./FuturesOptions";
import IPO from "./IPO";
import GiftStocks from "./GiftStocks";

import OpenAccount from "../OpenAccount";
import GovernmentBonds from "./GovernmentBonds";

function InvestmentPage() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <Stocks />
      <MutualFunds />
      <FuturesOptions />
      <IPO />
      <GiftStocks />
      <GovernmentBonds />
      <OpenAccount />
      {/* <Footer /> */}
    </>
  );
}

export default InvestmentPage;
