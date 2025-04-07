import { useState, useEffect } from 'react';
import {
  fetchTasks,
  createTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
  toggleTaskComplete
} from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTasks();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError('Не вдалося завантажити завдання');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTasks();
  }, []);
  
  const addTask = async (task) => {
    try {
      setIsLoading(true);
      const newTask = await createTask(task);
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      setError('Не вдалося додати завдання');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateTask = async (updateTask) => {
    try {
      setIsLoading(true);
      await apiUpdateTask(updateTask);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === updateTask.id ? updateTask : task
        )
      );
    } catch (err) {
      setError('Не вдалося оновити завдання');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteTask = async (id) => {
    try {
      setIsLoading(true);
      await apiDeleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Не вдалося видалити завдання');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleComplete = async (id) => {
    try {
      const task = tasks.find(task => task.id === id);
      if (!task) return;
      
      const updatedTask = await toggleTaskComplete(task);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? updatedTask : task
        )
      );
    } catch (err) {
      setError('Не вдалося оновити статус завдання');
      console.error(err);
    }
  };
  
  return {
    tasks,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete
  };
};
