import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TodoDetailPage from "./pages/TodoDetailPage";
import AddTodoPage from "./pages/AddTodoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todo/:id" element={<TodoDetailPage />} />
      <Route path="/add" element={<AddTodoPage />} />
    </Routes>
  );
}

export default App;
