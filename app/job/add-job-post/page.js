"use client";
import React, { useState } from "react";
import CommonForm from "@/components/common-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jobPostFormControlls } from "@/config";
import { initialJobFormData, postData } from "@/utils";
import { RiCloseLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const AddJobPost = () => {
  const [jobFormData, setJobFormData] = useState(initialJobFormData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleJobFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    delete jobFormData.state_id;
    delete jobFormData.subcategory_id;
    delete jobFormData.department_id;
    const data = await postData(`/job`, jobFormData);
    if (data) {
      setJobFormData(initialJobFormData);
      router.back("/job/job-post");
    } else {
      setLoading(false);
    }
  };

  const checkIfFormIsValid = () => {
    return jobFormData.title;
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="min-w-full shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl  text-lightBlue font-montserrat">
              Create Job Post
            </CardTitle>
            <RiCloseLine
              onClick={() => router.back("/job/job-post")}
              className="w-6 h-6 cursor-pointer font-bold"
            />
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <CommonForm
            formControlls={jobPostFormControlls}
            buttonText="Create"
            formData={jobFormData}
            setFormData={setJobFormData}
            isButtonDisabled={!checkIfFormIsValid()}
            handleSubmit={handleJobFormSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddJobPost;
