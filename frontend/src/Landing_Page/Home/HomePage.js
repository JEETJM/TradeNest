import React from "react";
// import Navbar from "../Navbar";
import Awards from "./Awards";
import Hero from "./Hero";
import Stats from "./Stats";
import Kite from "./Kite";
import Pricing from "./Pricing";
import Education from "./Education";
import OpenAccount from "../OpenAccount";
// import Footer from "../Footer";
function HomePage() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <Awards />
      <Stats />
      <Kite />
      <Pricing />
      <Education />
      <OpenAccount />
      {/* <Footer /> */}
    </>
  );
}

export default HomePage;
