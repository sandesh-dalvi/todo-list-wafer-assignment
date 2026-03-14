import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TitleHeading from "../components/TitleHeading";
import Backlink from "../components/Backlink";
import { toast } from "sonner";
import { todoApi } from "../utils/todo-api";

const AddTodoPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title required!");
      return;
    }

    try {
      setSubmitting(true);

      await todoApi.create({
        title,
        description: description || undefined,
        completed,
      });
      toast.success("Todo added successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create tode. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app">
      <TitleHeading />

      <Backlink href={"/"} />

      <form className="add-form" onSubmit={handleSubmit} noValidate>
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
            autoFocus
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
            placeholder="Add a description (optional)..."
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
          <button type="submit" className="btn-update" disabled={submitting}>
            {submitting ? "ADDING..." : "ADD TODO"}
          </button>
          <Link
            to="/"
            className="btn-delete"
            style={{ textAlign: "center", textDecoration: "none" }}
          >
            CANCEL
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddTodoPage;
