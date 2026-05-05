import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../features/bookings/bookingSlice";

const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getUserBookings());
  }, [dispatch]);

  if (!bookings || bookings.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-2">No Bookings Yet</h1>
        <p className="text-gray-400">
          Book your first event and it will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        My Bookings
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-2xl p-5 shadow-lg hover:scale-[1.02] transition duration-300"
          >
            {/* Event Title */}
            <h2 className="text-xl font-semibold mb-2">
              {b.event.title}
            </h2>

            {/* Info */}
            <p className="text-gray-400 text-sm">
              Date: {new Date(b.event.date).toDateString()}
            </p>

            <p className="text-gray-400 text-sm">
              Location: {b.event.location}
            </p>

            <div className="mt-3 space-y-1 text-sm">
              <p>Seats: {b.quantity}</p>
              <p>₹: {b.totalPrice}</p>

              {/* Status Badge */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                  b.status === "CONFIRMED"
                    ? "bg-green-500/20 text-green-400"
                    : b.status === "PENDING"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : b.status === "CANCELLED"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-gray-500/20 text-gray-300"
                }`}
              >
                {b.status}
              </span>
            </div>

            {/* QR Code */}
            {b.qrCode && (
              <div className="mt-4 flex justify-center">
                <img
                  src={b.qrCode}
                  alt="QR"
                  className="w-28 h-28 bg-white p-2 rounded-lg"
                />
              </div>
            )}

            {/* Footer */}
            <div className="mt-4 text-xs text-gray-500 text-center">
              Booking ID: #{b.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;