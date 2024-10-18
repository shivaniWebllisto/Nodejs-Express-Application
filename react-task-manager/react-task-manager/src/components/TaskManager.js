// src/components/TaskManager.js

import React, { useEffect, useState } from "react";
import { getAllTasks, createTask, updateTask, deleteTasks } from "../api";
import { Link } from "react-router-dom";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleCreateTask = async () => {
    try {
      await createTask({ name: newTask });
      setNewTask("");
      fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  const handleUpdateTask = async (taskId) => {
    try {
      await updateTask(taskId, { name: editTaskName });
      setEditTaskId(null);
      setEditTaskName("");
      fetchTasks();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTasks(taskId);
      fetchTasks(); // Refresh tasks
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };
  const toggleTaskCompletion = async (taskId, isCompleted) => {
    try {
      await updateTask(taskId, { completed: !isCompleted });
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task completion", error);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* Create new task */}
      <div className="mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <button
          onClick={handleCreateTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-4">
        {tasks?.map((task) => (
          <li
            key={task._id}
            className="border border-gray-300 p-4 rounded flex justify-between items-center"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task._id, task.completed)}
                className="mr-2"
              />

              {editTaskId === task._id ? (
                <input
                  type="text"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                  className="border border-gray-300 rounded p-2"
                />
              ) : (
                <Link to={`/tasks/${task._id}`} className="flex-1">
                  <span>{task.name}</span>
                </Link>
              )}
            </div>

            <div className="space-x-2">
              {editTaskId === task._id ? (
                <button
                  onClick={() => handleUpdateTask(task._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditTaskId(task._id);
                    setEditTaskName(task.name);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
