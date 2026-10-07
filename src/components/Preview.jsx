function Preview({ previewCode }) {
  return (
    <section className="preview-panel">

      <div className="panel-header">
        <span>Preview</span>

        <span className="status">
          ● Live
        </span>
      </div>

      <div className="preview-container">
        <iframe
          title="Live Preview"
          srcDoc={previewCode}
          className="preview-frame"
           sandbox="allow-scripts"
        />
      </div>

    </section>
  );
}

export default Preview;