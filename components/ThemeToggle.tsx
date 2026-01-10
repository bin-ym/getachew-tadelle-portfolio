"use client";

import { useState } from "react";

export default function ThemeToggle() {
  // Read initial value lazily (runs only on client)
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setDark(root.classList.contains("dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 text-sm border rounded-md hover:bg-muted transition"
    >
      {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>
  );
}
