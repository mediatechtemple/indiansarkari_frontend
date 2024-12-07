import { RiSearchLine } from "@remixicon/react";
import React from "react";

const SearchFilter = ({ placeholder }) => {
  return (
    <div className="flex justify-center my-3">
      <div className="relative flex items-center w-full max-w-[300px]">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full py-2 px-6 placeholder:text-gray-500 font-medium text-gray-800 border border-gray-300 rounded-full bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        <RiSearchLine
          className="absolute right-4 text-gray-500 hover:text-blue-400 text-base"
          size={17}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
