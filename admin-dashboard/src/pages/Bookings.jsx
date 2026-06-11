import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../features/admin/adminSlice";

function Bookings() {
  const dispatch = useDispatch();

  const { bookings, loading } = useSelector((state) => state.admin);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const bookingsPerPage = 5;

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  // Search Filter
  const filteredBookings = bookings.filter((booking) => {
    const userEmail = booking.user?.email?.toLowerCase() || "";
    const eventTitle = booking.event?.title?.toLowerCase() || "";
    const status = booking.status?.toLowerCase() || "";

    return (
      userEmail.includes(search.toLowerCase()) ||
      eventTitle.includes(search.toLowerCase()) ||
      status.includes(search.toLowerCase())
    );
  });

  // Pagination
  const lastIndex = currentPage * bookingsPerPage;
  const firstIndex = lastIndex - bookingsPerPage;

  const currentBookings = filteredBookings.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(
    filteredBookings.length / bookingsPerPage
  );

  const getStatusStyle = (status) => {
    const value = status?.toLowerCase();

    if (value === "confirmed") {
      return "bg-green-500/20 text-green-400";
    }

    if (value === "pending") {
      return "bg-yellow-500/20 text-yellow-400";
    }

    if (value === "cancelled") {
      return "bg-red-500/20 text-red-400";
    }

    return "bg-blue-500/20 text-blue-400";
  };

  if (loading) {
    return <div className="text-center text-white py-10">Loading...</div>;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Bookings Management
        </h1>

        <input
          type="text"
          placeholder="Search user / event / status..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-80 bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-xl outline-none focus:border-indigo-500"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-3 py-3 text-left w-[70px]">#</th>
              <th className="px-3 py-3 text-left w-[250px]">User Email</th>
              <th className="px-3 py-3 text-left w-[240px]">Event Title</th>
              <th className="px-3 py-3 text-left w-[90px]">Qty</th>
              <th className="px-3 py-3 text-left w-[130px]">Amount</th>
              <th className="px-3 py-3 text-left w-[130px]">Status</th>
            </tr>
          </thead>

          <tbody>
            {currentBookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-400">
                  No Bookings Found
                </td>
              </tr>
            ) : (
              currentBookings.map((booking, index) => (
                <tr
                  key={booking.id}
                  className="border-t border-gray-800 hover:bg-gray-800/40 transition"
                >
                  <td className="px-3 py-3 text-white">
                    {firstIndex + index + 1}
                  </td>

                  <td className="px-3 py-3 text-gray-300 truncate">
                    {booking.user?.email}
                  </td>

                  <td className="px-3 py-3 text-gray-300 truncate">
                    {booking.event?.title}
                  </td>

                  <td className="px-3 py-3 text-gray-300">
                    {booking.quantity}
                  </td>

                  <td className="px-3 py-3 text-gray-300">
                    ₹{booking.totalPrice}
                  </td>

                  <td className="px-3 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {currentBookings.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No Bookings Found
          </div>
        ) : (
          currentBookings.map((booking, index) => (
            <div
              key={booking.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-4 space-y-3"
            >
              <div className="flex justify-between">
                <span className="text-gray-400">#</span>
                <span className="text-white">
                  {firstIndex + index + 1}
                </span>
              </div>

              <div>
                <p className="text-gray-400 text-sm">User Email</p>
                <p className="text-white break-all">
                  {booking.user?.email}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Event Title</p>
                <p className="text-white break-words">
                  {booking.event?.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-400 text-sm">Qty</p>
                  <p className="text-white">{booking.quantity}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Amount</p>
                  <p className="text-white">
                    ₹{booking.totalPrice}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          className="px-4 py-2 rounded-xl bg-gray-800 text-white disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-gray-300 text-sm">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          className="px-4 py-2 rounded-xl bg-gray-800 text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Bookings;