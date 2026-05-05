// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchEventById } from "../features/events/eventsSlice";
// const EventDetails = () => {
//   const { id } = useParams();
//   console.log("FETCH BY ID:", id);
//   const dispatch = useDispatch();
//   const { selectedEvent, loading, error } = useSelector(
//     (state) => state.events,
//   );
//   useEffect(() => {
//     if (id) {
//       dispatch(fetchEventById(id));
//     }
//   }, [dispatch, id]);
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;
//   if (!selectedEvent) return <p>No event found</p>;
//   return (
//     <div>
//       <h1>{selectedEvent.title}</h1>
//       <p>{selectedEvent.description}</p>
//       <button>Book Now</button>
//     </div>
//   );
// };
// export default EventDetails;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEventById } from "../features/events/eventsSlice";
import { useState } from "react";
import {
  createBooking,
  verifyPayment,
} from "../features/bookings/bookingSlice";

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { selectedEvent, loading, error } = useSelector(
    (state) => state.events,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
  }, [dispatch, id]);

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;
  if (!selectedEvent) return <p className="text-white p-6">No event found</p>;

  const handleBooking = async () => {
    try {
      const res = await dispatch(
        createBooking({
          eventId: selectedEvent.id,
          quantity,
        }),
      ).unwrap();

      const booking = res.data;

      const options = {
        key: "rzp_test_SgV9hKCxHtxy2j",
        amount: booking.totalPrice * 100,
        currency: "INR",
        name: selectedEvent.title,
        description: "Event Booking",
        order_id: booking.orderId,

        handler: async function (response) {
          await dispatch(
            verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          );

          alert("Booking Confirmed!");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* HERO SECTION */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {selectedEvent.image ? (
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="w-full h-full object-cover opacity-60 scale-105 transition duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            No Image Available
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* Content on Image */}
        <div className="absolute bottom-10 left-6 md:left-12 max-w-2xl animate-fadeInUp">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            {selectedEvent.title}
          </h1>

          <p className="text-gray-300 text-sm md:text-base">
            {selectedEvent.location} • {selectedEvent.category}
          </p>

          <p className="text-gray-400 text-sm mt-1">
            {new Date(selectedEvent.date).toDateString()}
          </p>

          <p className="text-xl font-semibold mt-3">₹ {selectedEvent.price}</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
        {/* LEFT: Description */}
        <div className="md:col-span-2 animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4">About Event</h2>
          <div className="text-gray-300 leading-relaxed space-y-3 whitespace-pre-line">
            {selectedEvent.description}
          </div>
        </div>

        {/* RIGHT: Booking Card */}
        <div className="md:sticky md:top-24 h-fit">
          <div className="bg-[#111] rounded-2xl p-5 shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-3">Book Tickets</h3>

            <p className="text-gray-400 text-sm mb-2">
              Available Seats: {selectedEvent.availableSeats}
            </p>

            {selectedEvent.availableSeats < 10 && (
              <p className="text-red-400 text-sm mb-2">⚠ Few seats left!</p>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1 bg-gray-700 rounded"
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev < selectedEvent.availableSeats ? prev + 1 : prev,
                  )
                }
                className="px-3 py-1 bg-gray-700 rounded"
              >
                +
              </button>
            </div>

            {/* Total Price */}
            <p className="mt-2 text-sm text-gray-400">
              Total: ₹ {selectedEvent.price * quantity}
            </p>

            {/* Book Button */}
            <button
              onClick={handleBooking}
              className="w-full bg-white text-black py-2 rounded-lg font-semibold mt-3 hover:bg-gray-200 transition"
              disabled={selectedEvent.availableSeats === 0}
            >
              {selectedEvent.availableSeats === 0 ? "Sold Out" : "Book Now"}
            </button>
          </div>
        </div>
      </div>

      {/* SIMPLE ANIMATION STYLES */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default EventDetails;
