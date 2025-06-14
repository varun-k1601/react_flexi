import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate, useNavigate } from 'react-router-dom';
import BlogPostList from './components/BlogPostList/BlogPostList';
import BlogPostDetail from './components/BlogPostDetail/BlogPostDetail';
import BlogPostForm from './components/BlogPostForm/BlogPostForm';
import BlogPostDelete from './components/BlogPostDelete/BlogPostDelete';
import './App.css';

// Initial sample blog posts data
const initialPosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    summary: 'Learn the basics of React and build your first application. This comprehensive guide will walk you through the fundamentals of React, including components, props, state, and more.',
    content: `<p>Learn the basics of React and build your first application. This comprehensive guide will walk you through the fundamentals of React, including <strong>components</strong>, <em>props</em>, state, and more.</p>`,
    author: 'Jane Doe',
    date: '2023-01-01',
    url: '/posts/1',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    summary: 'A comparison of two powerful layout systems in CSS. Understand when to use Grid vs Flexbox, and how they can work together to create complex layouts with ease.',
    content: `<p>A comparison of two powerful layout systems in CSS. Understand when to use <a href='https://css-tricks.com/snippets/css/complete-guide-grid/' target='_blank' rel='noopener noreferrer'>Grid</a> vs <a href='https://css-tricks.com/snippets/css/a-guide-to-flexbox/' target='_blank' rel='noopener noreferrer'>Flexbox</a>, and how they can work together to create complex layouts with ease.</p>`,
    author: 'John Smith',
    date: '2023-02-15',
    url: '/posts/2',
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    summary: 'Tips for making your web applications more accessible. Learn about ARIA attributes, semantic HTML, keyboard navigation, and other essential practices for inclusive web design.',
    content: `<p>Tips for making your web applications more accessible. Learn about <strong>ARIA attributes</strong>, semantic HTML, keyboard navigation, and other essential practices for inclusive web design.</p>`,
    author: 'Alex Lee',
    date: '2023-03-10',
    url: '/posts/3',
  },
  {
    id: '4',
    title: 'Modern JavaScript Features',
    summary: 'Explore the latest features in JavaScript and how they can improve your code. From async/await to optional chaining, discover how modern JavaScript can make your code more elegant.',
    content: `<p>Explore the latest features in JavaScript and how they can improve your code. From <code>async/await</code> to optional chaining, discover how modern JavaScript can make your code more elegant.</p>`,
    author: 'Sam Patel',
    date: '2023-04-20',
    url: '/posts/4',
  },
];

function BlogPostDetailWrapper({ posts, setPosts }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  const navigate = useNavigate();
  if (!post) return <BlogPostDetail />;
  const handleDelete = async () => {
    setPosts(posts.filter((p) => p.id !== id));
    navigate('/');
  };
  return (
    <>
      <BlogPostDetail
        title={post.title}
        content={post.content}
        author={post.author}
        date={post.date}
      />
      <div style={{ textAlign: 'right', maxWidth: 800, margin: '0 auto' }}>
        <button
          onClick={() => navigate(`/edit/${post.id}`)}
          style={{ margin: '24px 8px 24px 0', padding: '10px 24px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16, cursor: 'pointer' }}
        >
          Edit Post
        </button>
        <span>
          <BlogPostDelete onDelete={handleDelete} />
        </span>
      </div>
    </>
  );
}

function BlogPostFormWrapper({ posts, setPosts, isEdit }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const post = isEdit ? posts.find((p) => p.id === id) : undefined;
  const handleSubmit = (formData) => {
    if (isEdit && post) {
      // Update existing post
      const updatedPosts = posts.map((p) =>
        p.id === id ? { ...p, ...formData, url: `/posts/${id}` } : p
      );
      setPosts(updatedPosts);
      navigate(`/posts/${id}`);
    } else {
      // Create new post
      const newId = (Math.max(...posts.map((p) => Number(p.id)), 0) + 1).toString();
      const newPost = {
        ...formData,
        id: newId,
        summary: formData.content.slice(0, 120) + (formData.content.length > 120 ? '...' : ''),
        url: `/posts/${newId}`,
      };
      setPosts([...posts, newPost]);
      navigate(`/posts/${newId}`);
    }
  };
  return <BlogPostForm post={post} onSubmit={handleSubmit} />;
}

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const navigate = useNavigate();
  return (
    <div className="app">
      <header className="app-header">
        <h1>My Blog</h1>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={
            <>
              <div style={{ textAlign: 'right', maxWidth: 1400, margin: '0 auto 16px auto' }}>
                <button
                  onClick={() => navigate('/create')}
                  style={{ margin: '16px 0', padding: '10px 24px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16, cursor: 'pointer' }}
                >
                  Create New Post
                </button>
              </div>
              <BlogPostList posts={posts} />
            </>
          } />
          <Route path="/create" element={<BlogPostFormWrapper posts={posts} setPosts={setPosts} isEdit={false} />} />
          <Route path="/edit/:id" element={<BlogPostFormWrapper posts={posts} setPosts={setPosts} isEdit={true} />} />
          <Route path="/posts/:id" element={<BlogPostDetailWrapper posts={posts} setPosts={setPosts} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
