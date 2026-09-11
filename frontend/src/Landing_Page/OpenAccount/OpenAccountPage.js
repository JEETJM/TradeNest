import SignupHero from "./Hero/SignupHero";
import Investment from "./Investment/InvestmentOptions";
import Steps from "./Steps/Steps";
import Benefits from "./Benefits/Benefits";
import AccountTypes from "./AccountTypes/AccountTypes";
import FAQ from "./FAQ/FAQ";
import OpenAccount from "../OpenAccount";

function OpenAccountPage() {
  return (
    <>
      <SignupHero />
      <Investment />
      <Steps />
      <Benefits />
      <AccountTypes />
      <FAQ />
      <OpenAccount />
    </>
  );
}

export default OpenAccountPage;