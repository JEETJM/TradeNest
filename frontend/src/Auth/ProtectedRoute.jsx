import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "./auth";

function ProtectedRoute() {
  const location = useLocation();

  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
