import { useEffect, useRef, useState } from "react"; // we used it for storing data that can be change
import "./App.css";
import JSZip from "jszip";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import Console from "./components/Console";
function App() {
  // -----------------------------
  // FILE STATES
  // -----------------------------
//yaha hum ek hi state ke andar 3 files ka code store kar rahe ho. HTML,CSS,JAVASCRIPT
 const defaultFiles = {
  html: `<h1>Hello World!</h1>
<p>Welcome to Mini Code Playground.</p>`,

  css: `body {
  font-family: Arial, sans-serif;
  padding: 30px;
}

h1 {
  color: #2563eb;
}`,

  js: `console.log("Hello from JavaScript!");`,
};

const [files, setFiles] = useState(() => {
  const savedFiles = localStorage.getItem("mini-ide-files");

  return savedFiles ? JSON.parse(savedFiles) : defaultFiles;
});

const [saveStatus, setSaveStatus] = useState("Saved");

useEffect(() => {
  localStorage.setItem("mini-ide-files", JSON.stringify(files));
  setSaveStatus("Saved");
}, [files]);

useEffect(() => {
  const handleKeyboardShortcut = (e) => {

    // Ctrl + S → Save
    if (e.ctrlKey && e.key.toLowerCase() === "s") {
      e.preventDefault();

      localStorage.setItem(
        "mini-ide-files",
        JSON.stringify(files)
      );

      setSaveStatus("Saved");
    }

    // Ctrl + Shift + X → Clear Console
    if (
      e.ctrlKey &&
      e.shiftKey &&
      e.key.toLowerCase() === "x"
    ) {
      e.preventDefault();

      clearConsole();
    }
  };

  window.addEventListener(
    "keydown",
    handleKeyboardShortcut
  );

  return () => {
    window.removeEventListener(
      "keydown",
      handleKeyboardShortcut
    );
  };
}, [files]);



  // -----------------------------
  // ACTIVE FILE
  // -----------------------------

  const [activeFile, setActiveFile] = useState("html");//Ye decide karta hai ki abhi editor mein kaunsi file open hai.
// activeFile = "html" esse application open hote hi HTML editor dikhega.
//Agar user CSS tab click kare fir setActiveFile("css")
  // -----------------------------
  // PREVIEW
  // -----------------------------

  const [previewCode, setPreviewCode] = useState("");//Ye state iframe ke andar chalne wala complete HTML document store karegi.
//Baad mein generatePreview() ise update karega.
  // -----------------------------
  // CONSOLE
  // -----------------------------

  const [consoleOutput, setConsoleOutput] = useState([]); //Ye console messages store karne ke liye hai.
  const consoleEndRef = useRef(null);

useEffect(() => {
  consoleEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [consoleOutput]);

  // -----------------------------
  // GET CURRENT CODE
  // -----------------------------

  const currentCode = files[activeFile]; //eska use Jo file currently active hai, uska code nikaal do.

  // -----------------------------
  // HANDLE CODE CHANGE
  // -----------------------------

  const handleCodeChange = (e) => { //Jab user textarea mein kuch type karta hai, ye function call hota hai.
    const newCode = e.target.value; //ye textarea ke andar ka latest code deta hai.
         setSaveStatus("Saving...");
    setFiles((previousFiles) => ({
      ...previousFiles, //Ye spread operator hai,Iska kaam hai existing object ki saari properties copy karna.
      [activeFile]: newCode,
    }));
  };

const handleEditorKeyDown = (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    e.preventDefault();

    clearConsole();
    generatePreview();
  }
};


  // -----------------------------
  // CREATE PREVIEW
  // -----------------------------

  const generatePreview = () => { //Ye function HTML + CSS + JS ko combine karke ek complete HTML document banata hai.
    const completeHTML = `  
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">

  <style>
    ${files.css} 
  </style>
</head>

<body>

  ${files.html}

  <script>
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;

  const sendToParent = (type, args) => {
  const formattedArgs = args.map((item) => {
    try {
      if (typeof item === "object" && item !== null) {
        return {
          isObject: true,
          value: item,
        };
      }

      return {
        isObject: false,
        value: String(item),
      };
    } catch {
      return {
        isObject: false,
        value: String(item),
      };
    }
  });

  window.parent.postMessage(
    {
      source: "mini-code-playground",
      type: type,
      args: formattedArgs,
    },
    "*"
  );
};

  console.log = (...args) => {
    originalLog(...args);
    sendToParent("log", args);
  };

  console.error = (...args) => {
    originalError(...args);
    sendToParent("error", args);
  };

  console.warn = (...args) => {
    originalWarn(...args);
    sendToParent("warn", args);
  };

  console.info = (...args) => {
    originalInfo(...args);
    sendToParent("info", args);
  };

window.onerror = (message, source, lineno, colno) => {
  window.parent.postMessage(
    {
      source: "mini-code-playground",
      type: "error",
      args: [
        {
          isObject: false,
          value: "Runtime Error: " + message + " (Line " + lineno + ")",
        },
      ],
    },
    "*"
  );
};
  
window.addEventListener("unhandledrejection", (event) => {
  window.parent.postMessage(
    {
      source: "mini-code-playground",
      type: "error",
      args: [
        {
          isObject: false,
          value: "Unhandled Promise Error: " + event.reason,
        },
      ],
    },
    "*"
  );
});

  ${files.js}
<\/script>

</body>
</html>
`;
// humne  <\/script> use kiya hai </script> ke badle ,Ye JavaScript template literal ke context mein </script> ko safely represent karne ke liye commonly kiya jata hai, especially jab HTML string JavaScript source ke andar embedded ho.
    setPreviewCode(completeHTML);
  };

  // -----------------------------
  // UPDATE PREVIEW
  // -----------------------------

  useEffect(() => {
    generatePreview();
  }, []);

 useEffect(() => {
  const handleMessage = (event) => {
    if (event.data?.source !== "mini-code-playground") {
      return;
    }

    setConsoleOutput((previousOutput) => [
      ...previousOutput,
      {
        type: event.data.type,
        args: event.data.args,
         time: new Date().toLocaleTimeString(),
      },
    ]);
  };

  window.addEventListener("message", handleMessage);

  return () => {
    window.removeEventListener("message", handleMessage);
  };
}, []);

const resetCode = () => {
  setFiles({
    html: `<h1>Hello World!</h1>
<p>Welcome to Mini Code Playground.</p>`,
    css: `body {
  font-family: Arial, sans-serif;
  padding: 30px;
}

h1 {
  color: #2563eb;
}`,
    js: `console.log("Hello from JavaScript!");`,
  });

  setActiveFile("html");
  setConsoleOutput([]);
};

  // -----------------------------
  // CLEAR CONSOLE
  // -----------------------------

  const clearConsole = () => {
    setConsoleOutput([]);
  };

const downloadFiles = async () => {
  const zip = new JSZip();

  const htmlFile = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mini Code Playground</title>

  <link rel="stylesheet" href="style.css">
</head>

<body>

  ${files.html}

  <script src="script.js"><\/script>

</body>
</html>`;

  zip.file("index.html", htmlFile);
  zip.file("style.css", files.css);
  zip.file("script.js", files.js);

  const content = await zip.generateAsync({
    type: "blob",
  });

  const url = URL.createObjectURL(content);

  const link = document.createElement("a");
  link.href = url;
  link.download = "mini-code-playground.zip";

  link.click();

  URL.revokeObjectURL(url);
};

  return (
    <div className="app">

      {/* ================= HEADER ================= */}

      <Header
  saveStatus={saveStatus}
  onRun={() => {
    clearConsole();
    generatePreview();
  }}
  onReset={() => {
    resetCode();

    setTimeout(() => {
      generatePreview();
    }, 0);
  }}
  onClearConsole={clearConsole}
  onDownload={downloadFiles}
/>


      {/* ================= MAIN WORKSPACE ================= */}

      <main className="workspace">

        {/* ================= EDITOR ================= */}

       <Editor
  activeFile={activeFile}
  setActiveFile={setActiveFile}
  currentCode={currentCode}
  handleCodeChange={handleCodeChange}
  handleEditorKeyDown={handleEditorKeyDown}
/>


        {/* ================= PREVIEW ================= */}

        <Preview
  previewCode={previewCode}
/>

      </main>


      {/* ================= CONSOLE ================= */}

      <Console
  consoleOutput={consoleOutput}
  clearConsole={clearConsole}
  consoleEndRef={consoleEndRef}
/>

    </div>
  );
}

export default App;
