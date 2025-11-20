// src/components/Button.jsx
import React from "react";

const Button = ({ children, variant = "primary", ...props }) => {
  const baseClass = "px-4 py-2 rounded-md font-medium focus:outline-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };
  return (
    <button className={`${baseClass} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
