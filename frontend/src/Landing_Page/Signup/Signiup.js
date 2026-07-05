import Footer from "../Footer";
import Navbar from "../Navbar";
import SignupHero from "./Hero/SignupHero";
import Investment from "./Investment/InvestmentOptions";
import Steps from "./Steps/Steps";
function SignupPage() {
  return (
    <>
      <Navbar />
      <SignupHero />
      <Investment />
      <Steps />
      <Footer />
    </>
  );
}

export default SignupPage;
