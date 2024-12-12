"use client";
import React, { useEffect, useState } from "react";
import SearchFilter from "../search-filter";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "../date-filter";
import { RangeFilter } from "../range-filter";
import { Label } from "@/components/ui/label";
const defalutInitialValue = {
  location: "",
  category: "",
  department: "",
  content: "",
  publishDate: "",
  salary: null,
  age: null,
  exprience: null,
};

const JobFilters = ({
  onApplyFilter,
  locations = [],
  categories = [],
  departments = [],
  contentData = [],
  dateLabel,
}) => {
  const [filters, setFilters] = useState(defalutInitialValue);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [departmentSuggestions, setDepartmentSuggestions] = useState([]);

  const [contentSuggestions, setContentSuggestions] = useState([]);

  const [resetDate, setResetDate] = useState(false);
  const [resetRange, setResetRange] = useState(false);
  const handleInputChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleSearch = (key, value) => {
    if (key === "location") {
      setLocationSuggestions(
        locations.filter((location) =>
          location.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else if (key === "category") {
      setCategorySuggestions(
        categories.filter((category) =>
          category.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else if (key === "department") {
      setDepartmentSuggestions(
        departments.filter((department) =>
          department.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else if (key === "content") {
      setContentSuggestions(
        contentData.filter((content) =>
          content.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
    handleInputChange(key, value); // Update the filter value
  };

  const applyFilters = () => {
    onApplyFilter(filters);
  };

  const clearFilters = () => {
    setResetDate(true);
    setResetRange(true);
    setFilters(defalutInitialValue);
    setLocationSuggestions([]);
    setCategorySuggestions([]);
    setDepartmentSuggestions([]);
    setContentSuggestions([]);
    onApplyFilter(defalutInitialValue);
  };

  useEffect(() => {
    if (resetDate) setResetDate(false);
    if (resetRange) setResetRange(false);
  }, [resetDate, resetRange]);

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        <SearchFilter
          placeholder="Location..."
          value={filters.location}
          suggestions={locationSuggestions}
          onSearch={(value) => handleSearch("location", value)}
          clearSuggestions={() => setLocationSuggestions([])}
          clear={filters.location === ""}
        />
        <SearchFilter
          placeholder="Category..."
          value={filters.category}
          suggestions={categorySuggestions}
          onSearch={(value) => handleSearch("category", value)}
          clearSuggestions={() => setCategorySuggestions([])}
          clear={filters.category === ""}
        />
        <SearchFilter
          placeholder="Department..."
          value={filters.department}
          suggestions={departmentSuggestions}
          onSearch={(value) => handleSearch("department", value)}
          clearSuggestions={() => setDepartmentSuggestions([])}
          clear={filters.department === ""}
        />
        <SearchFilter
          placeholder="Passed Education..."
          value={filters.content}
          suggestions={contentSuggestions}
          onSearch={(value) => handleSearch("content", value)}
          clearSuggestions={() => setContentSuggestions([])}
          clear={filters.content === ""}
        />
        <SearchFilter placeholder="Admit Card..." />
        <SearchFilter placeholder="Answer Key..." />
        <SearchFilter placeholder="Result..." />
        <div className="flex flex-col border border-gray-200 hover:border-secondary rounded-xl">
          <Label className=" text-gray-700 mb-2 text-center">
            {dateLabel} Publish Date of Job Posting
          </Label>
          <DatePickerWithRange
            onDateRangeChange={(selectedRange) =>
              handleInputChange("publishDate", selectedRange)
            }
            resetDate={resetDate}
          />
        </div>

        <div className="border-2 p-1 border-gray-200 hover:border-secondary rounded-xl">
          <RangeFilter
            min={10000}
            max={100000}
            label="Salary"
            onChange={(value) => {
              //console.log("Salary range selected:", value);
              setFilters({ ...filters, salary: value[0] });
            }}
            resetRange={resetRange}
          />
        </div>

        <div className="border-2 p-1 border-gray-200 hover:border-secondary rounded-xl">
          <RangeFilter
            min={15}
            max={40}
            label="Age"
            onChange={(value) => {
              //console.log("Age range selected:", value);
              setFilters({ ...filters, age: value[0] });
            }}
            resetRange={resetRange}
          />
        </div>

        <div className=" border-2 p-1 border-gray-200 hover:border-secondary rounded-xl">
          <RangeFilter
            min={0}
            max={10}
            label="Exprience"
            onChange={(value) => {
              //console.log("Age range selected:", value);
              setFilters({ ...filters, exprience: value[0] });
            }}
            resetRange={resetRange}
          />
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-6">
        <Button
          onClick={applyFilters}
          className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-secondary transition duration-200"
        >
          Apply Filters
        </Button>
        <Button
          onClick={clearFilters}
          className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-secondary transition duration-200"
        >
          Clear Filters
        </Button>
      </div>
    </>
  );
};

export default JobFilters;
