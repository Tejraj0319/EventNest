// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../features/auth/authSlice";

// const SideBar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };
//   return (
//     <div>
//       <h2>Organizer Panel</h2>
//       <ul>
//         <li>
//           <Link to="/dashboard">Dashboard</Link>
//         </li>
//         <li>
//           <Link to="/create-event">Create Event</Link>
//         </li>
//         <li>
//           <Link to="/events">My Events </Link>
//         </li>
//         <li>
//           <Link to="/bookings">My Bookings </Link>
//         </li>
//       </ul>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default SideBar;

// Sidebar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
  LayoutDashboard,
  PlusCircle,
  CalendarDays,
  Ticket,
  LogOut,
  X,
} from "lucide-react";

const SideBar = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Create Event",
      path: "/create-event",
      icon: <PlusCircle size={20} />,
    },
    {
      name: "My Events",
      path: "/events",
      icon: <CalendarDays size={20} />,
    },
    {
      name: "My Bookings",
      path: "/bookings",
      icon: <Ticket size={20} />,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-slate-900 border-r border-slate-800 flex flex-col transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-800">
          <h2 className="text-xl font-bold text-cyan-400">Organizer Panel</h2>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-slate-300"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          {menus.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
              ${
                location.pathname === item.path
                  ? "bg-cyan-500 text-black"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
