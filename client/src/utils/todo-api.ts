import { api } from "./axios";
import type { Todo, CreateTodoPayload, UpdateTodoPayload } from "./types";

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const { data } = await api.get<Todo[]>("/todos");

    return data;
  },

  create: async (payload: CreateTodoPayload): Promise<Todo> => {
    const { data } = await api.post<Todo>("/todos", payload);

    return data;
  },

  getById: async (id: number): Promise<Todo> => {
    const { data } = await api.get<Todo>(`/todos/${id}`);

    return data;
  },

  update: async (id: number, payload: UpdateTodoPayload): Promise<Todo> => {
    const { data } = await api.put<Todo>(`/todos/${id}`, payload);

    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
