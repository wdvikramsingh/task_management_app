import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/add" element={<TaskForm isAdding={true} />} />
        <Route
          path="/task/edit/:taskId"
          element={<TaskForm isAdding={false} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
