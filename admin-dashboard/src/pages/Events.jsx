// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteEvent, fetchEvents } from "../features/admin/adminSlice";
// import { toast } from "react-toastify";

// function Events() {
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const dispatch = useDispatch();
//   const { events, loading } = useSelector((state) => state.admin);
//   const eventsPerPage = 5;

//   useEffect(() => {
//     dispatch(fetchEvents());
//   }, [dispatch]);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure to delete this event?");
//     if (!confirmDelete) {
//       return;
//     }
//     await dispatch(deleteEvent(id));
//     dispatch(fetchEvents());
//     toast.success("Event deleted successfully");
//   };

//   const filteredEvents = events.filter(
//     (event) =>
//       event.location.toLowerCase().includes(search.toLowerCase()) ||
//       event.title.toLowerCase().includes(search.toLowerCase()),
//   );

//   const lastIndex = currentPage * 5; // 10
//   const firstIndex = lastIndex - eventsPerPage; // 5
//   const currentEvents = filteredEvents.slice(firstIndex, lastIndex);
//   const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

//   if (loading) return <h2>Loading...</h2>;

//   return (
//     <div>
//       <h1>Event Page</h1>
//       <input
//         type="text"
//         placeholder="Search by location or title"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {currentEvents?.length === 0 ? (
//         <p>No events Found</p>
//       ) : (
//         <table border="1" cellPadding="10" width="100%">
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Title</th>
//               <th>Price</th>
//               <th>Seats</th>
//               <th>Location</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentEvents.map((event, index) => (
//               <tr key={event.id}>
//                 <td>{event.id}</td>
//                 <td>{event.title}</td>
//                 <td>{event.price}</td>
//                 <td>{event.totalSeats}</td>
//                 <td>{event.location}</td>
//                 <td>
//                   <button
//                     onClick={() => {
//                       handleDelete(event.id);
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       <div>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           Prev
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(currentPage + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Events;
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
    if (!confirmDelete) return;

    await dispatch(deleteEvent(id));
    dispatch(fetchEvents());
    toast.success("Event deleted successfully");
  };

  const filteredEvents = events.filter(
    (event) =>
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.title.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = currentPage * eventsPerPage;
  const firstIndex = lastIndex - eventsPerPage;
  const currentEvents = filteredEvents.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  if (loading) {
    return <div className="text-center text-white py-10">Loading...</div>;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Events Management
        </h1>

        <input
          type="text"
          placeholder="Search by title or location..."
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
              <th className="px-3 py-3 text-left w-[90px]">ID</th>
              <th className="px-3 py-3 text-left w-[260px]">Title</th>
              <th className="px-3 py-3 text-left w-[120px]">Price</th>
              <th className="px-3 py-3 text-left w-[120px]">Seats</th>
              <th className="px-3 py-3 text-left w-[220px]">Location</th>
              <th className="px-3 py-3 text-left w-[130px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentEvents.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-400">
                  No Events Found
                </td>
              </tr>
            ) : (
              currentEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-t border-gray-800 hover:bg-gray-800/40 transition"
                >
                  <td className="px-3 py-3 text-white truncate">
                    {event.id}
                  </td>

                  <td className="px-3 py-3 text-gray-300 truncate">
                    {event.title}
                  </td>

                  <td className="px-3 py-3 text-gray-300 truncate">
                    ₹{event.price}
                  </td>

                  <td className="px-3 py-3 text-gray-300 truncate">
                    {event.totalSeats}
                  </td>

                  <td className="px-3 py-3 text-gray-300 truncate">
                    {event.location}
                  </td>

                  <td className="px-3 py-3">
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {currentEvents.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No Events Found
          </div>
        ) : (
          currentEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-4 space-y-3"
            >
              <div>
                <p className="text-gray-400 text-sm">ID</p>
                <p className="text-white break-all">{event.id}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Title</p>
                <p className="text-white break-words">{event.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-400 text-sm">Price</p>
                  <p className="text-white">₹{event.price}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Seats</p>
                  <p className="text-white">{event.totalSeats}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Location</p>
                <p className="text-white break-words">{event.location}</p>
              </div>

              <button
                onClick={() => handleDelete(event.id)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 rounded-xl bg-gray-800 text-white disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-gray-300 text-sm">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 rounded-xl bg-gray-800 text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Events;