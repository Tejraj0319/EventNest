// Many admin pages need same sidebar and layout.
// Instead of repeating code in every page, we make one reusable wrapper.
// children means current page content goes inside layout.
// Sidebar stays same, only right content changes.
// This is clean and scalable architecture.

// import React, { Children } from "react";
// import Sidebar from "./Sidebar";
// const AdminLayout = ({ children }) => {
//   return (
//     <div style={{ display: "flex", gap: "20px" }}>
//       <Sidebar />
//       <div>{children}</div>
//     </div>
//   );
// };
// export default AdminLayout;

// import React from "react";
// import Sidebar from "./Sidebar";

// const AdminLayout = ({ children }) => {
//   return (
//     <div className="h-screen bg-gray-950 text-white overflow-hidden">
//       {/* Fixed Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <main className="h-screen overflow-y-auto overflow-x-hidden lg:pl-72 pt-16 lg:pt-0">
//         {/* Header */}
//         <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
//               Admin Dashboard
//             </h1>

//             <div className="flex items-center gap-3">
//               <div className="hidden sm:block text-sm text-gray-400">
//                 Welcome Back 👋
//               </div>

//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center font-bold shadow-lg">
//                 A
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <section className="p-4 sm:p-6 lg:p-8">
//           <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 min-h-[calc(100vh-120px)]">
//             {children}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;






import React from "react";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-h-screen overflow-y-auto overflow-x-hidden lg:pl-72 pt-16 lg:pt-0">
        {/* Desktop Header Only */}
        <header className="hidden lg:flex sticky top-0 z-30 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-8 py-4 items-center justify-between">
          <h1 className="text-xl font-semibold tracking-wide">
            Admin Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-400">
              Welcome Back 👋
            </div>

            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center font-bold shadow-lg">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <section className="p-4 sm:p-6 lg:p-8 pb-24">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 min-h-[calc(100vh-32px)] lg:min-h-[calc(100vh-120px)]">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;