import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import "./Settings.css";

// PUBLIC_INTERFACE
function Settings() {
  const { user, setUser } = useAuth();
  const [bio, setBio] = useState(user?.bio || "");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  async function handleUpdate(e) {
    e.preventDefault();
    setErr("");
    setMessage("");
    try {
      const res = await api.put(`/users/${user.username}`, { bio });
      setMessage("Profile updated!");
      setUser(res.data.user);
    } catch {
      setErr("Failed to update profile.");
    }
  }

  return (
    <div className="settings-page">
      <form className="settings-form" onSubmit={handleUpdate}>
        <h2>Profile Settings</h2>
        {err && <div className="settings-error">{err}</div>}
        {message && <div className="settings-success">{message}</div>}
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
          rows={4}
        />
        <button type="submit" className="settings-btn">Update</button>
      </form>
    </div>
  );
}
export default Settings;
