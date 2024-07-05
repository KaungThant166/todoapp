import { useCallback, useEffect, useState } from "react";
import "./App.css";
import CheckAllRemaining from "./component/CheckAllRemaining";
import ClearComponent from "./component/ClearComponent";
import TodoFilter from "./component/TodoFilter";
import TodoForm from "./component/Todoform";
import TodoList from "./component/TodoList";
function App() {
  const [todos, setTodos] = useState([]);
  const [filterTodo, setFilterTodo] = useState(todos);
  const addTodo = (todo) => {
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    setTodos(() => [...todos, todo]);
    setFilterTodo(todo);
  };

  const deleteTodo = (todoid) => {
    fetch(`http://localhost:3001/todos?id=${todoid}`, { method: "DELETE" });
    setTodos(() => {
      return todos.filter((todo) => todo.id !== todoid);
    });
  };

  const updateTodo = (UpdateTodo) => {
    fetch(`http://localhost:3001/todos/${UpdateTodo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UpdateTodo),
    });

    setTodos((prev) => {
      return prev.map((t) => (UpdateTodo.id === t.id ? UpdateTodo : t));
    });
  };

  let remainCount = todos.filter((todo) => !todo.completed).length;

  const checkAllHandler = () => {
    todos.forEach((t) => {
      t.completed = true;
      updateTodo(t);
    });

    setTodos(() => {
      return todos.map((t) => {
        return { ...t, completed: true };
      });
    });
  };

  const clearCompleted = () => {
    todos.forEach((t) => {
      t.completed = false;
      updateTodo(t);
    });

    setTodos(() => {
      return todos.map((t) => {
        return { ...t, completed: false };
      });
    });
  };
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const filterBy = useCallback(
    (filter) => {
      if (filter === "All") {
        setFilterTodo(todos);
      }
      if (filter === "Active") {
        setFilterTodo(todos.filter((t) => !t.completed));
      }
      if (filter === "Completed") {
        setFilterTodo(todos.filter((t) => t.completed));
      }
    },
    [todos]
  );

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={filterTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />

        <CheckAllRemaining
          remainCount={remainCount}
          checkAllHandler={checkAllHandler}
        />

        <div className="other-buttons-container">
          <TodoFilter filterBy={filterBy} />
          <ClearComponent clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;
