import React, { useState } from "react";

const Translator = ({ onResult }) => {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState("en");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) {
      alert("⚠️ Please enter text to translate.");
      return;
    }

    try {
      setLoading(true);

      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang: targetLang }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Translation failed");

      onResult(data.result);
    } catch (err) {
      console.error("Translate Error:", err);
      alert("❌ Error translating text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        className="w-full p-3 border rounded-lg"
        rows="5"
        placeholder="Enter text to translate..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        className="mt-3 p-2 border rounded-lg"
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
      >
        <option value="en">🇬🇧 English</option>
        <option value="fr">🇫🇷 French</option>
        <option value="es">🇪🇸 Spanish</option>
        <option value="ar">🇸🇦 Arabic</option>
      </select>

      <button
        className="bg-purple-600 text-white px-4 py-2 mt-3 rounded-lg"
        onClick={handleTranslate}
        disabled={loading}
      >
        {loading ? "Translating..." : "Translate"}
      </button>
    </div>
  );
};

export default Translator;
