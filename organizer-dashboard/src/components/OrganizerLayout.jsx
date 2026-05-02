// import React from "react";
// import SideBar from "./Sidebar";

// const OrganizerLayout = ({ children }) => {
//   return (
//     <div style={{ display: "flex", gap: "20px" }}>
//       <SideBar />
//       <div>{children}</div>
//     </div>
//   );
// };

// export default OrganizerLayout;

// OrganizerLayout.jsx
import React, { useState } from "react";
import SideBar from "./Sidebar";
import { Menu } from "lucide-react";

const OrganizerLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex text-white">
      {/* Sidebar */}
      <SideBar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-72">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between bg-slate-900 border-b border-slate-800 px-4 py-3">
          <button onClick={() => setOpen(true)}>
            <Menu size={24} className="text-white" />
          </button>

          <h1 className="text-lg font-bold text-cyan-400">Organizer Panel</h1>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 flex-1 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-4 md:p-6 min-h-[calc(100vh-32px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganizerLayout;
