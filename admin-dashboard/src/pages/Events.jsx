import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, fetchEvents } from "../features/admin/adminSlice";
import { toast } from "react-toastify";

function Events() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.admin);
  const eventsPerPage = 5;

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this event?");
    if (!confirmDelete) {
      return;
    }
    await dispatch(deleteEvent(id));
    dispatch(fetchEvents());
    toast.success("Event deleted successfully");
  };

  const filteredEvents = events.filter(
    (event) =>
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.title.toLowerCase().includes(search.toLowerCase()),
  );

  const lastIndex = currentPage * 5; // 10
  const firstIndex = lastIndex - eventsPerPage; // 5
  const currentEvents = filteredEvents.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Event Page</h1>
      <input
        type="text"
        placeholder="Search by location or title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {currentEvents?.length === 0 ? (
        <p>No events Found</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Seats</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event, index) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{event.price}</td>
                <td>{event.totalSeats}</td>
                <td>{event.location}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(event.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Events;
