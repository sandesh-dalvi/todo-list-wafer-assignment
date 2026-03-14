import { useState, useMemo } from "react";
import type { FilterStatus, SortField, Todo } from "../utils/types";

export function useTodoControls(todos: Todo[]) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [sort, setSort] = useState<SortField>("none");

  const displayedTodos = useMemo(() => {
    let result = [...todos];

    // 1. Search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }

    // 2. Filter
    if (filter === "complete") result = result.filter((t) => t.completed);
    if (filter === "incomplete") result = result.filter((t) => !t.completed);

    // 3. Sort
    if (sort === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "status") {
      result.sort((a, b) => Number(b.completed) - Number(a.completed));
    }

    return result;
  }, [todos, search, filter, sort]);

  return {
    search,
    filter,
    sort,
    displayedTodos,
    setSearch,
    setFilter,
    setSort,
  };
}
