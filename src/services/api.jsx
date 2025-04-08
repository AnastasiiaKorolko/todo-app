import axios from 'axios';
const BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const fetchTasks = async () => {
  const { data } = await api.get('/todos?_limit=10');

  return data.map(task => ({
    id: task.id,
    title: task.title,
    completed: task.completed,
    priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
    createdAt: new Date().toISOString(),
  }));
};

export const createTask = async (task) => {
  const { data } = await api.post('/todos', task);

  return { ...task, id: Date.now() };
};

export const updateTask = async (task) => {
  const { data } = await api.put(`/todos/${task.id}`, task);
  return task;
}

export const deleteTask = async (id) => {
  const { data } = await api.delete(`/todos/${id}`);
  return id;
}

export const toggleTaskComplete = async (task) => {
  const updatedTask = { ...task, completed: !task.completed };

  await api.patch(`/todos/${task.id}`, { completed: updatedTask.completed });
  return updatedTask;
}