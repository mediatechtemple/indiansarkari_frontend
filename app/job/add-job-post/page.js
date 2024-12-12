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
  const [error, setError] = useState(""); // State for error messages
  const router = useRouter();

  const handleJobFormSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(""); // Reset error message before submitting
    console.log(jobFormData);

    try {
      const data = await postData(`/job`, jobFormData);
      if (data) {
        setJobFormData(initialJobFormData);

        router.push("/job/job-post");
        setLoading(false);
      } else {
        throw new Error("Job post creation failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "An unexpected error occurred.");
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
            <CardTitle className="text-2xl text-lightBlue font-montserrat">
              Create Job Post
            </CardTitle>
            <RiCloseLine
              onClick={() => router.back("/job/job-post")}
              className="w-6 h-6 cursor-pointer font-bold"
            />
          </div>
        </CardHeader>
        <CardContent className="p-5">
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}{" "}
          {/* Display error */}
          <CommonForm
            formControlls={jobPostFormControlls}
            buttonText={loading ? "Submitting..." : "Submit"}
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
