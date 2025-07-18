import React, { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

// PUBLIC_INTERFACE
function LikeButton({ postId, likes }) {
  const { user } = useAuth();
  const [count, setCount] = useState(likes || 0);
  const [liked, setLiked] = useState(false);

  async function handleLike() {
    if (!user) return;
    setLiked((prev) => !prev);
    setCount((c) => (liked ? c - 1 : c + 1));
    try {
      await api.post(`/posts/${postId}/like`);
    } catch {
      // revert UI if failed
      setLiked((prev) => !prev);
      setCount((c) => (liked ? c + 1 : c - 1));
    }
  }

  return (
    <button
      className={`like-btn${liked ? " liked" : ""}`}
      onClick={handleLike}
      disabled={!user}
      aria-label="Like"
    >
      ❤️ {count}
    </button>
  );
}

export default LikeButton;
