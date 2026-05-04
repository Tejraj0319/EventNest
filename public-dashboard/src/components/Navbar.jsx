import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-gray-900 text-white">
      
      {/* Logo / Brand */}
      <h1 className="text-xl font-bold">
        <Link to="/">EventApp</Link>
      </h1>

      {/* Links */}
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>

        {!token ? (
          <>
            <Link
              to="/login"
              className="px-3 py-1 border rounded hover:bg-gray-700"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;