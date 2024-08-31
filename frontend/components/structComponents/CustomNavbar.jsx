"use client";

import Link from "next/link";
import Image from "next/image";
import { logo, moon, sun, hamburger, close } from "@/public/Icons";
import { useState, useEffect } from "react";

const CustomNavbar = ({ navbarList }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState();

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
    <header className="flex md:hidden justify-between items-center bg-gray-900 text-white p-4">
      <div>
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src={logo}
            alt="logo"
            width={32}
            height={32}
            className="text-white"
          />
          <h1 className="text-xl font-bold">MyClass</h1>
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        <Image
          src={darkMode ? sun : moon}
          alt="mode"
          width={26}
          height={26}
          className="cursor-pointer"
          onClick={() => setDarkMode(!darkMode)}
        />
        <Image
          src={toggleDropdown ? close : hamburger}
          alt="hamburger"
          width={32}
          height={32}
          className="cursor-pointer"
          onClick={() => setToggleDropdown((prev) => !prev)}
        />
      </div>

      {/* Dropdown Menu */}
      {toggleDropdown && (
        <div className="absolute top-14 right-4 md:hidden bg-slate-400 rounded-lg z-40">
          <ul className="w-52">
            {navbarList.map((item) => (
              <Link href={item.link} key={item.id}>
                <li
                  className="flex items-center mb-3 gap-2 cursor-pointer p-2"
                  onClick={(e) => {
                    setToggleDropdown(false);
                  }}
                >
                  <Image
                    src={item.icon}
                    width={22}
                    height={22}
                    alt={item.label}
                    className=""
                  />
                  <h2 className="font-semibold text-base">{item.label}</h2>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default CustomNavbar;
