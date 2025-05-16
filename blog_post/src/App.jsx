import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BlogPostList from './components/BlogPostList/BlogPostList';
import './App.css';

// Sample blog posts data
const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    summary: 'Learn the basics of React and build your first application. This comprehensive guide will walk you through the fundamentals of React, including components, props, state, and more.',
    date: '2023-01-01',
    url: '/posts/1',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    summary: 'A comparison of two powerful layout systems in CSS. Understand when to use Grid vs Flexbox, and how they can work together to create complex layouts with ease.',
    date: '2023-02-15',
    url: '/posts/2',
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    summary: 'Tips for making your web applications more accessible. Learn about ARIA attributes, semantic HTML, keyboard navigation, and other essential practices for inclusive web design.',
    date: '2023-03-10',
    url: '/posts/3',
  },
  {
    id: '4',
    title: 'Modern JavaScript Features',
    summary: 'Explore the latest features in JavaScript and how they can improve your code. From async/await to optional chaining, discover how modern JavaScript can make your code more elegant.',
    date: '2023-04-20',
    url: '/posts/4',
  },
];

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>My Blog</h1>
        </header>
        <main className="app-main">
          <BlogPostList posts={samplePosts} />
        </main>
      </div>
    </Router>
  );
}

export default App;
