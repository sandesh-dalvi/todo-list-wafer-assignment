import { CheckCircle2Icon } from "lucide-react";
import type { Todo } from "../utils/types";
import { Link } from "react-router-dom";

interface TodoCardProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoCard = ({ todo, onToggle, onDelete }: TodoCardProps) => {
  return (
    <div className="todo-card">
      <button
        type="button"
        className={`todo-card__check ${todo.completed ? "todo-card__check--complete" : "todo-card__check--incomplete"}`}
        onClick={() => onToggle(todo)}
        title={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        <CheckCircle2Icon />
      </button>

      <div className="todo-card__content">
        <div className="todo-card__title">{todo.title}</div>
        <div className="todo-card__status">
          <span
            className={`status-badge ${todo.completed ? "status-badge--complete" : "status-badge--incomplete"}`}
          >
            {todo.completed ? "Complete" : "Incomplete"}
          </span>
        </div>
        {todo.description && (
          <div className="todo-card__desc">{todo.description}</div>
        )}
      </div>

      <div className="todo-card__btns">
        <Link to={`/todo/${todo.id}`} className="todo-card__btn">
          VIEW
        </Link>
        <button
          type="button"
          className="todo-card__btn todo-card__btn--delete"
          onClick={() => onDelete(todo.id)}
          title="Delete todo"
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
