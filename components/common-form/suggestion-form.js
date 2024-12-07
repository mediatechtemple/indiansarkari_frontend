"use client";
import React, { useState } from "react";
import AsyncSelect from "react-select/async";

const AsyncSelectWrapper = ({ apiEndpoint, value, onChange }) => {
  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(`${apiEndpoint}?query=${inputValue}`);
      const data = await response.json();
      return data.rows.map((item) => ({
        value: item.id,
        label: item.name,
      }));
    } catch (error) {
      console.error("Error loading options:", error);
      return [];
    }
  };

  return (
    <AsyncSelect
      isMulti // Enable multiple selection
      cacheOptions
      defaultOptions
      loadOptions={loadOptions} // Async load options
      value={value}
      onChange={onChange}
      placeholder="Search and select..."
    />
  );
};

export default AsyncSelectWrapper;
