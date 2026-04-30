import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/organizer/Dashboard";
import MyEvents from "../pages/organizer/MyEvents";
import CreateEvent from "../pages/organizer/CreateEvent";

import PrivateRoute from "../components/PrivateRoute";
import OrganizerLayout from "../components/OrganizerLayout";
import EditEvent from "../pages/organizer/EditEvent";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <OrganizerLayout>
              <Dashboard />
            </OrganizerLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/events"
        element={
          <PrivateRoute>
            <OrganizerLayout>
              <MyEvents />
            </OrganizerLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/create-event"
        element={
          <PrivateRoute>
            <OrganizerLayout>
              <CreateEvent />
            </OrganizerLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-event/:id"
        element={
          <PrivateRoute>
            <EditEvent />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
