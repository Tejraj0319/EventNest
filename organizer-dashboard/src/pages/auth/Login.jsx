import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginOrganizer } from "../../features/auth/authSlice";
import { CalendarDays, Mail, Lock } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Slider Images
  const images = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=80",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(slide);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginOrganizer(form));
  };

  useEffect(() => {
    if (token && user?.role === "ORGANIZER") {
      navigate("/dashboard", { replace: true });
    }
  }, [token, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* LEFT SIDE - IMAGE SLIDER */}
        <div className="hidden md:block relative min-h-[500px] overflow-hidden">
          {/* Images */}
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

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-950/65"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-10">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-5">
                <CalendarDays className="text-cyan-400" size={30} />
                <h1 className="text-2xl font-bold text-white">
                  Event Management
                </h1>
              </div>

              <h2 className="text-4xl font-bold text-white leading-tight">
                Host Stunning Events.
                <br />
                Manage Everything.
              </h2>

              <p className="text-slate-200 mt-4 max-w-md">
                Create events, handle bookings, track attendees and grow your
                audience with one dashboard.
              </p>
              <p className="mt-8 space-y-3 text-slate-200 text-lg font-semibold">
                Login:- organizer@gmail.com <br /> password:- 123456
              </p>
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-4">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === i ? "w-8 bg-cyan-400" : "w-2 bg-white/40"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Organizer Login
          </h2>

          <p className="text-slate-400 mb-8">
            Sign in to access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-3.5 text-slate-400"
                size={18}
              />

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-slate-400"
                size={18}
              />

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition"
            >
              {loading ? "Logging in..." : "Login to Dashboard"}
            </button>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
          </form>

          <p className="text-xs text-slate-500 mt-6 text-center">
            © Event Management System • Organizer Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
