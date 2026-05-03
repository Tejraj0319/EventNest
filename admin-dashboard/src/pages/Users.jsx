// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchUsers,
//   updateRole,
//   blockUser,
// } from "../features/admin/adminSlice";
// import { toast } from "react-toastify";

// function Users() {
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 5;

//   const dispatch = useDispatch();

//   const { users, loading } = useSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const handleRoleChange = async (id, role) => {
//     await dispatch(updateRole({ id, role }));
//     dispatch(fetchUsers());
//     toast.success("Role updated successfully");
//   };

//   const handleBlockUser = async (id, currentStatus) => {
//     await dispatch(
//       blockUser({
//         id,
//         isBlocked: !currentStatus,
//       }),
//     );
//     dispatch(fetchUsers());
//     toast.success("User status updated");
//   };

//   const filteredUsers = users.filter((user) =>
//     user.email.toLowerCase().includes(search.toLowerCase()),
//   );

//   const lastIndex = currentPage * usersPerPage; // 10
//   const firstIndex = lastIndex - usersPerPage; // 5

//   const currentUsers = filteredUsers.slice(firstIndex, lastIndex);

//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   if (loading) return <h2>Loading...</h2>;

//   return (
//     <div>
//       <h1>Users Page</h1>
//       <input
//         type="text"
//         placeholder="Search by email"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {currentUsers?.length === 0 ? (
//         <p>No Users Found</p>
//       ) : (
//         <table border="1" cellPadding="10" cellSpacing="0" width="100%">
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Change Role</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentUsers.map((user, index) => (
//               <tr key={user.id}>
//                 <td>{index + 1}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>{user.isBlocked ? "Blocked" : "Active"}</td>
//                 <td>
//                   <select
//                     value={user.role}
//                     onChange={(e) => handleRoleChange(user.id, e.target.value)}
//                   >
//                     <option value="USER">USER</option>
//                     <option value="ORGANIZER">ORGANIZER</option>
//                     <option value="ADMIN">ADMIN</option>
//                   </select>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => handleBlockUser(user.id, user.isBlocked)}
//                   >
//                     {user.isBlocked ? "Unblock" : "Block"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       <div style={{ marginTop: "10px" }}>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           Prev
//         </button>
//         <span style={{ margin: "0 10px" }}>
//           Page{currentPage} of {totalPages}
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

// export default Users;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  updateRole,
  blockUser,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";

function Users() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRoleChange = async (id, role) => {
    await dispatch(updateRole({ id, role }));
    dispatch(fetchUsers());
    toast.success("Role updated successfully");
  };

  const handleBlockUser = async (id, currentStatus) => {
    await dispatch(
      blockUser({
        id,
        isBlocked: !currentStatus,
      })
    );
    dispatch(fetchUsers());
    toast.success("User status updated");
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = filteredUsers.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) {
    return <div className="text-center text-white py-10">Loading...</div>;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Users Management
        </h1>

        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-72 bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-xl outline-none focus:border-indigo-500"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-3 py-3 text-left w-[60px]">ID</th>
              <th className="px-3 py-3 text-left w-[240px]">Email</th>
              <th className="px-3 py-3 text-left w-[110px]">Role</th>
              <th className="px-3 py-3 text-left w-[110px]">Status</th>
              <th className="px-3 py-3 text-left w-[160px]">Change Role</th>
              <th className="px-3 py-3 text-left w-[120px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-400">
                  No Users Found
                </td>
              </tr>
            ) : (
              currentUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-800 hover:bg-gray-800/40"
                >
                  <td className="px-3 py-3 text-white">
                    {firstIndex + index + 1}
                  </td>

                  <td className="px-3 py-3 text-gray-300 truncate">
                    {user.email}
                  </td>

                  <td className="px-3 py-3 text-gray-300">{user.role}</td>

                  <td className="px-3 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.isBlocked
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  <td className="px-3 py-3">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      className="w-full bg-gray-800 border border-gray-700 text-white px-2 py-2 rounded-lg text-sm"
                    >
                      <option value="USER">USER</option>
                      <option value="ORGANIZER">ORGANIZER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>

                  <td className="px-3 py-3">
                    <button
                      onClick={() =>
                        handleBlockUser(user.id, user.isBlocked)
                      }
                      className={`w-full py-2 rounded-lg text-sm ${
                        user.isBlocked
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      } text-white`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards (No Navbar / No Scrollbar) */}
      <div className="md:hidden space-y-4">
        {currentUsers.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No Users Found</div>
        ) : (
          currentUsers.map((user, index) => (
            <div
              key={user.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-4 space-y-3"
            >
              <div className="flex justify-between">
                <span className="text-gray-400">ID</span>
                <span className="text-white">
                  {firstIndex + index + 1}
                </span>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white break-all">{user.email}</p>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Role</span>
                <span className="text-white">{user.role}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.isBlocked
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {user.isBlocked ? "Blocked" : "Active"}
                </span>
              </div>

              <select
                value={user.role}
                onChange={(e) =>
                  handleRoleChange(user.id, e.target.value)
                }
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg"
              >
                <option value="USER">USER</option>
                <option value="ORGANIZER">ORGANIZER</option>
                <option value="ADMIN">ADMIN</option>
              </select>

              <button
                onClick={() =>
                  handleBlockUser(user.id, user.isBlocked)
                }
                className={`w-full py-2 rounded-lg ${
                  user.isBlocked
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } text-white`}
              >
                {user.isBlocked ? "Unblock" : "Block"}
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

export default Users;
