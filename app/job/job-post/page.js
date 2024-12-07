"use client"; // Ensure this JobPost is client-side

import CommonTable from "@/components/common-table";
import JobFilters from "@/components/filters/job-filter";
import SearchBar from "@/components/search";
import { Button } from "@/components/ui/button";
import { jobPostHeaderControlls } from "@/config";
import Link from "next/link";
import React, { useState } from "react";

const JobPost = () => {
  const [jobData, setJobData] = useState([]); // Use state to manage job data

  const handleEdit = (job) => {
    console.log("Edit job: ", job);
    // Implement your logic for editing a job
  };

  const handleDelete = (jobId) => {
    setJobData(jobData.filter((job) => job.id !== jobId));
    console.log("Deleted job with id:", jobId);
  };

  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        Job Posting
      </h1>
      <div className="flex justify-between items-center">
        <SearchBar placeholder="Search Across Job Posting......." />

        <Button className="bg-primary text-white font-montserrat rounded-xl">
          <Link href="/job/add-job-post">Add New Job +</Link>
        </Button>
      </div>
      <h1 className="text-2xl font-semibold text-blueish font-montserrat">
        Filters By
      </h1>
      <JobFilters />
      <CommonTable
        data={jobData} // Use the job data state
        headers={jobPostHeaderControlls}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default JobPost;
