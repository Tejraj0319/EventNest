import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/admin/adminSlice";

function Events() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  return (
    <div>
      <h1>Users Page</h1>

      {events.map((event) => (
        <div key={event.id}>
          {event.id} | {event.title} | ₹{event.price} | Seats:{" "}
          {event.availableSeats}/{event.totalSeats} | Location: {event.location}
        </div>
      ))}
    </div>
  );
}

export default Events;
