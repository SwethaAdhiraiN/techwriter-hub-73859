import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import Comments from "../components/Comments";
import "./PostDetail.css";

// PUBLIC_INTERFACE
function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line
  }, [id]);

  async function fetchPost() {
    setLoading(true);
    try {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data.post);
    } catch {
      setPost(null);
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    await api.delete(`/posts/${id}`);
    navigate("/");
  }

  if (loading) return <div className="main-loading">Loading post...</div>;
  if (!post) return <div className="main-error">Post not found</div>;

  return (
    <article className="post-detail">
      <header>
        <h1 className="detail-title">{post.title}</h1>
        <div className="detail-meta">
          <span>
            By <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> &middot; {new Date(post.created_at).toLocaleDateString()}
          </span>
          {user?.username === post.author.username && (
            <span>
              <Link to={`/editor/${id}`} className="detail-edit">Edit</Link>
              <button onClick={handleDelete} className="detail-delete">Delete</button>
            </span>
          )}
        </div>
        <p className="detail-tags">{post.tags && post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</p>
      </header>
      <section className="detail-body" dangerouslySetInnerHTML={{ __html: post.html }} />
      <Comments postId={id} />
    </article>
  );
}

export default PostDetail;
