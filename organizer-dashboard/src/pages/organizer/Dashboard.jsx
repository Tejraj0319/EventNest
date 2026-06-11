import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../features/events/eventSlice";
import { CalendarDays, Ticket, IndianRupee, Clock3 } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { events, loading } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Only organizer events fetch by id
  const myEvents = events.filter((event) => event.organizerId === user.id);

  // count total events
  const totalEvents = myEvents.length;

  // upcoming events count
  const upcomingEvents = myEvents.filter(
    (event) => new Date(event.date) > new Date(),
  ).length;

  // total bookings
  const totalBookings = myEvents.reduce((total, event) => {
    return total + (event.totalSeats - event.availableSeats);
  }, 0);

  // total revenue
  const totalRevenue = myEvents.reduce((total, event) => {
    const bookedSeats = event.totalSeats - event.availableSeats;
    return total + bookedSeats * event.price;
  }, 0);

  // seat occupancy(this includes total seats of all events)
  const totalSeats = myEvents.reduce((sum, event) => sum + event.totalSeats, 0);

  const soldPercent =
    totalSeats > 0 ? Math.round((totalBookings / totalSeats) * 100) : 0;

  // recent events (sorted by date, latest first, limit to 4)
  const recentEvents = [...myEvents]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  if (loading)
    return (
      <div className="text-center py-10 text-cyan-400 text-lg font-semibold">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Organizer Dashboard</h2>

        <p className="text-slate-400 mt-2 text-sm">
          Welcome back, {user?.name || "Organizer"}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total Events */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-cyan-500/20 to-cyan-700/10 border border-cyan-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-300 text-sm">Total Events</p>
              <h3 className="text-3xl font-bold mt-2">{totalEvents}</h3>
            </div>

            <CalendarDays className="text-cyan-400" />
          </div>
        </div>

        {/* Bookings */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-purple-500/20 to-purple-700/10 border border-purple-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-300 text-sm">Total Bookings</p>
              <h3 className="text-3xl font-bold mt-2">{totalBookings}</h3>
            </div>

            <Ticket className="text-purple-400" />
          </div>
        </div>

        {/* Revenue */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-emerald-500/20 to-emerald-700/10 border border-emerald-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-300 text-sm">Revenue</p>
              <h3 className="text-3xl font-bold mt-2">₹{totalRevenue}</h3>
            </div>

            <IndianRupee className="text-emerald-400" />
          </div>
        </div>

        {/* Upcoming */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-orange-500/20 to-orange-700/10 border border-orange-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-300 text-sm">Upcoming Events</p>
              <h3 className="text-3xl font-bold mt-2">{upcomingEvents}</h3>
            </div>

            <Clock3 className="text-orange-400" />
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">
        {/* Progress Card */}
        <div className="xl:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="font-semibold text-lg mb-5">Seat Occupancy</h3>

          <div className="relative w-full h-4 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 rounded-full"
              style={{ width: `${soldPercent}%` }}
            ></div>
          </div>

          <div className="flex justify-between mt-3 text-sm text-slate-400">
            <span>{totalBookings} Booked</span>
            <span>{soldPercent}% Filled</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-slate-400 text-sm">Total Seats</p>
              <h4 className="text-xl font-bold mt-1">{totalSeats}</h4>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-slate-400 text-sm">Available</p>
              <h4 className="text-xl font-bold mt-1">
                {totalSeats - totalBookings}
              </h4>
            </div>
          </div>
        </div>

        {/* Revenue Graph */}
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 overflow-hidden">
          <h3 className="font-semibold text-lg mb-5">Revenue Overview</h3>

          <div className="overflow-x-auto">
            <div className="flex items-end gap-3 h-56 min-w-[520px] sm:min-w-full">
              {myEvents.slice(0, 6).map((event, index) => {
                const booked = event.totalSeats - event.availableSeats;
                const revenue = booked * event.price;

                const maxRevenue = Math.max(
                  ...myEvents.map((e) => {
                    const b = e.totalSeats - e.availableSeats;
                    return b * e.price;
                  }),
                  1,
                );

                const barHeight = (revenue / maxRevenue) * 180;

                return (
                  <div
                    key={index}
                    className="w-20 sm:flex-1 flex flex-col justify-end items-center h-full shrink-0"
                  >
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-cyan-500 to-cyan-300 transition-all duration-700"
                      style={{
                        height: `${Math.max(barHeight, 20)}px`,
                      }}
                    ></div>

                    <p className="text-[10px] text-slate-400 mt-2 text-center truncate w-full">
                      {event.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h3 className="font-semibold text-lg mb-5">Recent Events</h3>

        {recentEvents.length > 0 ? (
          <div className="grid gap-4">
            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-slate-800 rounded-xl p-4"
              >
                <div>
                  <h4 className="font-semibold">{event.title}</h4>

                  <p className="text-sm text-slate-400 mt-1">
                    {event.location}
                  </p>
                </div>

                <div className="text-sm text-slate-400">
                  {new Date(event.date).toLocaleDateString()}
                </div>

                <div className="text-cyan-400 font-semibold">
                  ₹{event.price}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
