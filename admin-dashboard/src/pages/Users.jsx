function Users() {
  const users = [
    {
      id: 1,
      email: "test@gmail.com",
      role: "ORGANIZER",
    },
    {
      id: 2,
      email: "admin@gmail.com",
      role: "ADMIN",
    },
    {
      id: 3,
      email: "raj@gmail.com",
      role: "USER",
    },
  ];

  return (
    <div>
      <h1>Users Page</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;