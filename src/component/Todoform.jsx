import React, { useState } from "react";

const Todoform = ({ addTodo }) => {
  const [title, setTitle] = useState([]);

  const createTodo = (e) => {
    e.preventDefault();
    let todo = {
      id: Math.random(),
      title,
      completed: false,
    };
    addTodo(todo);
    setTitle("");
  };

  return (
    <form onSubmit={createTodo}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
    </form>
  );
};

export default Todoform;
