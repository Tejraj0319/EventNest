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

  // pagination logic
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

  return (
    <div>
      <h2>My Bookings</h2>

      <input
        type="text"
        placeholder="Search by user/event"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Id</th>
              <th>User Email</th>
              <th>Event Title</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="ALL">All Status</option>
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="REFUNDED">REFUNDED</option>
                </select>
              </th>
              <th>Booked Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentBookings.length > 0 ? (
              currentBookings.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.user.email}</td>
                  <td>{item.event.title}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.totalPrice}</td>
                  <td>{item.status}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    {item.status === "CONFIRMED" ? (
                      <button
                        onClick={() => handleRefund(item.id)}
                        disabled={refundLoadingId === item.id}
                      >
                        {refundLoadingId === item.id
                          ? "Processing..."
                          : "Refund"}
                      </button>
                    ) : item.status === "REFUNDED" ? (
                      <button disabled>Refunded</button>
                    ) : (
                      <button disabled>Refund</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
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

export default Bookings;
