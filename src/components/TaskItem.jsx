import React from 'react';
import styles from './TaskItem.module.css';

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
  const priorityClasses = {
    low: styles.priorityLow,
    medium: styles.priorityMedium,
    high: styles.priorityHigh
  };

  const priorityLabels = {
    low: 'Низький',
    medium: 'Середній', 
    high: 'Високий'
  };

  return (
    <div className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
      <div className={styles.taskContent}>
        <div className={styles.taskMain}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className={styles.checkbox}
          />
          
          <div>
            <h3 className={`${styles.taskTitle} ${task.completed ? styles.completedText : ''}`}>
              {task.title}
            </h3>
            
            <div className={styles.taskMeta}>
              <span className={`${styles.priorityBadge} ${priorityClasses[task.priority]}`}>
                {priorityLabels[task.priority]}
              </span>
              
              <span className={styles.date}>
                {new Date(task.createdAt).toLocaleDateString('uk-UA')}
              </span>
            </div>
          </div>
        </div>
        
        <div className={styles.taskActions}>
          <button
            onClick={() => onEditTask(task)}
            className={styles.editButton}
            aria-label="Редагувати"
          >
            <img src='/edit.png' alt="Редагувати" width="20" height="20" />
          </button>
          
          <button
            onClick={() => onDeleteTask(task.id)}
            className={styles.deleteButton}
            aria-label="Видалити"
          >
            <img src='/bin.png' alt="Редагувати" width="20" height="20" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;