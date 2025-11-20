// src/pages/Generate.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";

const Generate = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = () => {
    // محاكاة عملية توليد المحتوى
    if (inputText.trim() === "") {
      setResult("Please enter some text to generate content.");
      return;
    }
    setResult(`Generated content for: "${inputText}"`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Generate AI Content</h2>
          <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto space-y-4">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your prompt here..."
              className="w-full h-32 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleGenerate} variant="primary" className="w-full">
              Generate
            </Button>
            {result && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <strong>Result:</strong>
                <p className="mt-2">{result}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Generate;
