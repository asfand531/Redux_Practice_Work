import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  reset,
  incrementByAmount,
  decrementByAmount,
} from "./features/counter/counterSlice";
import "./App.css";

function App() {
  const [incrementAmount, setIncrementAmount] = useState(0);
  const [decrementAmount, setDecrementAmount] = useState(0);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const handleIncrementbyAmount = () => {
    dispatch(incrementByAmount(incrementAmount));
  };

  const handleDecrementbyAmount = () => {
    dispatch(decrementByAmount(decrementAmount));
  };

  return (
    <div>
      <button onClick={handleIncrement}>Increment +</button>
      <h2>Count: {count}</h2>
      <button onClick={handleDecrement}>Decrement -</button>
      <br />
      <br />
      <button onClick={handleReset}>Reset</button>
      <br />
      <br />
      <input
        type="number"
        value={incrementAmount}
        placeholder="Enter amount"
        title="Increment by amount"
        onChange={(e) => setIncrementAmount(e.target.value)}
      />
      &emsp;
      <button onClick={handleIncrementbyAmount}>Increment by amount</button>
      <br />
      <br />
      <input
        type="number"
        value={decrementAmount}
        placeholder="Enter amount"
        title="Increment by amount"
        onChange={(e) => setDecrementAmount(e.target.value)}
      />
      &emsp;
      <button onClick={handleDecrementbyAmount}>Decrement by amount</button>
    </div>
  );
}

export default App;
