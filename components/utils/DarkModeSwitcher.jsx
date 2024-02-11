"use client";

import { FaRegMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";

import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className={"rounded-sm pt-1"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <FaRegMoon /> : <FaRegSun />}
    </button>
  );
}
