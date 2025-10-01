import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usersAsync, deleteUser } from "./features/userSlice/usersSlice";
import Loading from "./Loading";
import "./App.css";

function UsersList() {
  const dispatch = useDispatch();

  const { users, status, error } = useSelector((state) => state.users);
  useSelector((state) => console.log(state.users));

  useEffect(() => {
    if (status === "idle") {
      dispatch(usersAsync());
    }
  }, [status, dispatch]);

  if (status === "loading") return <Loading />;
  if (status === "failed") return <h1>{error}</h1>;

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    console.debug(updatedUsers);
  };

  return (
    <div cla>
      <h2>Users List</h2>
      <ol>
        {users.map((u) => (
          <>
            <li key={u.id}>
              <strong>{u.name}</strong> ({u.email}){" "}
              <button onClick={() => handleDelete(u.id)}>Delete</button>
            </li>
          </>
        ))}
      </ol>
    </div>
  );
}

export default UsersList;
