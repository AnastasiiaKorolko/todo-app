import axios from 'axios';
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// export const fetchTasks = async () => {
//   const response = await fetch(`${BASE_URL}/todos?_limit=10`);

//   if (!response.ok) {
//     throw new Error('Error loading todo')
//   }

//   const data = await response.json();

//   return data.map(task => ({
//     id: task.id,
//     title: task.title,
//     completed: task.completed,
//     priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
//     createdAt: new Date().toISOString()
//   }))
// }

// export const createTask = async (task) => {
//   const response = await fetch(`${BASE_URL}/todos`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(task)
//   });

//   if (!response.ok) {
//     throw new Error ('Error create todo');
//   }

//   const data = await response.json();
//   return { ...task, id: Date.now() };
// };

// export const updateTask = async (task) => {
//   const response = await fetch(`${BASE_URL}/todos/${task.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(task)
//   });

//   if (!response.ok) {
//     throw new Error('Error update todo');
//   }

//   return task;
// }

// export const deleteTask = async (id) => {
//   const response = await fetch(`${BASE_URL}/todos/${id}`, {
//     method: 'DELETE'
//   });

//   if (!response.ok) {
//     throw new Error('Error delete todo');
//   }

//   return id;
// }

// export const toggleTaskComplete = async (task) => {
//   const updatedTask = { ...task, completed: !task.completed };

//   const response = await fetch(`${BASE_URL}/todos/${task.id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ completed: updateTask.completed })
//   });

//   if (!response.ok) {
//     throw new Error('Error update status todo');
//   }

//   return updateTask;
// }

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