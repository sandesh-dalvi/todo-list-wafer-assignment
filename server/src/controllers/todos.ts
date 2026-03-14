import { Request, Response } from "express";
import { db } from "../config/database.js";
import { TodoInsert, todos } from "../db/schema.js";
import { eq } from "drizzle-orm";

// GET /api/todos - get all todos
export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const allTodos = await db.select().from(todos).orderBy(todos.createdAt);

    res.json(allTodos);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Failed to fetch todo tasks" });
  }
};

// POST /api/todos - create a new todo
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, completed } = req.body as TodoInsert;

    // Validate title
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const [newTodo] = await db
      .insert(todos)
      .values({ title, description, completed: completed ?? false })
      .returning();

    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create todo task" });
  }
};

//GET /api/todos/:id - get a todo by id
export const getTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const [todo] = await db.select().from(todos).where(eq(todos.id, id));

    if (!todo) return res.status(404).json({ message: "Todo task not found" });

    res.json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch todo task" });
  }
};

// PUT /api/todos/:id - update a todo
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, description, completed } = req.body;

    //
    const updateData: Partial<TodoInsert> & { updatedAt: Date } = {
      updatedAt: new Date(),
    };

    // Validate and set fields to update
    if (title !== undefined) updateData.title = title.trim();

    if (description !== undefined) updateData.description = description;

    if (completed !== undefined) updateData.completed = completed;

    const [updatedTodo] = await db
      .update(todos)
      .set(updateData)
      .where(eq(todos.id, id))
      .returning();

    if (!updatedTodo)
      return res.status(404).json({ message: "Todo task not found" });

    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update todo task" });
  }
};

// DELETE /api/todos/:id - delete a todo
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const [deletedTodo] = await db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning();

    if (!deletedTodo)
      return res.status(404).json({ message: "Todo task not found" });

    res.json({ message: "Todo task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete todo task" });
  }
};
