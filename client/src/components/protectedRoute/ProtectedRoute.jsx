import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoute({ isAllowed, redirectTo = "/home" }) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
