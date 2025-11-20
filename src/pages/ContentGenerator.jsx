import React, { useState } from "react";

const ContentGenerator = ({ onResult }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("⚠️ Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);

      // 👇 رابط الـ Backend
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      onResult(data.result); // إرسال النص للـ Dashboard
    } catch (err) {
      console.error("Generation Error:", err);
      alert("❌ Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        className="w-full p-3 border rounded-lg"
        rows="5"
        placeholder="Enter your topic..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 mt-3 rounded-lg"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Content"}
      </button>
    </div>
  );
};

export default ContentGenerator;
