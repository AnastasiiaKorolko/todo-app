import React from 'react';
import styles from './FilterButtons.module.css';

const FilterButtons = ({ filter, onFilterChange }) => {
  return (
    <div className={styles.filterButtons}>
      <button
        onClick={() => onFilterChange('all')}
        className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
      >
        Всі
      </button>
      
      <button
        onClick={() => onFilterChange('active')}
        className={`${styles.filterButton} ${filter === 'active' ? styles.active : ''}`}
      >
        Активні
      </button>
      
      <button
        onClick={() => onFilterChange('completed')}
        className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
      >
        Виконані
      </button>
    </div>
  );
};

export default FilterButtons;