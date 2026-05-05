import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";

const EventRow = ({ title, events }) => {
  const navigate = useNavigate();

  return (
    <div className="px-4 mt-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg md:text-xl font-bold">{title}</h2>

        <button
          onClick={() => navigate("/events")}
          className="text-red-500 font-semibold hover:underline"
        >
          See All →
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {events.map((event) => (
          <div key={event.id} className="w-[160px] md:w-[190px] lg:w-[220px] flex-shrink-0">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventRow;