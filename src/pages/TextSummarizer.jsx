import React, { useState } from "react";

const TextSummarizer = ({ onResult }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert("⚠️ Please enter text to summarize.");
      return;
    }

    try {
      setLoading(true);

      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Summarization failed");

      onResult(data.result);
    } catch (err) {
      console.error("Summarizer Error:", err);
      alert("❌ Error summarizing text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        className="w-full p-3 border rounded-lg"
        rows="6"
        placeholder="Enter text to summarize..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 mt-3 rounded-lg"
        onClick={handleSummarize}
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize Text"}
      </button>
    </div>
  );
};

export default TextSummarizer;
