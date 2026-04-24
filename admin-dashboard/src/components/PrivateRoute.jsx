// This component checks whether user is logged in or not.
// We get token from Redux store because token means authenticated user.
// If token exists → allow access to requested page.
// If token missing → send user back to Login page.
// This protects private pages like dashboard, users, bookings.

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
