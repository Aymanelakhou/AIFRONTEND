import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ اختبار وجود المفتاح (اختياري)
console.log("✅ OpenAI Key Loaded:", import.meta.env.VITE_OPENAI_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
