
// import { useNavigate } from "react-router-dom";

// const EventCard = ({ event }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       onClick={() => navigate(`/events/${event.slug}`)}
//       className="cursor-pointer group flex flex-col w-full"
//     >
//       {/* Image Container with Date Overlay */}
//       <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-200">
//         {event.image ? (
//           <img
//             src={event.image}
//             alt={event.title}
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-500 text-sm">
//             No Image Available
//           </div>
//         )}
        
//         {/* Date Label (Black bar at the bottom of image) */}
//         <div className="absolute bottom-0 left-0 w-full bg-black/90 py-1 px-3">
//           <p className="text-white text-xs font-medium">
//             {event.date.split('T')[0]|| "Sat, 9 May onwards"}
//           </p>
//         </div>
//       </div>

//       {/* Metadata Section */}
//       <div className="mt-2 mb-6 flex flex-col gap-0.5">
//         <h3 className="text-lg font-bold text-gray-200 leading-tight line-clamp-1">
//           {event.title}
//         </h3>
//         <p className="text-sm text-gray-400 line-clamp-1">
//           {event.location || "Beer & Beans: Baner, Pune"}
//         </p>
//         <p className="text-sm text-gray-400">
//           {event.category || "Arts and Crafts"}
//         </p>
//         <p className="text-sm font-semibold text-gray-400 mt-1">
//           ₹ {event.price || "999"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default EventCard;



import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/events/${event.slug}`)}
      className="cursor-pointer group flex flex-col w-full transition-all duration-300"
    >
      {/* 🔥 Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-800 shadow-md group-hover:shadow-xl transition">

        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            No Image Available
          </div>
        )}

        {/* 🔥 Dark Gradient Overlay (Premium feel) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition"></div>

        {/* 🔥 Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold">
            View Details
          </span>
        </div>

        {/* 📅 Date Label */}
        <div className="absolute bottom-0 left-0 w-full bg-black/80 py-1 px-3">
          <p className="text-white text-xs font-medium">
            {event.date?.split("T")[0] || "Sat, 9 May onwards"}
          </p>
        </div>
      </div>

      {/* 📝 Metadata */}
      <div className="mt-2 mb-6 flex flex-col gap-0.5 px-1">
        <h3 className="text-sm md:text-base font-semibold text-white leading-tight line-clamp-1 group-hover:text-red-400 transition">
          {event.title}
        </h3>

        <p className="text-xs text-gray-400 line-clamp-1">
          {event.location || "Beer & Beans: Baner, Pune"}
        </p>

        <p className="text-xs text-gray-400">
          {event.category || "Arts and Crafts"}
        </p>

        <p className="text-sm font-semibold text-gray-200 mt-1">
          ₹ {event.price || "999"}
        </p>
      </div>
    </div>
  );
};

export default EventCard;