import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/70 backdrop-blur-md text-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl font-bold">
          <Link to="/">EventNest</Link>
        </h1>

        {/* Desktop Links (CENTER) */}
        <div className="hidden md:flex flex-1 justify-center gap-6">
          
          {/* Always visible */}
          <Link className="hover:text-gray-300" to="/about">
            About
          </Link>

          {/* Only for USER */}
          {token && user?.role === "USER" && (
            <Link className="hover:text-gray-300" to="/become-organizer">
              Become Organizer
            </Link>
          )}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {!token ? (
            <>
              <Link
                className="px-3 py-1 border rounded hover:bg-gray-700"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
                to="/register"
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

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-3 bg-gray-900 border border-gray-800 rounded-lg p-4">

          {/* Always visible */}
          <Link to="/about" onClick={() => setOpen(false)}>
            About Us
          </Link>

          {/* Only for USER */}
          {token && user?.role === "USER" && (
            <Link to="/become-organizer" onClick={() => setOpen(false)}>
              Become Organizer
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;