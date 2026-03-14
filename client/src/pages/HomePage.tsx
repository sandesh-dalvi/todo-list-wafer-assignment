import { useEffect, useState } from "react";
import TitleHeading from "../components/TitleHeading";
import type { Todo } from "../utils/types";
import { todoApi } from "../utils/todo-api";
import { Link } from "react-router-dom";
import { SquarePenIcon } from "lucide-react";
import { toast } from "sonner";
import TodoControls from "../components/TodoControls";
import { useTodoControls } from "../hooks/useTodoControls";
import TodoCard from "../components/TodoCard";

const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    search,
    filter,
    sort,
    displayedTodos,
    setSearch,
    setFilter,
    setSort,
  } = useTodoControls(todos);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (error) {
      setError(true);
      toast.error("Failed to load Todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // toggle completed status
  const handleToggle = async (todo: Todo) => {
    try {
      const updatedTodo = await todoApi.update(todo.id, {
        completed: !todo.completed,
      });
      setTodos((prev) =>
        prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
      );
      toast.success("Todo updated successfully");
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  // delete todo
  const handleDelete = async (id: number) => {
    try {
      await todoApi.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  //

  if (loading) {
    return <p className="status-message">Loading...</p>;
  }

  if (error) {
    return (
      <div className="app">
        <TitleHeading />
        <p className="status-message">
          Something went wron! Failed to load Todos.
        </p>
      </div>
    );
  }

  return (
    <div className="app">
      <TitleHeading />

      <div className="home-actions">
        <TodoControls
          search={search}
          filter={filter}
          sort={sort}
          onSearchChange={setSearch}
          onFilterChange={setFilter}
          onSortChange={setSort}
        />
        <Link to="/add" className="add-todo-btn">
          Add Todo
          <SquarePenIcon />
        </Link>
      </div>

      <div className="todo-list-container">
        {displayedTodos.length === 0 ? (
          <p className="empty-list">No todos yet. Add one below</p>
        ) : (
          displayedTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <div className=""></div>
    </div>
  );
};

export default HomePage;
