import { useState } from "react";

// This hook manages comments for a single post (by postId)
export default function useComments(postId) {
  // For demo: store comments in localStorage by postId
  const storageKey = `comments_${postId}`;
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const addComment = (comment) => {
    const newComment = {
      ...comment,
      id: Date.now().toString(),
    };
    const updated = [...comments, newComment];
    setComments(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  return [comments, addComment];
}
