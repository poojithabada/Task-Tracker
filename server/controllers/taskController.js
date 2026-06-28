import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    
    const newTask = new Task({
      title,
      description,
      status,
      dueDate, // Make sure this is included here
      user: req.user.id, // Assuming you have user authentication middleware
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get All Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};