// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginAdmin } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, token, user } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginAdmin(form));
//   };

//   useEffect(() => {
//     if (token && user?.role === "ADMIN") {
//       navigate("/dashboard");
//     } else if (token && user?.role === "ORGANIZER") {
//       navigate("/organizer");
//     } else if (token && user?.role === "USER") {
//       navigate("/");
//     }
//   }, [token, user, navigate]);

//   return (
//     <div>
//       <h1>Admin Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="email"
//           placeholder="Enter email"
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="password"
//           placeholder="Enter password"
//           onChange={handleChange}
//         />
//         <button type="submit">{loading ? "Logging in..." : "Login"}</button>
//         {error && <p>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  BarChart3,
  Users,
  CalendarDays,
} from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token, user } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Background slider
  const images = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(slider);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(form));
  };

  useEffect(() => {
    if (token && user?.role === "ADMIN") {
      navigate("/dashboard");
    } else if (token && user?.role === "ORGANIZER") {
      navigate("/organizer");
    } else if (token && user?.role === "USER") {
      navigate("/");
    }
  }, [token, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT SIDE */}
        <div className="hidden lg:block relative min-h-[550px] overflow-hidden">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                current === index ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${img})`,
              }}
            />
          ))}

          <div className="absolute inset-0 bg-gray-950/75"></div>

          <div className="relative z-10 h-full flex flex-col justify-between p-10">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-indigo-600">
                  <ShieldCheck className="text-white" size={26} />
                </div>

                <h1 className="text-3xl font-bold text-white">
                  Admin Control Center
                </h1>
              </div>

              <h2 className="text-5xl font-bold text-white leading-tight">
                Manage Users.
                <br />
                Control Events.
                <br />
                Track Growth.
              </h2>

              <p className="text-gray-300 mt-5 text-lg max-w-xl">
                Powerful admin dashboard to monitor users, events, bookings,
                revenue and platform activity in real-time.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                  <Users className="text-cyan-400 mb-2" size={22} />
                  <p className="text-white font-semibold">Users</p>
                  <p className="text-gray-300 text-sm">Manage Roles</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                  <CalendarDays className="text-purple-400 mb-2" size={22} />
                  <p className="text-white font-semibold">Events</p>
                  <p className="text-gray-300 text-sm">Approve & Track</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                  <BarChart3 className="text-green-400 mb-2" size={22} />
                  <p className="text-white font-semibold">Reports</p>
                  <p className="text-gray-300 text-sm">Revenue Stats</p>
                </div>
              </div>

              {/* Dots */}
              <div className="flex gap-2 pt-2">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      current === i
                        ? "w-8 bg-indigo-500"
                        : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
          <div className="lg:hidden flex justify-center mb-8">
            <div className="p-4 rounded-2xl bg-indigo-600">
              <ShieldCheck className="text-white" size={28} />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Admin Login
          </h2>

          <p className="text-gray-200 mb-8">
            Use:-  admin@gmail.com / 123456
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter admin email"
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-indigo-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-11 pr-12 py-3 text-white outline-none focus:border-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center">
                {error}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              {loading ? "Logging in..." : "Login to Dashboard"}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-gray-500">
            © Event Management System • Admin Portal
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;