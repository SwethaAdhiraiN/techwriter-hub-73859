import React, { useRef } from "react";
import "./MarkdownEditor.css";

// PUBLIC_INTERFACE
function MarkdownEditor({ value, onChange }) {
  const textareaRef = useRef();

  function handleInput(e) {
    onChange(e.target.value);
  }

  return (
    <div className="markdown-editor__wrapper">
      <textarea
        ref={textareaRef}
        className="markdown-editor"
        value={value}
        onChange={handleInput}
        rows={15}
        placeholder="Write your markdown here..."
        spellCheck={true}
        required
      />
      <div className="markdown-preview__container">
        <label>Preview</label>
        <div
          className="markdown-preview"
          dangerouslySetInnerHTML={{ __html: window.marked ? window.marked(value) : value }}
        />
      </div>
    </div>
  );
}

export default MarkdownEditor;
