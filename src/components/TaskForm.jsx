import React, { useState, useEffect } from 'react';
import styles from './TaskForm.module.css';

const TaskForm = ({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        title,
        priority
      });
      onCancelEdit();
    } else {
      onAddTask({
        title,
        priority,
        completed: false,
        createdAt: new Date().toISOString()
      });
    }
    
    setTitle('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введіть нове завдання..."
          className={styles.input}
        />
        
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={styles.select}
        >
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
      </div>
      
      <div className={styles.buttons}>
        {editingTask && (
          <button
            type="button"
            onClick={onCancelEdit}
            className={styles.cancelButton}
          >
            Скасувати
          </button>
        )}
        
        <button
          type="submit"
          className={styles.submitButton}
        >
          {editingTask ? 'Оновити' : 'Додати'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;