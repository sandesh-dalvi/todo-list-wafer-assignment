import type { FilterStatus, SortField } from "../utils/types";

interface TodoControlsProps {
  search: string;
  filter: FilterStatus;
  sort: SortField;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: FilterStatus) => void;
  onSortChange: (value: SortField) => void;
}

const TodoControls = ({
  search,
  filter,
  sort,
  onSearchChange,
  onFilterChange,
  onSortChange,
}: TodoControlsProps) => {
  return (
    <>
      <div className="search-container">
        <svg className="search-icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className="search-input"
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button
            className="search-clear"
            onClick={() => onSearchChange("")}
            title="Clear search"
          >
            x
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="control-group">
        {(["all", "incomplete", "complete"] as FilterStatus[]).map((f) => (
          <button
            key={f}
            type="button"
            className={`control-btn ${filter === f ? "control-btn--active" : ""}`}
            onClick={() => onFilterChange(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Sort */}
      <select
        className="sort-select"
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortField)}
      >
        <option value="none">Sort: Default</option>
        <option value="title">Sort: Title A-Z</option>
        <option value="status">Sort: Status</option>
      </select>
    </>
  );
};

export default TodoControls;
