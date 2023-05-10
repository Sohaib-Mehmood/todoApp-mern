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

const handleEdit = (id, text) => {
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      todo.text = text;
    }
    return todo;
  });
  setTodos(updatedTodos);
};

const handleDelete = (id) => {
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  setTodos(updatedTodos);
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
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
          <button
            onClick={() =>
              handleEdit(todo.id, prompt("Edit Todo", todo.text))
            }
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default TodoApp;
