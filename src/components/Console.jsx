function Console({
  consoleOutput,
  clearConsole,
  consoleEndRef,
}) {
  return (
    <section className="console-panel">

      <div className="console-header">
        <div>
          <span>Console</span>

          <span className="console-count">
            {consoleOutput.length}
          </span>
        </div>

        <button onClick={clearConsole}>
          Clear
        </button>
      </div>

      <div className="console-content">

        {consoleOutput.length === 0 ? (
          <div className="empty-console">
            Console output will appear here...
          </div>
        ) : (
          consoleOutput.map((message, index) => (
            <div
              key={index}
              className={`console-message ${message.type}`}
            >

              <span className="console-arrow">
                {message.type === "error"
                  ? "✕"
                  : message.type === "warn"
                  ? "⚠"
                  : message.type === "info"
                  ? "ⓘ"
                  : "›"}
              </span>

              <div className="console-message-content">

                <span className="console-time">
                  {message.time}
                </span>

                {message.args.map((item, itemIndex) => {

                  if (item.isObject) {
                    return (
                      <details
                        key={itemIndex}
                        className="console-object"
                      >
                        <summary>
                          {Array.isArray(item.value)
                            ? "Array"
                            : "Object"}
                        </summary>

                        <pre>
                          {JSON.stringify(
                            item.value,
                            null,
                            2
                          )}
                        </pre>
                      </details>
                    );
                  }

                  return (
                    <span key={itemIndex}>
                      {item.value}{" "}
                    </span>
                  );
                })}

              </div>

            </div>
          ))
        )}

        <div ref={consoleEndRef} />

      </div>

    </section>
  );
}

export default Console;