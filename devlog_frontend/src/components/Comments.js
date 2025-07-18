import React, { useEffect, useRef, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import "./Comments.css";

// PUBLIC_INTERFACE
function Comments({ postId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  // Note: For real-time, consider integrating websockets.
  const ws = useRef(null);

  useEffect(() => {
    fetchComments();
    // Optionally: setup WebSocket connection for real-time
    // ws.current = new WebSocket("ws://localhost:5000/ws/comments/" + postId);
    // ws.current.onmessage = (ev) => setComments(JSON.parse(ev.data));
    // return () => ws.current?.close();
    // eslint-disable-next-line
  }, [postId]);

  async function fetchComments() {
    setLoading(true);
    try {
      const res = await api.get(`/posts/${postId}/comments`);
      setComments(res.data.comments || []);
    } catch {
      setComments([]);
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!body.trim()) return;
    try {
      await api.post(`/posts/${postId}/comments`, { body });
      setBody("");
      fetchComments();
      // Optionally, push via websocket if real-time is set up.
    } catch {
      setErr("Error posting comment.");
    }
  }

  return (
    <section className="comments-section">
      <h2>Comments</h2>
      <div className="comments-list">
        {loading ? (
          <div>Loading...</div>
        ) : comments.length === 0 ? (
          <div>No comments yet.</div>
        ) : (
          comments.map((c) => (
            <div className="comment-item" key={c.id}>
              <strong>{c.author.username}:</strong>{" "}
              <span className="comment-body">{c.body}</span>
              <span className="comment-date">{new Date(c.created_at).toLocaleString()}</span>
            </div>
          ))
        )}
      </div>
      {user ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            rows={2}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button type="submit" className="comment-btn">
            Post
          </button>
        </form>
      ) : (
        <div className="comment-login-hint">Sign in to comment.</div>
      )}
      {err && <div className="comment-error">{err}</div>}
    </section>
  );
}

export default Comments;
