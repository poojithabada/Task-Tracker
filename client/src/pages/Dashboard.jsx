import React, { useState, useRef } from "react"; // Added useState
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import EditModal from "../components/EditModal"; // Import the modal
import "../styles/dashboard.css";

const Dashboard = () => {
  const [editingTask, setEditingTask] = useState(null); // Modal state
  const taskListRef = useRef();

  const handleEditClick = (task) => {
    setEditingTask(task); // Opens the modal
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      <div className="dashboard-container">
        <h1 className="page-title">Task Tracker</h1>

        <div className="dashboard-content">
          <TaskForm fetchTasks={() => taskListRef.current?.fetchTasks()} />
          
          {/* Pass the edit handler to TaskList */}
          <TaskList 
            ref={taskListRef} 
            onEdit={handleEditClick} 
          />
        </div>
      </div>

      {/* Render Modal if a task is selected for editing */}
      {editingTask && (
        <EditModal 
          task={editingTask} 
          onClose={() => setEditingTask(null)} 
          fetchTasks={() => taskListRef.current?.fetchTasks()} 
        />
      )}
    </div>
  );
};

export default Dashboard;