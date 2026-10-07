# Mini Code Playground

A browser-based code playground built with **React.js** that allows users to write and run **HTML, CSS, and JavaScript** in one place with a live preview.

## 🚀 Features

* ✍️ Write HTML, CSS, and JavaScript code
* 🔄 Live preview of the written code
* 🖥️ Separate editor tabs for HTML, CSS, and JavaScript
* 🐞 JavaScript console output inside the playground
* 💾 Automatically save code using Browser Local Storage
* 📂 Restore previously saved code
* 📦 Export project files as a ZIP file
* ⚡ Fast development environment using Vite
* 📱 Clean and responsive interface
* 🔒 Code runs inside a sandboxed preview environment

## 🛠️ Tech Stack

* **React.js**
* **JavaScript**
* **HTML5**
* **CSS3**
* **Vite**
* **JSZip**
* **Browser Local Storage**
* **Iframe & postMessage API**

## 📌 How It Works

The application provides separate editors for HTML, CSS, and JavaScript.

The entered code is combined dynamically to generate a complete HTML document. This document is rendered inside an iframe to provide a live preview.

JavaScript console messages are captured from the preview environment and displayed inside the playground.

The project also uses browser Local Storage to preserve the user's code and allows the complete project to be exported as a ZIP file.

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/anurag-m20/mini-code-playground.git
```

### 2. Navigate to the project directory

```bash
cd mini-code-playground
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## 📁 Project Structure

```text
mini-code-playground/
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   └── index.css
│
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## 💡 Key Concepts Used

* React state management using `useState`
* React references using `useRef`
* Side effects using `useEffect`
* Dynamic HTML generation
* Iframe-based live preview
* `postMessage` communication
* JavaScript console interception
* Browser Local Storage
* Client-side ZIP generation
* Component-based UI development

## 🔮 Future Improvements

* Syntax highlighting
* Multiple file support
* Code auto-completion
* Dark/light theme
* Resizable editor and preview panels
* Download individual files
* Improved error handling
* User authentication and cloud project storage

## 🎯 Purpose

This project was built to understand how browser-based development environments work while improving practical skills in **React.js, JavaScript, browser APIs, state management, and frontend application development**.

## 👨‍💻 Author

**Anurag Mishra**

GitHub: [anurag-m20](https://github.com/anurag-m20)

---

⭐ If you find this project useful, consider giving it a star!
