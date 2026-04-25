import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/admin/adminSlice";

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div>
      <h1>Users Page</h1>

      {users.map((user) => (
        <div key={user.id}>
          {user.email} | {user.role}
        </div>
      ))}
      
    </div>
  );
}

export default Users;
