import React from "react";
import Navbar from "../Navbar";
import Awards from "./Awards";
import Hero from "./Hero";
import Trust from "./Trust";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import OpenAccount from "../OpenAccount";
import Footer from "../Footer";
function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trust />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
      <Footer />
    </>
  );
}

export default HomePage;
