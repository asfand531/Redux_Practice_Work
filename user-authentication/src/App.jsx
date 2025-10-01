import "./App.css";
import { Input, Button, message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./authentication/authenticationSlice";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);
  console.log("Login Data >>>>>>>", user);
  const checkLogin = useSelector((state) => state.login.login);
  console.log("Login Status >>>>>", checkLogin);

  const formStyle = {
    display: "flex",
    flexDirection: "row",
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Please enter username",
    });
  };

  const handleLogin = () => {
    if (!username || username.trim() === "") {
      error();
      return;
    }
    dispatch(login(username.trim()));
  };

  const handleLogout = () => {
    dispatch(logout());
    setUsername("");
  };

  return (
    <>
      {contextHolder}
      <div>
        {checkLogin === false ? (
          <>
            <h2>Login</h2>
            <div style={formStyle}>
              <label htmlFor="username">Username:&emsp;</label>
              <Input
                placeholder="Enter your username"
                id="username"
                name="username"
                value={username}
                onChange={handleUsername}
              />
            </div>
            <br />
            <Button variant="solid" color="blue" onClick={handleLogin}>
              Login
            </Button>
          </>
        ) : (
          <>
            <h1>Welcome: {username}</h1>
            <Button variant="solid" color="danger" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}

        {/* <br />
      <br />
      <h3>Username: </h3>
      {username} */}
      </div>
    </>
  );
}

export default App;
