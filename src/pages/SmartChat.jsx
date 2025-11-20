import React, { useState } from "react";

const SmartChat = ({ onResult }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!message.trim()) {
      alert("⚠️ Please write your message.");
      return;
    }

    try {
      setLoading(true);

      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chat request failed");

      onResult(data.reply);
    } catch (err) {
      console.error("Chat Error:", err);
      alert("❌ Error processing chat request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        className="w-full p-3 border rounded-lg"
        placeholder="Ask me anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="bg-teal-600 text-white px-4 py-2 mt-3 rounded-lg"
        onClick={handleChat}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
};

export default SmartChat;
