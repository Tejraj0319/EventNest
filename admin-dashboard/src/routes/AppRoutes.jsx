import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import AdminLayout from "../components/AdminLayout";
import Users from "../pages/Users";
import Events from "../pages/Events";
import Bookings from "../pages/Bookings";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Events />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Bookings />
              </AdminLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
