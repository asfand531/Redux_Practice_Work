import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  incrementAsync,
} from "./features/asyncCounter/counterSlice";
import { Button, message } from "antd";
import "./App.css";

function Counter() {
  const [messageApi, contextHolder] = message.useMessage();
  const count = useSelector((state) => state.counter.value);
  const status = useSelector((state) => state.counter.status);
  const dispatch = useDispatch();

  const success = () => {
    messageApi.open({
      type: "loading",
      content: "Action in progress..",
      duration: 0,
    });
    // Dismiss manually and asynchronously
    setTimeout(messageApi.destroy, 500);
  };

  return (
    <>
      {contextHolder}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Counter with createAsyncThunk</h2>
        <p>Value: {count}</p>
        <p>Status: {status}</p>

        <Button
          color="danger"
          variant="solid"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
        <Button
          color="primary"
          variant="solid"
          onClick={() => dispatch(incrementAsync(5), success())}
        >
          Increment Async (+5)
        </Button>
      </div>
    </>
  );
}

export default Counter;
