import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

interface Todo {
  id: string;
  label: string;
}

const TodoStorage = {
  findAll: async () => [],
  create: async (item: Todo) => item,
  remove: async (id: Todo["id"]) => ({ id, label: "todo" }),
  update: async (item: Partial<Todo>) => ({
    id: "231",
    label: "todo",
    ...item,
  }),
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [error, setError] = useState<unknown>(null);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    TodoStorage.findAll()
      .then((data) => setTodos(data))
      .catch((err) => {
        setShowError(true);
        setError(err);
        setTimeout(() => {
          setShowError(false);
          setError(null);
        }, 800);
      });
  }, []);

  const handleTodoForm = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const todoToCreate = {
        id: uuidv4(),
        label: newTodo,
      };
      await TodoStorage.create(todoToCreate);

      setTodos((prev) => [todoToCreate, ...prev]);
      setNewTodo("");
    } catch (e) {
      setError(e);
    }
  };

  const handleRemoveTodo = (todo: Todo) => {
    const newTodos = todos.filter((item) => item.id !== todo.id);
    setTodos(newTodos);
  };

  const handleEditTodo = (todo: Todo) => {
    const newTodos = todos.map((item) =>
      item.id === todo.id ? { ...item, ...todo } : item
    );
    setTodos(newTodos);
  };

  return (
    <>
      <header>
        <h1>Todo Task</h1>
      </header>

      <main>
        <article>
          <section>
            <form onSubmit={handleTodoForm}>
              <input
                required
                minLength={1}
                type="text"
                placeholder="New task"
                onChange={(e) => setNewTodo(e.target.value)}
                value={newTodo}
              />
              <button type="submit">Add</button>
            </form>
          </section>

          <section>
            {todos.map((item) => (
              <TodoItem
                key={item.id}
                todo={item}
                onEdit={handleEditTodo}
                onRemove={handleRemoveTodo}
              />
            ))}
          </section>
        </article>
      </main>
      {showError && error && (
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
          <header style={{ fontWeight: "bold", fontSize: "18px" }}>
            Error!!!
          </header>
          <p>{String(error)}</p>
        </section>
      )}
    </>
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
    <section style={{ display: "flex", gap: "6px" }}>
      <header>{todo.label}</header>
      <button
        onClick={() => {
          setEditMode(true);
        }}
      >
        Edit
      </button>
      <button onClick={() => onRemove(todo)}>Remove</button>
    </section>
  );
}
