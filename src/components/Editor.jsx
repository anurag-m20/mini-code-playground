function Editor({
  activeFile,
  setActiveFile,
  currentCode,
  handleCodeChange,
  handleEditorKeyDown,
}) {
  return (
    <section className="editor-panel">

      <div className="tabs">
        <button
          className={activeFile === "html" ? "active" : ""}
          onClick={() => setActiveFile("html")}
        >
          HTML
        </button>

        <button
          className={activeFile === "css" ? "active" : ""}
          onClick={() => setActiveFile("css")}
        >
          CSS
        </button>

        <button
          className={activeFile === "js" ? "active" : ""}
          onClick={() => setActiveFile("js")}
        >
          JavaScript
        </button>
      </div>

      <div className="editor-header">
        <span>
          {activeFile === "html"
            ? "index.html"
            : activeFile === "css"
            ? "style.css"
            : "script.js"}
        </span>

        <span className="language">
          {activeFile.toUpperCase()}
        </span>
      </div>

      <textarea
        className="code-editor"
        value={currentCode}
        onChange={handleCodeChange}
        onKeyDown={handleEditorKeyDown}
        spellCheck="false"
      />

    </section>
  );
}

export default Editor;