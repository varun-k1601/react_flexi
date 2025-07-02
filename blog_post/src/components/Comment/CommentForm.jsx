import React, { useState } from "react";
import styles from "./CommentForm.module.css";

const CommentForm = ({ onSubmit, isLoggedIn, userName }) => {
  const [name, setName] = useState(userName || "");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!isLoggedIn && !name.trim()) || !text.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    onSubmit({
      name: isLoggedIn ? userName : name,
      text,
      date: new Date().toISOString(),
    });
    setText("");
    if (!isLoggedIn) setName("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-label="Add a comment">
      {!isLoggedIn && (
        <div className={styles.field}>
          <label htmlFor="comment-name">Name</label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>
      )}
      <div className={styles.field}>
        <label htmlFor="comment-text">Comment</label>
        <textarea
          id="comment-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          required
        />
      </div>
      {error && <div className={styles.error} role="alert">{error}</div>}
      <button type="submit" className={styles.submit} aria-label="Submit comment">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
