import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './BlogPostItem.module.css';

const BlogPostItem = ({ title, summary, date, url }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className={styles.blogPostItem}>
      <Link to={url} className={styles.titleLink}>
        <h2 className={styles.title}>{title}</h2>
      </Link>
      <p className={styles.summary}>{summary}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
      <Link to={url} className={styles.readMoreBtn}>
        Read More
      </Link>
    </article>
  );
};

BlogPostItem.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default BlogPostItem;