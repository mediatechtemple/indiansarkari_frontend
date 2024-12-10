"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

export function RangeFilter({
  className,
  min = 0,
  max = 100,
  label,
  onChange,
  resetRange,
  ...props
}) {
  // Initialize slider value in state
  const [value, setValue] = useState([min]);

  // Handle slider value change
  const handleChange = (newValue) => {
    setValue(newValue);
    onChange && onChange(newValue);
  };

  useEffect(() => {
    if (resetRange) {
      setValue([min]);
      onChange && onChange([min]);
    }
  }, [resetRange, min, onChange]);

  return (
    <div className="flex flex-col items-center py-2 ">
      {/* Display the label and current value */}
      <span className="text-gray-700 font-semibold text-center mb-2">
        {label}: {value}
      </span>
      <Slider
        value={value}
        onValueChange={handleChange}
        min={min}
        max={max}
        step={1}
        className={cn("w-full cursor-pointer hover:bg-blue-300", className)}
        // thumbClassName="bg-blue-500 hover:bg-blue-600"
        // trackClassName="bg-gray-300 hover:bg-blue-400 h-0.2"
        {...props}
      />
    </div>
  );
}
