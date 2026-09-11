import { Routes, Route } from "react-router-dom";

import Navbar from "./Landing_Page/Navbar";
import Footer from "./Landing_Page/Footer";

import HomePage from "./Landing_Page/Home/HomePage";
import AboutPage from "./Landing_Page/About/AboutPage";
import ProductsPage from "./Landing_Page/Products/ProductsPage";
import PricingPage from "./Landing_Page/Pricing/PricingPage";
import SupportPage from "./Landing_Page/Support/SupportPage";
import OpenAccountPage from "./Landing_Page/OpenAccount/OpenAccountPage";

// Investment Offerings
import InvestmentPage from "./Landing_Page/InvestmentOfferings/InvestmentPage";

// Auth
import SignupPage from "./Auth/Signup/SignupPage";
import LoginPage from "./Auth/Login/LoginPage";
import ForgotPasswordPage from "./Auth/ForgotPassword/ForgotPasswordPage";
import OTPPage from "./Auth/OTP/OTPPage";
import ResetPasswordPage from "./Auth/ResetPassword/ResetPasswordPage";

// Dashboard
import DashboardPage from "./Dashboard/DashboardPage";

// 404
import NotFound from "./Landing_Page/NotFound";

// Authentication protection
import ProtectedRoute from "./Auth/ProtectedRoute";


/* =========================================
   LANDING LAYOUT
========================================= */

function LandingLayout({ children }) {
  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
}


/* =========================================
   APP
========================================= */

function App() {
  return (
    <Routes>

      {/* =====================================
          LANDING PAGES
      ===================================== */}

      {/* HOME */}
      <Route
        path="/"
        element={
          <LandingLayout>
            <HomePage />
          </LandingLayout>
        }
      />

      {/* ABOUT */}
      <Route
        path="/about"
        element={
          <LandingLayout>
            <AboutPage />
          </LandingLayout>
        }
      />

      {/* PRODUCTS */}
      <Route
        path="/products"
        element={
          <LandingLayout>
            <ProductsPage />
          </LandingLayout>
        }
      />

      {/* PRICING */}
      <Route
        path="/pricing"
        element={
          <LandingLayout>
            <PricingPage />
          </LandingLayout>
        }
      />

      {/* SUPPORT */}
      <Route
        path="/support"
        element={
          <LandingLayout>
            <SupportPage />
          </LandingLayout>
        }
      />

      {/* =====================================
          OPEN ACCOUNT INFORMATION PAGE
      ===================================== */}

      <Route
        path="/open-account"
        element={
          <LandingLayout>
            <OpenAccountPage />
          </LandingLayout>
        }
      />

      {/* =====================================
          INVESTMENT OFFERINGS
      ===================================== */}

      <Route
        path="/investment-offerings"
        element={
          <LandingLayout>
            <InvestmentPage />
          </LandingLayout>
        }
      />

      {/* Old URL also works */}
      <Route
        path="/InvestmentOfferings"
        element={
          <LandingLayout>
            <InvestmentPage />
          </LandingLayout>
        }
      />

      {/* =====================================
          AUTHENTICATION
      ===================================== */}

      {/* ACTUAL SIGNUP PAGE */}
      <Route
        path="/signup"
        element={<SignupPage />}
      />

      {/* LOGIN PAGE */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* FORGOT PASSWORD */}
      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />

      {/* OTP */}
      <Route
        path="/otp"
        element={<OTPPage />}
      />

      {/* RESET PASSWORD */}
      <Route
        path="/reset-password"
        element={<ResetPasswordPage />}
      />

      {/* =====================================
          PROTECTED DASHBOARD
      ===================================== */}

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard/*"
          element={<DashboardPage />}
        />
      </Route>

      {/* =====================================
          404
      ===================================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;