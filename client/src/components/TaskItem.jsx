import React from "react";
import API from "../services/api";
import "../styles/taskItem.css";
import { formatDistanceToNow } from "date-fns";

import toast from "react-hot-toast"; // Import toast

const TaskItem = ({ task, fetchTasks,onEdit }) => {
  const deleteTask = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await API.delete(`/tasks/${task._id}`);
      fetchTasks();
      toast.success("Task deleted successfully!"); // Success toast
    } catch (error) {
      toast.error("Failed to delete task."); // Error toast
    }
  };

  const handleEdit = () => {
    alert("Edit feature coming soon!");
  };

  // Format the time created for a "Time Ago" feature
  const timeAgo = task.createdAt 
    ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true }) 
    : "";

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`status-badge ${task.status?.toLowerCase().replace(" ", "-")}`}>
          {task.status}
        </span>
      </div>

      <p className="task-desc">{task.description}</p>

      <div className="task-footer">
        <div className="task-meta">
          <div className="meta-info">
            <strong>Due: </strong>
            <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date set"}</span>
            <small className="created-at">{timeAgo}</small>
          </div>
        </div>

        <div className="action-btns">
          <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
          <button className="delete-btn" onClick={deleteTask}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;