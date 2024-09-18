"use client";

import Link from "next/link";
import Image from "next/image";
import { logo, moon, sun } from "@/public/Icons";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <header className="flex justify-between md:justify-evenly items-center bg-gray-900 dark:bg-[#252734] text-white p-4">
      <div>
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src={logo}
            alt="logo"
            width={32}
            height={32}
            className="text-white"
          />
          <h1 className="text-3xl font-bold">MyClass</h1>
        </Link>
      </div>
      <div className="flex gap-3 items-center">
        <Link href="/">
          <h2 className="text-xl md:text-2xl font-semibold hover:text-slate-400 duration-200">
            Creators
          </h2>
        </Link>
        <div>
          <Image
            src={darkMode ? sun : moon}
            alt="mode"
            width={28}
            height={28}
            className="cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
