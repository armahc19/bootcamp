import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user, loading, role } = useAuth();

  // Still checking Firebase?
  if (loading) return <div className="p-6 text-center">Loading...</div>;

  // User not logged in?
  if (!user) return <Navigate to="/login" replace />;

  // User logged in but role not allowed?
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  // Everything OK
  return <>{children}</>;
};

export default ProtectedRoute;
