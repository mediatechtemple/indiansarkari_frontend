import React from "react";
import SearchFilter from "../search-filter";
import { Button } from "@/components/ui/button";

const JobFilters = () => {
  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        <SearchFilter placeholder="Location..." />
        <SearchFilter placeholder="Category..." />
        <SearchFilter placeholder="Department..." />
        <SearchFilter placeholder="Passed Education..." />
        <SearchFilter placeholder="Admit Card..." />
        <SearchFilter placeholder="Answer Key..." />
        <SearchFilter placeholder="Result..." />
      </div>
      <div className="flex justify-center space-x-4 mt-6">
        <Button
          //onClick={applyFilters}
          className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-secondary transition duration-200"
        >
          Apply Filters
        </Button>
        <Button
          //onClick={clearFilters}
          className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-secondary transition duration-200"
        >
          Clear Filters
        </Button>
      </div>
    </>
  );
};

export default JobFilters;
