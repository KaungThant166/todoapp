import React, { useState } from "react";

const Todo = ({ todo, deleteTodo, updateTodo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const updateHandler = (e) => {
    e.preventDefault();

    let updateData = {
      id: todo.id,
      title,
      completed: todo.completed,
    };
    updateTodo(updateData);
    setIsEdit(false);
    setTitle("");
  };
  const handleChecked = () => {
    let updateData = {
      id: todo.id,
      title,
      completed: !todo.completed,
    };
    updateTodo(updateData);
  };
  return (
    <li className="todo-item-container">
      <div className="todo-item">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleChecked}
        />
        {!isEdit && (
          <span
            onDoubleClick={() => setIsEdit(true)}
            className={`todo-item-label ${
              todo.completed ? "line-through" : ""
            }  `}
          >
            {todo.title}
          </span>
        )}
        {isEdit && (
          <form onSubmit={(e) => updateHandler(e)}>
            <input
              type="text"
              className="todo-item-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        )}
      </div>
      <button className="x-button" onClick={() => deleteTodo(todo.id)}>
        <svg
          className="x-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
};

export default Todo;
