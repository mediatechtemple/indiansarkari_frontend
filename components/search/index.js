"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { RiSearchLine } from "@remixicon/react";
const debounce = (fn, delay) => {
  let timeOutID;
  return (...args) => {
    clearTimeout(timeOutID);
    timeOutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
const SearchBar = ({ onSearch, placeholder }) => {
  //   const [searchValue, setSearchValue] = useState("");
  //   const handelInputChange = (e) => {
  //     const value = e.target.value;
  //     setSearchValue(value);
  //     debounceSearch(value);
  //   };
  //   const debounceSearch = debounce((value) => {
  //     onSearch(value);
  //   }, 300);
  return (
    <div className="flex justify-center my-3">
      <div className="relative flex items-center w-full max-w-[300px]">
        <input
          type="text"
          placeholder={placeholder}
          className="w-96 py-2 px-6 placeholder:text-gray-500 font-medium text-gray-800 border border-gray-300 rounded-full bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        <RiSearchLine
          className="absolute right-4 text-gray-500 hover:text-blue-400 text-base"
          size={17}
        />
      </div>
    </div>
  );
};

export default SearchBar;
