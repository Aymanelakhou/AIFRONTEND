import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-2xl font-bold text-gray-900 dark:text-white">
            AI Generator
          </div>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Login
            </Link>
            <Link
              to="/pricing"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Pricing
            </Link>
            <Link
              to="/register"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
