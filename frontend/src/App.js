import { Routes, Route } from "react-router-dom";

import Navbar from "./Landing_Page/Navbar";
import Footer from "./Landing_Page/Footer";

import HomePage from "./Landing_Page/Home/HomePage";
import AboutPage from "./Landing_Page/About/AboutPage";
import ProductsPage from "./Landing_Page/Products/ProductsPage";
import PricingPage from "./Landing_Page/Pricing/PricingPage";
import SupportPage from "./Landing_Page/Support/SupportPage";
import OpenAccountPage from "./Landing_Page/OpenAccount/OpenAccountPage";

import SignupPage from "./Auth/Signup/SignupPage";
import LoginPage from "./Auth/Login/LoginPage";
import ForgotPasswordPage from "./Auth/ForgotPassword/ForgotPasswordPage";
import OTPPage from "./Auth/OTP/OTPPage";
import ResetPasswordPage from "./Auth/ResetPassword/ResetPasswordPage";

import DashboardPage from "./Dashboard/DashboardPage";
import NotFound from "./Landing_Page/NotFound";

function LandingLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingLayout>
            <HomePage />
          </LandingLayout>
        }
      />

      <Route
        path="/about"
        element={
          <LandingLayout>
            <AboutPage />
          </LandingLayout>
        }
      />

      <Route
        path="/products"
        element={
          <LandingLayout>
            <ProductsPage />
          </LandingLayout>
        }
      />

      <Route
        path="/pricing"
        element={
          <LandingLayout>
            <PricingPage />
          </LandingLayout>
        }
      />

      <Route
        path="/support"
        element={
          <LandingLayout>
            <SupportPage />
          </LandingLayout>
        }
      />

      <Route
        path="/open-account"
        element={
          <LandingLayout>
            <OpenAccountPage />
          </LandingLayout>
        }
      />

      <Route path="/signup" element={<SignupPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/otp" element={<OTPPage />} />

      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route path="/dashboard/*" element={<DashboardPage />} />

      
      {/* <Route path="/dashboard/*" element={<DashboardPage />} /> */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
