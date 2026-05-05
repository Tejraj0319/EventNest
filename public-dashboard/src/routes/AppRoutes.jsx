import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import ProtectedRoute from "../components/ProtectedRoute";
import BecomeOrganizer from "../pages/BecomeOrganizer";
import About from "../pages/About";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="become-organizer" element={<BecomeOrganizer />} />
        <Route path="about" element={<About />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
