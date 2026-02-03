import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import FullPageLoader from "../../../components/ui/spinner/FullPageLoader";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Renders the child route (e.g., Dashboard)
};

export default ProtectedRoute;
