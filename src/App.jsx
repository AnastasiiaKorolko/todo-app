import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import SortOptions from './components/SortOptions';
import { useTasks } from './hooks/useTasks';
import styles from './App.module.css';

function App() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [editingTask, setEditingTask] = useState(null);
  
  const {
    tasks,
    isLoading,
    error,
    addTask,
    toggleComplete,
    deleteTask, 
    updateTask 
  } = useTasks();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityValues = { high: 3, medium: 2, low: 1 };
      return priorityValues[b.priority] - priorityValues[a.priority];
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  return (
    <div className={styles.container}>
      <div className={styles.appWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Список справ</h1>
        </div>
        
        <div className={styles.content}>
          <TaskForm 
            onAddTask={addTask}
            editingTask={editingTask}
            onUpdateTask={updateTask}
            onCancelEdit={() => setEditingTask(null)}
          />
          
          <div className={styles.controlsWrapper}>
            <FilterButtons filter={filter} onFilterChange={setFilter} />
            <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
          </div>
          
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
            </div>
          ) : error ? (
            <div className={styles.errorMessage}>{error}</div>
          ) : (
            <TaskList
              tasks={sortedTasks}
              onToggleComplete={toggleComplete}
              onDeleteTask={deleteTask}
              onEditTask={handleEditTask}
            />
          )}
        </div>
        
        <div className={styles.footer}>
          Всього завдань: {tasks.length} | Виконано: {tasks.filter(t => t.completed).length}
        </div>
      </div>
    </div>
  );
}

export default App;