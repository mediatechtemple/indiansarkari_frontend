import JobTable from "@/components/job/jobTable";

import { jobPostHeaderControlls } from "@/config";
import { getData } from "@/utils";

const JobPost = async () => {
  const jobData = await getData("/job");

  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        Job Posting
      </h1>
      <JobTable jobFormData={jobData?.jobs} headers={jobPostHeaderControlls} />
    </div>
  );
};

export default JobPost;
