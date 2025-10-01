import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Checkbox } from "antd";
import { useState } from "react";
import { addTodo, toggleTodo, deleteTodo } from "./features/todoSlice";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);

  const handleTodo = () => {
    if (todoInput.trim() === "") return;
    dispatch(addTodo(todoInput));
    setTodoInput("");
  };

  return (
    <>
      <div>
        <Input
          placeholder="Enter todo here..."
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <br />
        <br />
        <Button type="primary" onClick={handleTodo}>
          Add todo
        </Button>
      </div>
      <br />
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} style={{ listStyleType: "none" }}>
              <Checkbox
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
              <span
                style={{
                  marginLeft: "8px",
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => dispatch(toggleTodo(todo.id))}
              >
                {todo.text}
              </span>
              &nbsp;
              <Button
                danger
                size="small"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
