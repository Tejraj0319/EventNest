import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginOrganizer } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
    <div>
      <h1>Organizer Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />

        <button type="submit">{loading ? "Logging in..." : "Login"}</button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
