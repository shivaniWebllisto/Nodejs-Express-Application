// src/components/TaskManagerSingle.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleTask} from '../api'; // Import your API function to fetch a single task

const TaskManagerSingle = () => {
  const { id } = useParams(); // Get the task ID from the URL parameters
  const [task, setTask] = useState(null);

  // Fetch the task data based on the ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getSingleTask(id); // Use getSingleTask to fetch the task by ID
        setTask(response.data.task); // Adjust according to your API response structure
      } catch (error) {
        console.error('Error fetching task', error);
      }
    };

    fetchTask();
  }, [id]);

  if (!task) return <div>Loading...</div>; 
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <div className="border border-gray-300 p-4 rounded">
        <h2 className="text-xl font-semibold">Task: {task.name}</h2>
        <p className="mt-2">ID: {task._id}</p>
        <p className="mt-2">Completed: {task.completed==true? "Completed":"Not Completed"}</p>
     
      </div>
    </div>
  );
};

export default TaskManagerSingle;
