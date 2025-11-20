import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ إذا المستخدم مسجل دخول مسبقًا → يذهب مباشرة إلى Dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  // 🔑 دالة تسجيل الدخول
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login Response:", data);

      // ⚠️ تحقق من وجود خطأ
      if (!res.ok) {
        setError(data.error || "❌ Invalid email or password");
        setLoading(false);
        return;
      }

      // ✅ تحقق من وجود التوكن قبل الحفظ
      if (!data.token) {
        setError("⚠️ Login failed — token not received from server.");
        setLoading(false);
        return;
      }

      // ✅ حفظ التوكن وبيانات المستخدم في localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ⏳ تأخير بسيط قبل التوجيه لضمان تخزين البيانات
      setTimeout(() => {
        navigate("/dashboard");
      }, 300);
    } catch (err) {
      console.error("Login error:", err);
      setError("⚠️ Server error. Make sure the backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* 📨 Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* 🔒 Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ⚠️ Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* 🔘 Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 🧾 Link to Register */}
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
