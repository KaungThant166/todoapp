import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, updateTodo }) => {
  return (
    <ul className="todo-list">
      {todos &&
        todos.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
    </ul>
  );
};

export default TodoList;
