import React from "react";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import "./PostCard.css";

// PUBLIC_INTERFACE
function PostCard({ post }) {
  return (
    <article className="post-card">
      <header>
        <Link className="post-title" to={`/posts/${post.id}`}>{post.title}</Link>
        <div className="post-meta">
          <span>
            By <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> &middot; {new Date(post.created_at).toLocaleDateString()}
          </span>
          {post.tags && <span className="post-tags">{post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</span>}
        </div>
      </header>
      <p className="post-excerpt">{post.excerpt}</p>
      <footer className="post-footer">
        <LikeButton postId={post.id} likes={post.likes} />
        <Link className="read-link" to={`/posts/${post.id}`}>Read More</Link>
      </footer>
    </article>
  );
}

export default PostCard;
