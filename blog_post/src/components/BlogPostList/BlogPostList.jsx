import React from 'react';
import PropTypes from 'prop-types';
import BlogPostItem from '../BlogPostItem/BlogPostItem';
import styles from './BlogPostList.module.css';

const highlight = (text, term) => {
  if (!term) return text;
  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i} style={{background:'#fff59d',padding:0}}>{part}</mark> : part
  );
};

const BlogPostList = ({ posts, searchQuery }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className={styles.emptyState} aria-live="polite">
        <p>No posts found.</p>
      </div>
    );
  }

  return (
    <div className={styles.blogPostList}>
      {posts.map((post) => (
        <BlogPostItem
          key={post.id}
          title={highlight(post.title, searchQuery)}
          summary={highlight(post.summary, searchQuery)}
          date={post.date}
          url={post.url}
        />
      ))}
    </div>
  );
};

BlogPostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BlogPostList;