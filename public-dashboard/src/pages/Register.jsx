// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, success } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) return;
//     dispatch(registerUser(formData));
//   };

//   useEffect(() => {
//     if (success) {
//       navigate("/login");
//     }
//   }, [success, navigate]);

//   return (
//     <div>
//       <h1>Register Page</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter Email"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Enter Password"
//           value={formData.password}
//           onChange={handleChange}
//         />

//         <button type="submit">{loading ? "Loading..." : "Register"}</button>

//         <p>
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;


import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.auth);

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
    if (!formData.email || !formData.password) return;
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 px-4 text-white">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-pink-500/20 blur-3xl rounded-full"></div>
      <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full right-0 top-20"></div>

      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl relative z-10">

        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold">Create Account 🚀</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Join the platform and start exploring events
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
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.4)] focus:outline-none placeholder-gray-500"
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
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.4)] focus:outline-none placeholder-gray-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          {/* Login */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-400 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;