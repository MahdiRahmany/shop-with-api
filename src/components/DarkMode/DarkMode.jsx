import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      // Handle system theme
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (systemDark) {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("system");
        break;
      default:
        setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <FaSun className="text-yellow-500" />; // Light icon
      case "dark":
        return <FaMoon className="text-blue-500" />; // Dark icon
      default:
        return <FaDesktop className="text-gray-500" />; // System icon
    }
  };

  return (
    <button
      onClick={handleThemeChange}
      className="relative flex items-center justify-center w-9 h-9 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:ring-4 hover:ring-slate-200 hover:outline-none"
    >
      <span
        className="absolute inset-0 flex items-center justify-center transform transition-transform duration-500 ease-in-out"
        style={{
          transform: theme === "light" ? "rotate(0deg)" : "rotate(360deg)",
        }}
      >
        {getIcon()}
      </span>
    </button>
  );
};

export default ThemeToggle;
