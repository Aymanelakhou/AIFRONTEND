import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* 🔹 Hero Section */}
      <section className="text-center py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          AI-Powered Tools for <span className="text-blue-600">Content Creation</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Transform your workflow with AI tools to generate, summarize, translate, and chat smarter.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Creating
          </button>
        
        </div>
      </section>

      {/* ⚙️ Tools Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-10">Powerful AI Tools</h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {[
            {
              title: "Content Generator ✍️",
              desc: "Create high-quality content ideas, blogs, and posts effortlessly with AI precision.",
              color: "bg-purple-100 dark:bg-purple-900",
            },
            {
              title: "Text Summarizer 🧠",
              desc: "Summarize long documents or texts instantly while keeping the key insights.",
              color: "bg-blue-100 dark:bg-blue-900",
            },
            {
              title: "Translator 🌐",
              desc: "Translate your content across multiple languages using intelligent AI translation.",
              color: "bg-green-100 dark:bg-green-900",
            },
            {
              title: "Smart Chat 💬",
              desc: "Ask questions or brainstorm ideas with our intelligent AI-powered assistant.",
              color: "bg-orange-100 dark:bg-orange-900",
            },
          ].map((tool, i) => (
            <div
              key={i}
              className={`${tool.color} p-6 rounded-2xl shadow-md hover:scale-105 transition transform duration-300`}
            >
              <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{tool.desc}</p>
              <button
                onClick={() => navigate("/login")}
                className="mt-4 inline-block text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Try Now →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ⭐ Why Choose Us Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Our AI Tools?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Built with cutting-edge AI technology to deliver fast, accurate, and secure content results.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
          {[
            { title: "⚡ Lightning Fast", text: "Instant AI responses for all your creative tasks." },
            { title: "🔒 Secure & Private", text: "Your data stays safe and confidential with encryption." },
            { title: "🤖 Constantly Evolving", text: "Our AI improves daily to bring smarter results." },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
