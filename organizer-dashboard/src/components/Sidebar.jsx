import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div>
      <h2>Organizer Panel</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/create-event">Create Event</Link>
        </li>
        <li>
          <Link to="/events">My Events </Link>
        </li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SideBar;
