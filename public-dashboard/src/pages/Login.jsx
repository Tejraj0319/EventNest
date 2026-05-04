import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden">
        {/* VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/loging_page_video.mp4" type="video/mp4" />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative z-10 px-10 text-center">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Discover. Book. Experience.
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            Join thousands of users exploring concerts, tech events & workshops
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6 text-sm text-gray-200">
            <div>
              <p className="text-2xl font-bold text-white">500+</p>
              <p>Events</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">10K+</p>
              <p>Bookings</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">5K+</p>
              <p>Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-10 bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4">
        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Heading */}
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-gray-400 mt-2 text-sm">
              Login to book and manage your events
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-md">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none placeholder-gray-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none placeholder-gray-500"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-800 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Register */}
            <p className="text-center text-sm text-gray-400">
              New here?{" "}
              <Link
                to="/register"
                className="text-red-400 font-medium hover:underline"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
