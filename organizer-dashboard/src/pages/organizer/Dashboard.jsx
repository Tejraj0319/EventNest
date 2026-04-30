import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../features/events/eventSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { events, loading } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Only organizer's events
  const myEvents = events.filter(
    (event) => event.organizerId === user.id
  );

  // Total events
  const totalEvents = myEvents.length;

  // Upcoming events
  const upcomingEvents = myEvents.filter(
    (event) => new Date(event.date) > new Date()
  ).length;

  // Total bookings
  const totalBookings = myEvents.reduce((total, event) => {
    return total + (event.totalSeats - event.availableSeats);
  }, 0);

  // Revenue
  const totalRevenue = myEvents.reduce((total, event) => {
    const bookedSeats = event.totalSeats - event.availableSeats;
    return total + bookedSeats * event.price;
  }, 0);

  if (loading) return <h2>Loading Dashboard...</h2>;

  return (
    <div>
      <h2>Organizer Dashboard</h2>

      <hr />

      <h3>Total Events: {totalEvents}</h3>

      <h3>Total Bookings: {totalBookings}</h3>

      <h3>Total Revenue: ₹{totalRevenue}</h3>

      <h3>Upcoming Events: {upcomingEvents}</h3>
    </div>
  );
};

export default Dashboard;
