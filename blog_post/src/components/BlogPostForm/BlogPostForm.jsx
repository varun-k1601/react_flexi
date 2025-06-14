import React, { useState, useEffect } from 'react';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [date, setDate] = useState(post?.date ? post.date.slice(0, 10) : '');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTitle(post?.title || '');
    setContent(post?.content || '');
    setAuthor(post?.author || '');
    setDate(post?.date ? post.date.slice(0, 10) : '');
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title) newErrors.title = 'Required';
    if (!content) newErrors.content = 'Required';
    if (!author) newErrors.author = 'Required';
    if (!date) newErrors.date = 'Required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setSubmitting(true);
    await onSubmit({ title, content, author, date });
    setSubmitting(false);
  };

  return (
    <form className={styles.blogPostForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errors.title ? styles.inputError : ''}
          autoComplete="off"
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={errors.content ? styles.inputError : ''}
          rows={8}
        />
        {errors.content && <p className={styles.error}>{errors.content}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={errors.author ? styles.inputError : ''}
          autoComplete="off"
        />
        {errors.author && <p className={styles.error}>{errors.author}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="date">Publication Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={errors.date ? styles.inputError : ''}
        />
        {errors.date && <p className={styles.error}>{errors.date}</p>}
      </div>
      <div className={styles.formActions}>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;
