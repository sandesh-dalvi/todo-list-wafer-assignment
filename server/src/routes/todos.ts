import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
} from "../controllers/todos.js";

const router = Router();

// - /api/todos
router.route("/").get(getAllTodos).post(createTodo);

// - /api/todos/:id
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

export default router;
