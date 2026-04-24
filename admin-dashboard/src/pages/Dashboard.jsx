import React from "react";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: 120 },
    { title: "Total Events", value: 35 },
    { title: "Total Bookings", value: 540 },
    { title: "Revenue", value: "₹85,000" },
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {stats.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "20px",
              width: "200px",
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
