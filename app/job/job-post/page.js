import JobTable from "@/components/job/jobTable";

import { jobPostHeaderControlls } from "@/config";

const JobPost = async () => {
  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        Job Posting
      </h1>
      <JobTable headers={jobPostHeaderControlls} />
    </div>
  );
};

export default JobPost;
