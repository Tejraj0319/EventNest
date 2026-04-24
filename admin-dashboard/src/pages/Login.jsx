import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

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
    dispatch(loginAdmin(form));
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
        <input
          type="text"
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
