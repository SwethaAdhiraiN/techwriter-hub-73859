import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import MarkdownEditor from "../components/MarkdownEditor";
import "./Editor.css";

// PUBLIC_INTERFACE
function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) fetchPost();
    // eslint-disable-next-line
  }, [id]);

  async function fetchPost() {
    setLoading(true);
    try {
      const res = await api.get(`/posts/${id}`);
      setTitle(res.data.post.title);
      setTags(res.data.post.tags.join(", "));
      setBody(res.data.post.body);
    } catch {
      setTitle("");
      setTags("");
      setBody("");
      setError("No post found.");
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/posts/${id}`, { title, tags: tags.split(",").map(t => t.trim()), body });
      } else {
        await api.post("/posts", { title, tags: tags.split(",").map(t => t.trim()), body });
      }
      navigate("/");
    } catch {
      setError("Could not save post.");
    }
  }

  if (!user) return <div>Authentication required.</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="editor-page">
      <form className="editor-form" onSubmit={handleSubmit}>
        <h2>{id ? "Edit Post" : "New Post"}</h2>
        {error && <div className="editor-error">{error}</div>}
        <input
          type="text"
          className="editor-title-input"
          placeholder="Title"
          value={title}
          autoFocus
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          className="editor-tags-input"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        <MarkdownEditor value={body} onChange={setBody} />
        <button className="editor-btn" type="submit">{id ? "Update" : "Publish"}</button>
      </form>
    </div>
  );
}
export default Editor;
