import Hero from "./Hero";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Stocks from "./Stocks";
import MutualFunds from "./MutualFunds";

function InvestmentPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stocks />
      <MutualFunds />
      <Footer />
    </>
  );
}

export default InvestmentPage;
