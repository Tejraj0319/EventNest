// Sidebar is used for moving between dashboard pages quickly.
// Link prevents page reload and keeps React routing smooth.
// Logout button clears token from Redux/localStorage.
// After logout, user goes back to login page.
// Every professional admin panel uses sidebar navigation.

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/bookings">Bookings</Link>
        </li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
