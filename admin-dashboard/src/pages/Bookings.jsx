function Bookings() {
  const bookings = [
    {
      id: 1,
      user: "test@gmail.com",
      event: "Music Concert",
      amount: 1998,
      status: "CONFIRMED",
    },
    {
      id: 2,
      user: "raj@gmail.com",
      event: "Tech Meetup",
      amount: 499,
      status: "PENDING",
    },
    {
      id: 3,
      user: "admin@gmail.com",
      event: "Comedy Night",
      amount: 799,
      status: "CANCELLED",
    },
  ];

  return (
    <div>
      <h1>Bookings Page</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Event</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.user}</td>
              <td>{booking.event}</td>
              <td>₹{booking.amount}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;