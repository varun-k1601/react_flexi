import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPostDetail.module.css';
import CommentList from '../Comment/CommentList';
import CommentForm from '../Comment/CommentForm';
import useComments from '../Comment/useComments';

const BlogPostDetail = ({ title, content, author, date, id }) => {
  const postId = id;
  const [comments, addComment] = useComments(postId);
  // Demo: fake login state
  const isLoggedIn = false; // set to true to simulate logged-in
  const userName = 'Demo User';
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
      {/* Comment System */}
      <section
        style={{
          width: '100%',
          maxWidth: 600,
          margin: '40px auto 0 auto',
        }}
        aria-label="Comments"
      >
        <h2 style={{ fontSize: '1.4em', marginBottom: 12 }}>Comments</h2>
        <CommentList comments={comments} />
        <CommentForm
          onSubmit={addComment}
          isLoggedIn={isLoggedIn}
          userName={isLoggedIn ? userName : ''}
        />
      </section>
    </div>
  );
};

export default BlogPostDetail;
