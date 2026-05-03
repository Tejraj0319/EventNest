// Sidebar is used for moving between dashboard pages quickly.
// Link prevents page reload and keeps React routing smooth.
// Logout button clears token from Redux/localStorage.
// After logout, user goes back to login page.
// Every professional admin panel uses sidebar navigation.

// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../features/auth/authSlice";

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   return (
//     <div>
//       <h2>Admin Panel</h2>
//       <ul>
//         <li>
//           <Link to="/dashboard">Dashboard</Link>
//         </li>
//         <li>
//           <Link to="/users">Users</Link>
//         </li>
//         <li>
//           <Link to="/events">Events</Link>
//         </li>
//         <li>
//           <Link to="/bookings">Bookings</Link>
//         </li>
//       </ul>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Sidebar;

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Ticket,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <Users size={18} />,
    },
    {
      name: "Events",
      path: "/events",
      icon: <CalendarDays size={18} />,
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: <Ticket size={18} />,
    },
  ];

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <h2 className="text-white font-bold text-lg">Admin Panel</h2>

        <button
          onClick={() => setOpen(true)}
          className="text-white p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-gray-950 border-r border-gray-800 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <h2 className="text-white font-bold text-lg">Admin Panel</h2>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <div className="p-4 flex flex-col h-[calc(100%-80px)]">
          <nav className="space-y-2 flex-1">
            {navLinks.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    active
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar Space */}
      <div className="hidden lg:block w-72 shrink-0"></div>

      {/* Mobile Spacer */}
      <div className="lg:hidden h-16"></div>
    </>
  );
};

export default Sidebar;










