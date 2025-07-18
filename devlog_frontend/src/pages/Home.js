import React, { useEffect, useState } from "react";
import api from "../utils/api";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import "./Home.css";

// PUBLIC_INTERFACE
function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [query, selectedTag]);

  async function fetchPosts() {
    setLoading(true);
    let url = "/posts";
    if (query) url += `?search=${encodeURIComponent(query)}`;
    if (selectedTag) url += query ? `&tag=${selectedTag}` : `?tag=${selectedTag}`;
    try {
      const res = await api.get(url);
      setPosts(res.data.posts ?? []);
      setTags(res.data.tags || []);
    } catch {
      setPosts([]);
      setTags([]);
    }
    setLoading(false);
  }

  return (
    <div className="home-page">
      <aside className="home-sidebar">
        <Sidebar tags={tags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      </aside>
      <section className="home-main">
        <SearchBar query={query} setQuery={setQuery} />
        {loading ? (
          <div className="main-loading">Loading posts...</div>
        ) : (
          <div className="post-list">
            {posts.length === 0 ? (
              <div className="no-posts">No posts found.</div>
            ) : (
              posts.map((p) => <PostCard key={p.id} post={p} />)
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
