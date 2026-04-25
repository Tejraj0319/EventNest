import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../features/admin/adminSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Events: {stats.totalEvents}</p>
      <p>Total Bookings: {stats.totalBookings}</p>
      <p>Total Revenue: ₹{stats.totalRevenue}</p>
    </div>
  );
};

export default Dashboard;
