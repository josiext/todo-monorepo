import { useState, useEffect, useRef } from "react";

import styles from "./App.module.css";
import TodoStorage from "./api/index";
import { Todo } from "types";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    TodoStorage.findAll()
      .then((data) => setTodos(data))
      .catch((err) => {
        setError(err);
        setTimeout(() => {
          setError(null);
        }, 2000);
      });
  }, []);

  const handleTodoForm = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const todoToCreate = {
        label: newTodo,
      };
      const created = await TodoStorage.create(todoToCreate);

      setTodos((prev) => [created, ...prev]);
      setNewTodo("");
    } catch (e) {
      setError(e);
    }
  };

  const handleRemoveTodo = (todo: Todo) => {
    TodoStorage.remove(todo.id).catch((e) => setError(e));
    const newTodos = todos.filter((item) => item.id !== todo.id);
    setTodos(newTodos);
  };

  const handleEditTodo = (todo: Todo) => {
    const newTodos = todos.map((item) =>
      item.id === todo.id ? { ...item, ...todo } : item
    );
    TodoStorage.update(todo.id, todo).catch((e) => setError(e));
    setTodos(newTodos);
  };

  return (
    <div className={styles.container}>
      <main className={styles.app}>
        <>
          <header className={styles.header}>
            <h1 className={styles.title}>Todo Task</h1>
          </header>
          <section className={styles.todoFormContainer}>
            <form onSubmit={handleTodoForm}>
              <input
                required
                minLength={1}
                type="text"
                placeholder="New todo..."
                onChange={(e) => setNewTodo(e.target.value)}
                value={newTodo}
              />
              <button type="submit">Add</button>
            </form>
          </section>

          <section className={styles.todoList}>
            {todos.map((item) => (
              <TodoItem
                key={item.id}
                todo={item}
                onEdit={handleEditTodo}
                onRemove={handleRemoveTodo}
              />
            ))}
          </section>

          {error && (
            <Error
              message="An error has occurred."
              onClose={() => setError(null)}
            />
          )}
        </>
      </main>
    </div>
  );
}

function TodoItem({
  todo,
  onRemove,
  onEdit,
}: {
  todo: Todo;
  onRemove: (t: Todo) => void;
  onEdit: (t: Todo) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todoUpdated, setTodoUpdated] = useState(todo);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(false);
    onEdit(todoUpdated);
  };

  if (editMode)
    return (
      <form
        style={{ display: "flex", gap: "6px" }}
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit();
        }}
      >
        <input
          required
          minLength={1}
          value={todoUpdated.label}
          autoFocus
          ref={inputRef}
          onFocus={() => inputRef?.current?.select()}
          onChange={(e) =>
            setTodoUpdated({ ...todoUpdated, label: e.target.value })
          }
        />
        <button type="submit">Save</button>
        <button onClick={() => setEditMode(false)}>Cancel</button>
      </form>
    );

  return (
    <section style={{ flex: 1, display: "flex", gap: "6px" }}>
      <header style={{ flex: 2 }}>{todo.label}</header>

      <div style={{ flex: 1, display: "flex", gap: "0.4em" }}>
        <button
          onClick={() => {
            setEditMode(true);
          }}
          style={{ padding: "0.2em" }}
        >
          Edit
        </button>
        <button onClick={() => onRemove(todo)} style={{ padding: "0.2em" }}>
          Remove
        </button>
      </div>
    </section>
  );
}

function Error({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <section
      style={{
        backgroundColor: "red",
        padding: "16px",
        position: "absolute",
        bottom: 0,
        width: "100%",
        color: "white",
      }}
    >
      <header style={{ fontWeight: "bold", fontSize: "18px" }}>Error!!!</header>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </section>
  );
}
