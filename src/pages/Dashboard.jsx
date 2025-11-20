import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ContentGenerator from "./ContentGenerator";
import TextSummarizer from "./TextSummarizer";
import Translator from "./translator";
import SmartChat from "./SmartChat";

const Dashboard = () => {
  const [activeTool, setActiveTool] = useState("summarizer");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentText, setCurrentText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // ✅ التحقق من تسجيل الدخول
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setUser(userData ? JSON.parse(userData) : null);
    } catch (err) {
      console.error("Error parsing user data:", err);
      localStorage.removeItem("user");
      navigate("/login");
    }

    setLoading(false);
  }, [navigate]);

  // ✅ عرض الأداة المختارة
  const renderTool = () => {
    switch (activeTool) {
      case "generator":
        return <ContentGenerator onResult={setCurrentText} />;
      case "summarizer":
        return <TextSummarizer onResult={setCurrentText} />;
      case "translator":
        return <Translator onResult={setCurrentText} />;
      case "chat":
        return <SmartChat onResult={setCurrentText} />;
      default:
        return <TextSummarizer onResult={setCurrentText} />;
    }
  };

  // 💾 حفظ النص في MongoDB
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ يجب تسجيل الدخول أولاً!");
      navigate("/login");
      return;
    }

    if (!currentText.trim()) {
      alert("📝 لا يوجد نص لحفظه!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/saved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: currentText,
          tool: activeTool,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل في الحفظ");

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (err) {
      console.error("Save Error:", err);
      alert("❌ حدث خطأ أثناء حفظ النص.");
    }
  };

  // ⬇️ تحميل النص كملف .txt
  const handleDownload = () => {
    if (!currentText.trim()) {
      alert("📝 لا يوجد نص لتحميله!");
      return;
    }

    const blob = new Blob([currentText], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${activeTool}-result.txt`;
    link.click();
  };

  // 🚪 تسجيل الخروج
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ⏳ أثناء التحقق من المستخدم
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300 text-lg">جارٍ التحقق...</p>
      </div>
    );
  }

  // 🚫 في حال انتهاء الجلسة
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
          <p className="text-red-500 font-semibold mb-4">
            ⚠️ تم انتهاء الجلسة أو لم يتم تسجيل الدخول.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            العودة إلى تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  // ✅ الصفحة الرئيسية بعد التحقق
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <div className="flex flex-col items-center p-6">
        {/* 🧑‍💻 معلومات المستخدم */}
        {user && (
          <div className="text-center mb-4 text-gray-700 dark:text-gray-200">
            <p className="text-lg font-semibold">
              👋 Welcome {user.username || user.email.split("@")[0]}!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        )}

        {/* ✅ إشعار النجاح */}
        {showSuccess && (
          <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow-sm animate-pulse">
✅ Text saved successfully in the database!
          </div>
        )}

        {/* ✅ أزرار التحكم */}
        <div className="flex gap-4 mb-6 flex-wrap justify-center">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-green-700 transition"
          >
            💾 Save Text
          </button>

          <button
            onClick={handleDownload}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-indigo-700 transition"
          >
            ⬇️ Download
          </button>

          <button
            onClick={() => navigate("/saved")}
            className="bg-yellow-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-yellow-600 transition"
          >
            📂 View Saved
            </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-red-700 transition"
          >
🚪 Logout
          </button>
        </div>

        {/* ✅ أزرار اختيار الأداة */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { key: "generator", label: "Content Generator ✍️" },
            { key: "summarizer", label: "Text Summarizer 🧠" },
            { key: "translator", label: "Translator 🌐" },
            { key: "chat", label: "Smart Chat 💬" },
          ].map((tool) => (
            <button
              key={tool.key}
              onClick={() => setActiveTool(tool.key)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                activeTool === tool.key
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:bg-blue-500 hover:text-white"
              }`}
            >
              {tool.label}
            </button>
          ))}
        </div>

        {/* ✅ عرض الأداة المختارة */}
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          {renderTool()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
