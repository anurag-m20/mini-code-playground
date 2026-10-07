function Header({
  saveStatus,
  onRun,
  onReset,
  onClearConsole,
  onDownload,
}) {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-symbol">&lt;/&gt;</span>
        <span>Mini Code Playground</span>
      </div>

      <div className="header-actions">
        <div className="save-status">
          ● {saveStatus}
        </div>

        <button onClick={onRun}>
          Run
        </button>

        <button onClick={onReset}>
          Reset
        </button>

        <button onClick={onClearConsole}>
          Clear Console
        </button>

        <button onClick={onDownload}>
          Download
        </button>
      </div>
    </header>
  );
}

export default Header;