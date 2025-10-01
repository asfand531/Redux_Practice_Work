import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  reset,
  incrementByValue,
  decrementByValue,
} from "./feature/counterSlice";
import { Button, InputNumber, Input } from "antd";
import { useState } from "react";

function App() {
  const [incrementByVal, setIncrementByVal] = useState(0);
  const [decrementByVal, setDecrementByVal] = useState(0);

  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const handleIncrementByValue = () => {
    dispatch(incrementByValue(incrementByVal));
  };

  const handleDecrementByValue = () => {
    dispatch(decrementByValue(decrementByVal));
  };

  return (
    <>
      <div>
        <Input
          placeholder="Increment By Value"
          value={incrementByVal}
          onChange={(e) => setIncrementByVal(e.target.value)}
        />
        <br />
        <br />
        <Button color="blue" variant="solid" onClick={handleIncrementByValue}>
          Increment By Value
        </Button>
      </div>
      <br />
      <div>
        <InputNumber
          placeholder="Decrement By Value"
          value={decrementByVal}
          onChange={(value) => setDecrementByVal(value)}
        />
        <br />
        <br />
        <Button color="blue" variant="solid" onClick={handleDecrementByValue}>
          Decrement By Value
        </Button>
      </div>
      <br />
      <div style={{ display: "flex", gap: "30px", flexDirection: "row" }}>
        <Button color="red" variant="solid" onClick={handleDecrement}>
          Decrement
        </Button>
        <span>
          <h2>Count: {count}</h2>
        </span>
        <Button color="blue" variant="solid" onClick={handleIncrement}>
          Increment
        </Button>
      </div>
      <div>
        <Button color="purple" variant="solid" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </>
  );
}

export default App;
