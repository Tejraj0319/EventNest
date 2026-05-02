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

  // Search logic
  const filteredEvents = events.filter(
    (event) =>
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Delete this event?")) {
      dispatch(deleteEvent(id));
    }
  };

  // Pagination
  const lastIndex = page * 5;
  const firstIndex = lastIndex - perPage;
  const currentEvents = filteredEvents.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredEvents.length / perPage);

  if (loading)
    return (
      <div className="text-center py-10 text-cyan-400 text-lg font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="w-full text-white">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          My Events
        </h1>

        <input
          type="text"
          value={search}
          placeholder="Search by title or location"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500 outline-none"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-4 py-4 text-left">Title</th>
              <th className="px-4 py-4 text-left">Location</th>
              <th className="px-4 py-4 text-left">Date</th>
              <th className="px-4 py-4 text-left">Price</th>
              <th className="px-4 py-4 text-left">Seats</th>
              <th className="px-4 py-4 text-left">Available</th>
              <th className="px-4 py-4 text-left">Category</th>
              <th className="px-4 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentEvents.map((event) => (
              <tr
                key={event.id}
                className="border-t border-slate-800 hover:bg-slate-800/50 transition"
              >
                <td className="px-4 py-4">{event.title}</td>
                <td className="px-4 py-4">{event.location}</td>
                <td className="px-4 py-4">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-4">₹{event.price}</td>
                <td className="px-4 py-4">{event.totalSeats}</td>
                <td className="px-4 py-4">{event.availableSeats}</td>
                <td className="px-4 py-4">{event.category}</td>

                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-event/${event.id}`)}
                      className="px-3 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-black font-medium"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="grid gap-4 lg:hidden">
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4"
          >
            <div className="space-y-2 text-sm">

              <h2 className="text-lg font-semibold text-white">
                {event.title}
              </h2>

              <p className="text-slate-300">
                📍 {event.location}
              </p>

              <p className="text-slate-300">
                📅 {new Date(event.date).toLocaleDateString()}
              </p>

              <p className="text-slate-300">
                💰 ₹{event.price}
              </p>

              <p className="text-slate-300">
                🎟 Seats: {event.totalSeats}
              </p>

              <p className="text-slate-300">
                ✅ Available: {event.availableSeats}
              </p>

              <p className="text-slate-300">
                🏷 {event.category}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={() => navigate(`/edit-event/${event.id}`)}
                className="py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(event.id)}
                className="py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Data */}
      {currentEvents.length === 0 && (
        <div className="text-center py-10 text-slate-400">
          No events found.
        </div>
      )}

      {/* Pagination */}
      {filteredEvents.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-slate-300 text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyEvents;