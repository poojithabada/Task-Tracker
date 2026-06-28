import { useState } from "react";
import API from "../services/api";

import toast from "react-hot-toast";
const TaskForm = ({ fetchTasks }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await API.post("/tasks", task);
    toast.success("Task added successfully!"); // Success toast
    setTask({ title: "", description: "", dueDate: "", status: "Pending" });
    fetchTasks();
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add task");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="task-form-card">
      <h2 className="section-title">Add New Task</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Learn MERN Stack"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="e.g., Complete the frontend and backend setup."
            value={task.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group half-width">
            <label>Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn blue-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;