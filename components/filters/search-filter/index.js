"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RiSearchLine } from "@remixicon/react";
import React, { useEffect, useState } from "react";

const SearchFilter = ({
  onSearch,
  placeholder,
  suggestions,
  value,
  clearSuggestions,
  clear,
}) => {
  const [searchValue, setSearchValue] = useState(value || "");

  useEffect(() => {
    if (clear) setSearchValue("");
  }, [clear]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onSearch(newValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    onSearch(suggestion); // Apply the suggestion
    clearSuggestions();
  };

  return (
    <div className="flex justify-center my-3">
      <div className="relative flex items-center w-full max-w-[300px]">
        <input
          onChange={handleInputChange}
          value={searchValue}
          type="text"
          placeholder={placeholder}
          className="w-full py-2 px-6 placeholder:text-gray-500 font-medium text-gray-800 border border-gray-300 rounded-full bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        <RiSearchLine
          className="absolute right-4 text-gray-500 hover:text-blue-400 text-base"
          size={17}
        />
        {searchValue && suggestions.length > 0 && (
          <ScrollArea
            className="absolute w-full max-h-60 mt-2 border border-gray-200 rounded-md shadow-lg bg-white z-50"
            style={{ top: "100%", position: "absolute" }}
          >
            <ul className="divide-y divide-gray-200">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
