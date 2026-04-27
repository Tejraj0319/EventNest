
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../features/admin/adminSlice";

function Bookings() {
  const dispatch = useDispatch();

  const { bookings, loading } = useSelector(
    (state) => state.admin
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const bookingsPerPage = 5;

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  // Search Filter
  const filteredBookings = bookings.filter((booking) => {
    const userEmail =
      booking.user?.email?.toLowerCase() || "";

    const eventTitle =
      booking.event?.title?.toLowerCase() || "";

    const status =
      booking.status?.toLowerCase() || "";

    return (
      userEmail.includes(search.toLowerCase()) ||
      eventTitle.includes(search.toLowerCase()) ||
      status.includes(search.toLowerCase())
    );
  });

  // Pagination
  const lastIndex = currentPage * bookingsPerPage;
  const firstIndex = lastIndex - bookingsPerPage;

  const currentBookings = filteredBookings.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    filteredBookings.length / bookingsPerPage
  );

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Bookings Page</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search user / event / status"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {filteredBookings.length === 0 ? (
        <p>No Bookings Found</p>
      ) : (
        <>
          <table
            border="1"
            cellPadding="10"
            cellSpacing="0"
            width="100%"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>User Email</th>
                <th>Event Title</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {currentBookings.map(
                (booking, index) => (
                  <tr key={booking.id}>
                    <td>
                      {firstIndex + index + 1}
                    </td>

                    <td>
                      {booking.user?.email}
                    </td>

                    <td>
                      {booking.event?.title}
                    </td>

                    <td>
                      {booking.quantity}
                    </td>

                    <td>
                      ₹{booking.totalPrice}
                    </td>

                    <td>
                      {booking.status}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ marginTop: "10px" }}>
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
            >
              Prev
            </button>

            <span
              style={{ margin: "0 10px" }}
            >
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Bookings;