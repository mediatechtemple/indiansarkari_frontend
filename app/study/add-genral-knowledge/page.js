"use client";
import React, { useState } from "react";
import CommonForm from "@/components/common-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { initialGenralKnowledgeFormData, postData } from "@/utils";
import { RiCloseLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { genralKnowledgePostFormControlls } from "@/config";

const AddGenralKnowledgePost = () => {
  const [FormData, setFormData] = useState(initialGenralKnowledgeFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for error messages
  const router = useRouter();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(""); // Reset error message before submitting

    try {
      const data = await postData(`/generalknow`, FormData);
      if (data) {
        setFormData(initialGenralKnowledgeFormData);

        //router.push("/study/books");
        setLoading(false);
      } else {
        throw new Error(
          "Genral Knowledge post creation failed. Please try again."
        );
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  const checkIfFormIsValid = () => {
    return FormData.title;
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
              Create Genral Knowledge Post
            </CardTitle>
            <RiCloseLine
              onClick={() => router.back("/study/add-genral-knowledge")}
              className="w-6 h-6 cursor-pointer font-bold"
            />
          </div>
        </CardHeader>
        <CardContent className="p-5">
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}{" "}
          {/* Display error */}
          <CommonForm
            formControlls={genralKnowledgePostFormControlls}
            buttonText={loading ? "Submitting..." : "Submit"}
            formData={FormData}
            setFormData={setFormData}
            isButtonDisabled={!checkIfFormIsValid()}
            handleSubmit={handleFormSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddGenralKnowledgePost;
