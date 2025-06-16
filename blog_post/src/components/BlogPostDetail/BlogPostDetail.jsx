import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPostDetail.module.css';

const BlogPostDetail = ({ title, content, author, date }) => {
  if (!title || !content || !author || !date) {
    return <p className={styles.notFound}>Blog post not found.</p>;
  }
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <div className={styles.blogPostDetail}>
      <Link to="/" className={styles.backLink}>
        &larr; Back to all posts
      </Link>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.author}>By {author}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default BlogPostDetail;
