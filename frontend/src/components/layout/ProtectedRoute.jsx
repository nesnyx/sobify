import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const auth = localStorage.getItem("token");

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
