export interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoPayload {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTodoPayload {
  title?: string;
  description?: string;
  completed?: boolean;
}

// TodoControls
export type FilterStatus = "all" | "complete" | "incomplete";
export type SortField = "none" | "title" | "status";
