// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchStats } from "../features/admin/adminSlice";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { stats } = useSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchStats());
//   }, [dispatch]);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>Total Users: {stats.totalUsers}</p>
//       <p>Total Events: {stats.totalEvents}</p>
//       <p>Total Bookings: {stats.totalBookings}</p>
//       <p>Total Revenue: ₹{stats.totalRevenue}</p>
//     </div>
//   );
// };

// export default Dashboard;




import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../features/admin/adminSlice";
import {
  Users,
  CalendarDays,
  Ticket,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: <Users size={22} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Events",
      value: stats.totalEvents || 0,
      icon: <CalendarDays size={22} />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      icon: <Ticket size={22} />,
      color: "from-orange-500 to-yellow-500",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue || 0}`,
      icon: <IndianRupee size={22} />,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const maxValue = Math.max(
    stats.totalUsers || 1,
    stats.totalEvents || 1,
    stats.totalBookings || 1,
    stats.totalRevenue || 1
  );

  const graphData = [
    { label: "Users", value: stats.totalUsers || 0 },
    { label: "Events", value: stats.totalEvents || 0 },
    { label: "Bookings", value: stats.totalBookings || 0 },
    { label: "Revenue", value: stats.totalRevenue || 0 },
  ];

  const points = graphData
    .map((item, index) => {
      const x = index * 120 + 30;
      const y = 180 - (item.value / maxValue) * 140;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Welcome back, here’s your latest platform summary.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-xl border border-gray-700 w-fit">
          <TrendingUp size={18} className="text-green-400" />
          <span className="text-sm text-gray-300">Live Stats</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-800 rounded-2xl p-5 shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-5">
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${card.color} shadow-lg`}
              >
                {card.icon}
              </div>

              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Stats
              </span>
            </div>

            <h3 className="text-gray-400 text-sm">{card.title}</h3>
            <p className="text-2xl sm:text-3xl font-bold text-white mt-2">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Line Graph */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-5">
            Growth Analytics
          </h2>

          <div className="overflow-x-auto">
            <svg width="420" height="220" className="min-w-full">
              {/* Grid */}
              {[40, 80, 120, 160, 200].map((line) => (
                <line
                  key={line}
                  x1="20"
                  y1={line}
                  x2="400"
                  y2={line}
                  stroke="#374151"
                  strokeWidth="1"
                />
              ))}

              {/* Line */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="4"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Dots */}
              {graphData.map((item, index) => {
                const x = index * 120 + 30;
                const y = 180 - (item.value / maxValue) * 140;

                return (
                  <g key={index}>
                    <circle cx={x} cy={y} r="6" fill="#10b981" />
                    <text
                      x={x}
                      y="205"
                      textAnchor="middle"
                      fill="#9ca3af"
                      fontSize="12"
                    >
                      {item.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">
            Quick Insights
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl p-4 flex justify-between items-center">
              <span className="text-gray-300">User Growth</span>
              <span className="text-green-400 font-semibold">+12%</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 flex justify-between items-center">
              <span className="text-gray-300">Booking Rate</span>
              <span className="text-blue-400 font-semibold">+18%</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 flex justify-between items-center">
              <span className="text-gray-300">Event Activity</span>
              <span className="text-purple-400 font-semibold">Active</span>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 flex justify-between items-center">
              <span className="text-gray-300">Platform Health</span>
              <span className="text-emerald-400 font-semibold">Excellent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;