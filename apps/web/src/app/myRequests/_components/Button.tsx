import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "success" | "danger";
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "primary" }) => {
  const base = "px-5 py-2 rounded-xl font-medium shadow-md transition";
  const styles = {
    primary: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
    success: "bg-green-100 text-green-700",
    danger: "bg-red-100 text-red-700",
  };

  return (
    <button className={`${base} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};

