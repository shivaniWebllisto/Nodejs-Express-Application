// src/api.js

import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

// Get all tasks
export const getAllTasks = () => axios.get(`${API_URL}/tasks`);

// Create a new task
export const createTask = (taskData) =>
  axios.post(`${API_URL}/tasks`, taskData);
export const getSingleTask = (taskId) =>
  axios.get(`${API_URL}/tasks/${taskId}`);
// Update a task
export const updateTask = (taskId, taskData) =>
  axios.patch(`${API_URL}/tasks/${taskId}`, taskData);

// Delete a task
export const deleteTasks= (taskId) =>
  axios.delete(`${API_URL}/tasks/${taskId}`);
