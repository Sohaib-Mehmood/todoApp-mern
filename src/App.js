import React, { useState, useEffect } from "react";

function TodoApp() {
const [todos, setTodos] = useState([]);
const [newTodo, setNewTodo] = useState("");

useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  setTodos(storedTodos);
}, []);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

const handleInputChange = (event) => {
  setNewTodo(event.target.value);
};

const handleSubmit = (event) => {
  event.preventDefault();
  if (newTodo.trim() === "") return;
  const todo = {
    id: new Date().getTime(),
    text: newTodo,
  };
  setTodos([...todos, todo]);
  setNewTodo("");
};

return (
  <div>
    <h1>Todo App</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" value={newTodo} onChange={handleInputChange} />
      <button type="submit">Add</button>
    </form>
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button>Delete</button>
          <button>Edit</button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default TodoApp;
