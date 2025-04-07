import React from 'react';
import styles from './SortOptions.module.css';

const SortOptions = ({ sortBy, onSortChange }) => {
  return (
    <div className={styles.sortOptions}>
      <label className={styles.label}>Сортувати за:</label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className={styles.select}
      >
        <option value="date">Датою</option>
        <option value="priority">Пріоритетом</option>
      </select>
    </div>
  );
};

export default SortOptions;