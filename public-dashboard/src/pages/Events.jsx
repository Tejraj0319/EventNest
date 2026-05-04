import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/events/eventsSlice";
import EventCard from "../components/EventCard";

const Events = () => {
  const dispatch = useDispatch();

  const { events, loading, error } = useSelector((state) => state.events);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const EVENTS_PER_PAGE = 12;

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  //Unique Categories
  const categories = ["All", ...new Set(events.map((e) => e.category))];

  //Filter Logic
  const filteredEvents = events.filter((e) => {
    const matchesCategory =
      selectedCategory === "All" || e.category === selectedCategory;
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // pegination
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const paginatedEvents = filteredEvents.slice(
    startIndex,
    startIndex + EVENTS_PER_PAGE,
  );

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Events</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* 🔹 LEFT FILTER */}
        <div className="md:w-1/4 md:sticky md:top-4 h-fit">
          <h2 className="font-semibold mb-2">Categories</h2>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-full border ${
                  selectedCategory === cat
                    ? "bg-amber-600 text-white"
                    : "bg-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🔹 RIGHT EVENTS */}
        <div className="md:w-3/4">
          <input
            type="text"
            placeholder="Search events by title or location"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full p-2 border rounded mb-3"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paginatedEvents.length > 0 ? (
              paginatedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p>No events found</p>
            )}
          </div>

          {/* 🔹 PAGINATION */}
          <div className="flex justify-center mt-6 gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1 ? "bg-black text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;


