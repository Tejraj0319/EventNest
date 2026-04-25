import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../features/admin/adminSlice";

function Bookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);
  return (
    <div>
      <h1>Users Page</h1>

      {bookings.map((booking) => (
        <div key={booking.id}>
          Booking ID: {booking.id} | User: {booking.user?.email} | Event:{" "}
          {booking.event?.title} | Qty: {booking.quantity} | Amount: ₹
          {booking.totalPrice} | Status: {booking.status}
        </div>
      ))}
    </div>
  );
}

export default Bookings;
