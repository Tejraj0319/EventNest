import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);
  if (!token) return <Navigate to="/" />;
  if (user?.role !== "ORGANIZER") return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
