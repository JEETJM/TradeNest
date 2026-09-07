import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const location = useLocation();

  const localToken =
    localStorage.getItem("tradenest_token");

  const sessionToken =
    sessionStorage.getItem("tradenest_token");

  const token = localToken || sessionToken;

  console.log(
    "🔐 ProtectedRoute token:",
    !!token,
  );

  /* =====================================================
     NOT LOGGED IN
  ===================================================== */

  if (!token) {
    console.log(
      "❌ No token found. Redirecting to login.",
    );

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  /* =====================================================
     LOGGED IN
  ===================================================== */

  console.log(
    "✅ Token found. Access granted.",
  );

  return <Outlet />;
}

export default ProtectedRoute;