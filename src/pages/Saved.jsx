import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedItems = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/saved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "حدث خطأ أثناء جلب البيانات");
        setSavedItems(data);
      } catch (err) {
        console.error("Fetch Saved Error:", err);
        alert("❌ حدث خطأ أثناء تحميل النصوص المحفوظة");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedItems();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          ⏳ جاري تحميل النصوص المحفوظة...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          📂 النصوص المحفوظة
        </h1>

        {savedItems.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            لا توجد نصوص محفوظة حتى الآن.
          </p>
        ) : (
          <div className="space-y-4">
            {savedItems.map((item) => (
              <div
                key={item._id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    🧠 الأداة: {item.tool}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.createdAt).toLocaleString("ar-MA")}
                  </span>
                </div>
                <p className="text-gray-800 dark:text-white whitespace-pre-wrap">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            🔙 العودة إلى لوحة التحكم
          </button>
        </div>
      </div>
    </div>
  );
};

export default Saved;
