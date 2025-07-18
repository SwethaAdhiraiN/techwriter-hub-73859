import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import "./Profile.css";

// PUBLIC_INTERFACE
function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, [username]);

  async function fetchProfile() {
    setLoading(true);
    try {
      const res = await api.get(`/users/${username}`);
      setProfile(res.data.user);
      setPosts(res.data.posts || []);
    } catch {
      setProfile(null);
      setPosts([]);
    }
    setLoading(false);
  }

  if (loading) return <div className="main-loading">Loading...</div>;
  if (!profile) return <div className="main-error">User not found.</div>;

  return (
    <section className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">{profile.username[0].toUpperCase()}</div>
        <h2>{profile.username}</h2>
        <p className="profile-bio">{profile.bio || "No bio set."}</p>
      </div>
      <div className="profile-posts">
        <h3>Posts by {profile.username}</h3>
        {posts.length === 0 ? (
          <div>No posts yet.</div>
        ) : (
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                <span className="profile-post-date">{new Date(post.created_at).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
export default Profile;
