function Events() {
  const events = [
    {
      id: 1,
      title: "Music Concert",
      price: 999,
      seats: 200,
    },
    {
      id: 2,
      title: "Tech Meetup",
      price: 499,
      seats: 100,
    },
    {
      id: 3,
      title: "Comedy Night",
      price: 799,
      seats: 150,
    },
  ];

  return (
    <div>
      <h1>Events Page</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Seats</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.title}</td>
              <td>₹{event.price}</td>
              <td>{event.seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Events;