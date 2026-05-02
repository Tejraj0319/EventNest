import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyBookings,
  refundBooking,
} from "../../features/bookings/bookingSlice";

const Bookings = () => {
  const dispatch = useDispatch();

  const { bookings, loading, refundLoadingId } = useSelector(
    (state) => state.bookings,
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  const perPage = 5;

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchSearch =
      booking.user.email.toLowerCase().includes(search.toLowerCase()) ||
      booking.event.title.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "ALL" || booking.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // Pagination
  const lastIndex = page * 5;
  const firstIndex = lastIndex - perPage;
  const currentBookings = filteredBookings.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredBookings.length / perPage);

  const handleRefund = (id) => {
    const ok = window.confirm("Are you sure to refund?");
    if (ok) {
      dispatch(refundBooking(id));
    }
  };

  const refundButton = (item) => {
    if (item.status === "CONFIRMED") {
      return (
        <button
          onClick={() => handleRefund(item.id)}
          disabled={refundLoadingId === item.id}
          className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-medium"
        >
          {refundLoadingId === item.id ? "Processing..." : "Refund"}
        </button>
      );
    }

    if (item.status === "REFUNDED") {
      return (
        <button
          disabled
          className="px-4 py-2 rounded-xl bg-slate-700 text-slate-400"
        >
          Refunded
        </button>
      );
    }

    return (
      <button
        disabled
        className="px-4 py-2 rounded-xl bg-slate-700 text-slate-400"
      >
        Refund
      </button>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-cyan-400 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">My Bookings</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search by user/event"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-72 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500 outline-none"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="REFUNDED">REFUNDED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-4 py-4 text-left">Id</th>
              <th className="px-4 py-4 text-left">User Email</th>
              <th className="px-4 py-4 text-left">Event</th>
              <th className="px-4 py-4 text-left">Qty</th>
              <th className="px-4 py-4 text-left">Total</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Booked Date</th>
              <th className="px-4 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentBookings.length > 0 ? (
              currentBookings.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-800 hover:bg-slate-800/50 transition"
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">{item.user.email}</td>
                  <td className="px-4 py-4">{item.event.title}</td>
                  <td className="px-4 py-4">{item.quantity}</td>
                  <td className="px-4 py-4">₹{item.totalPrice}</td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "CONFIRMED"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "REFUNDED"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4">{refundButton(item)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-8 text-slate-400">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 lg:hidden">
        {currentBookings.length > 0 ? (
          currentBookings.map((item, index) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4"
            >
              <div className="space-y-2 text-sm">
                <h3 className="text-lg font-semibold">{item.event.title}</h3>

                <p className="text-slate-300">👤 {item.user.email}</p>

                <p className="text-slate-300">🎟 Quantity: {item.quantity}</p>

                <p className="text-slate-300">💰 ₹{item.totalPrice}</p>

                <p className="text-slate-300">
                  📅 {new Date(item.createdAt).toLocaleDateString()}
                </p>

                <p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "CONFIRMED"
                        ? "bg-green-500/20 text-green-400"
                        : item.status === "REFUNDED"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
              </div>

              <div className="mt-4">{refundButton(item)}</div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-400">
            No bookings found
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredBookings.length > 0 && (
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

export default Bookings;
