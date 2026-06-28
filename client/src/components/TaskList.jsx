import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import API from "../services/api";
import TaskItem from "./TaskItem";

// Add { onEdit } to the destructuring props
const TaskList = forwardRef(({ onEdit }, ref) => { 
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest First");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchTasks,
  }));

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Sort logic using createdAt timestamp for accuracy
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sort === "Newest First" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="task-list-section">
      <div className="controls-bar">
        {/* ... (Your existing Filter/Sort UI) ... */}
      </div>

      <h2 className="section-title left-align">Your Tasks</h2>

      {loading ? (
        <div className="loading-state">Loading tasks...</div>
      ) : sortedTasks.length === 0 ? (
        <div className="empty-state-dashed">No tasks yet. Add one above!</div>
      ) : (
        <div className="task-grid">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              fetchTasks={fetchTasks}
              onEdit={onEdit} // <--- Pass the function down here
            />
          ))}
        </div>
      )}
    </div>
  );
});

TaskList.displayName = "TaskList";
export default TaskList;