import React from 'react';
import styles from './DeleteButton.module.css';
const DeleteButton = ({ onClick, disabled }) => (
  <button
    className={styles.deleteButton}
    onClick={onClick}
    disabled={disabled}
    tabIndex={0}
    type="button"
  >
    Delete
  </button>
);
export default DeleteButton;
