// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllRequests,
//   approveRequest,
//   rejectRequest,
// } from "../features/organizer/organizerSlice";

// const OrganizerRequests = () => {
//   const dispatch = useDispatch();
//   const { requests } = useSelector((state) => state.organizer);

//   useEffect(() => {
//     dispatch(getAllRequests());
//   }, [dispatch]);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl mb-4">Organizer Requests</h2>

//       {requests.map((req) => (
//         <div key={req.id} className="border p-3 mb-3">
//           <p>
//             <b>{req.fullName}</b> ({req.user.email})
//           </p>
//           <p>{req.experience}</p>

//           <div className="flex gap-2 mt-2">
//             <button
//               onClick={() => dispatch(approveRequest(req.id))}
//               className="bg-green-500 text-white px-2"
//             >
//               Approve
//             </button>

//             <button
//               onClick={() => dispatch(rejectRequest(req.id))}
//               className="bg-red-500 text-white px-2"
//             >
//               Reject
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrganizerRequests;




import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRequests,
  approveRequest,
  rejectRequest,
} from "../features/organizer/organizerSlice";

const OrganizerRequests = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.organizer);

  useEffect(() => {
    dispatch(getAllRequests());
  }, [dispatch]);

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-wide">
          Organizer Requests
        </h2>
        <span className="text-sm text-gray-400">
          Total: {requests.length}
        </span>
      </div>

      {/* Empty State */}
      {requests.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          No pending requests
        </div>
      )}

      {/* Requests Grid */}
      <div className="grid gap-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Top Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {req.fullName}
                </h3>
                <p className="text-sm text-gray-400">
                  {req.user.email}
                </p>
              </div>

              <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 mt-2 sm:mt-0">
                {req.status}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <span className="text-gray-400">📞 Phone:</span> {req.phone}
              </p>

              {req.organization && (
                <p>
                  <span className="text-gray-400">🏢 Org:</span>{" "}
                  {req.organization}
                </p>
              )}

              <p>
                <span className="text-gray-400">🎯 Event Type:</span>{" "}
                {req.eventType}
              </p>

              <p>
                <span className="text-gray-400">🧠 Experience:</span>{" "}
                {req.experience}
              </p>

              {req.message && (
                <p>
                  <span className="text-gray-400">💬 Message:</span>{" "}
                  {req.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => dispatch(approveRequest(req.id))}
                className="flex-1 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-all text-sm font-medium"
              >
                Approve
              </button>

              <button
                onClick={() => dispatch(rejectRequest(req.id))}
                className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-all text-sm font-medium"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizerRequests;