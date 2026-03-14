import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { todoApi } from "../utils/todo-api";
import { toast } from "sonner";
import Backlink from "../components/Backlink";
import TitleHeading from "../components/TitleHeading";

const TodoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [notFound, setNotFound] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const todoId = Number(id);

  useEffect(() => {
    const fetchTodo = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const data = await todoApi.getById(todoId);
        setTitle(data.title);
        setDescription(data.description ?? "");
        setCompleted(data.completed);
      } catch (error) {
        setNotFound(true);
        toast.error("Failed to load todo.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title cannot be empty.");
      return;
    }
    try {
      setSaving(true);

      const updatedTodo = await todoApi.update(todoId, {
        title: title.trim(),
        description: description.trim() || undefined,
        completed,
      });

      toast.success("Updated successfully!");
    } catch {
      toast.error("Failed to update todo.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this todo? This cannot be undone.")) return;
    try {
      setDeleting(true);
      await todoApi.delete(todoId);
      toast.success("Todo deleted successfully");
      navigate("/");
    } catch {
      toast.error("Failed to delete todo.");
      setDeleting(false);
    }
  };

  if (loading)
    return (
      <div className="app">
        <p className="status-message">Loading...</p>
      </div>
    );
  if (notFound)
    return (
      <div className="app">
        <p className="error-message">Todo not found.</p>
        <Backlink href="/" />
      </div>
    );

  return (
    <div className="app">
      <TitleHeading />

      <Backlink href="/" />

      <div className="detail-container">
        <form className="detail-form" onSubmit={handleUpdate} noValidate>
          <div className="form-section">
            <label className="form-field-label" htmlFor="title">
              TITLE
            </label>
            <input
              id="title"
              className="form-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="TODO TITLE"
            />
          </div>

          <div className="form-section">
            <label className="form-field-label" htmlFor="description">
              DESCRIPTION
            </label>
            <textarea
              id="description"
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              rows={6}
            />
          </div>

          <div className="add-form__checkbox-row">
            <input
              id="completed"
              type="checkbox"
              className="add-form__checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            <label htmlFor="completed" className="add-form__checkbox-label">
              Mark as complete
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-update" disabled={saving}>
              {saving ? "UPDATING..." : "UPDATE"}
            </button>
            <button
              type="button"
              className="btn-delete"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "DELETING..." : "DELETE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoDetailPage;
