import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-6 hidden md:block">
      <ul className="space-y-4">
        <li><a href="/dashboard" className="block p-2 rounded hover:bg-gray-200">Dashboard</a></li>
        <li><a href="/generate" className="block p-2 rounded hover:bg-gray-200">Generate</a></li>
        <li><a href="/pricing" className="block p-2 rounded hover:bg-gray-200">Pricing</a></li>
        <li><a href="/login" className="block p-2 rounded hover:bg-gray-200">Logout</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
