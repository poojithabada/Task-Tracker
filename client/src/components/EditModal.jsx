import React, { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import "../styles/modal.css";

const EditModal = ({ task, onClose, fetchTasks }) => {
  const [formData, setFormData] = useState(task);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put(`/tasks/${task._id}`, formData);
      toast.success("Task updated successfully!");
      fetchTasks();
      onClose();
    } catch (error) {
      toast.error("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Status Field */}
          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;