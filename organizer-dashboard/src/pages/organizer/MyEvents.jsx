import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvents,
  deleteEvent,
  fetchMyEvents,
} from "../../features/events/eventSlice";
import { useNavigate } from "react-router-dom";

const MyEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, loading } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    dispatch(fetchMyEvents());
  }, [dispatch]);

  //search logic
  const filteredEvents = events.filter(
    (event) =>
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id) => {
    if (window.confirm("Delete this event?")) {
      dispatch(deleteEvent(id));
    }
  };

  // pagination logic
  const lastIndex = page * 5;
  const firstIndex = lastIndex - perPage;
  const currentEvents = filteredEvents.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredEvents.length / perPage);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>My Events</h1>

      <input
        type="text"
        value={search}
        placeholder="Search by title or location"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Date</th>
            <th>Price</th>
            <th>Seats</th>
            <th>Available Seats</th>
            <th>Action</th>
            <th>category</th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.location}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.price}</td>
              <td>{event.totalSeats}</td>
              <td>{event.availableSeats}</td>
              <td>
                <button onClick={() => handleDelete(event.id)}>Delete</button>
                <button onClick={() => navigate(`/edit-event/${event.id}`)}>
                  Edit
                </button>
              </td>
              <td>{event.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyEvents;

// Frontend Login → Token Saved
//         ↓
// Open My Events Page
//         ↓
// React useEffect runs
//         ↓
// Redux dispatch(fetchMyEvents())
//         ↓
// Axios GET /events/my-events
//         ↓
// JWT Token sent in Header
//         ↓
// Backend authMiddleware verifies token
//         ↓
// req.user created
//         ↓
// Controller calls Service
//         ↓
// Prisma finds events where organizerId = req.user.id
//         ↓
// Data returns to frontend
//         ↓
// Redux stores events
//         ↓
// React renders table
