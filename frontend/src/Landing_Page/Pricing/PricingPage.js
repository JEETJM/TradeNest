import React from "react";
import Hero from "./Hero";
import PricingCards from "./PricingCards";
import Charges from "./Charges";
import OtherCharges from "./OtherCharges";
import Calculators from "./Calculators";
import FAQ from "./FAQ";
import OpenAccount from "../OpenAccount";
function PricingPage() {
  return (
    <>
      <Hero />
      <PricingCards />
      <Charges />
      <OtherCharges />
      <Calculators />
      <FAQ />
      <OpenAccount />
    </>
  );
}

export default PricingPage;
