"use client";

import { useState } from "react";

const SearchBar = () => {
  const [activeSearch, setActiveSearch] = useState([]);
  return (
    <form className="w-[200px] relative">
      <div className="relative flex gap-2 justify-around">
        <input
          type="search"
          id="form"
          placeholder="Search..."
          className="w-full p-3 rounded-xl shadow-lg bg-white focus:outline-green-custom"
          onChange=""
        />
      </div>
    </form>
  );
};

export default SearchBar;
