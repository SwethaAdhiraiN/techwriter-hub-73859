import React from "react";
import "./Sidebar.css";

// PUBLIC_INTERFACE
function Sidebar({ tags, selectedTag, setSelectedTag }) {
  return (
    <aside className="sidebar">
      <h3>Tags</h3>
      <ul className="tag-list">
        {(tags && tags.length > 0) ? (
          tags.map((tag) => (
            <li
              key={tag}
              className={selectedTag === tag ? "tag-selected" : undefined}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            >
              # {tag}
            </li>
          ))
        ) : (
          <li className="tag-empty">No tags</li>
        )}
      </ul>
      {/* Add trending topics widget here if desired */}
    </aside>
  );
}

export default Sidebar;
