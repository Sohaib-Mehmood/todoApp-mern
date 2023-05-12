import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
}

function TodoApp(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]") as Todo[];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo(event.target.value);
  };

  const addTodo = (): void => {
    if (newTodo.trim() === "") return;
    const todo: Todo = {
      id: new Date().getTime(),
      text: newTodo,
    };
    setTodos((prevTodos) => [...prevTodos, todo]);
    setNewTodo("");
  };

  const handleEdit = (id: number, text: string): void => {
    const newText = prompt("Edit Todo", text);
    if (newText) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
      );
    }
  };

  const handleDelete = (id: number): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    addTodo();
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
            <button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
