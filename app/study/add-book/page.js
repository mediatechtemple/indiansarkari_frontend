"use client";
import React, { useState } from "react";
import CommonForm from "@/components/common-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { initialbookFormData, postData } from "@/utils";
import { RiCloseLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { bookPostFormControlls } from "@/config";

const AddBookPost = () => {
  const [bookFormData, setBookFormData] = useState(initialbookFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for error messages
  const router = useRouter();

  const handleBookFormSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(""); // Reset error message before submitting

    try {
      const data = await postData(`/fileUpload`, bookFormData);
      if (data) {
        setBookFormData(initialbookFormData);

        router.push("/study/books");
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
    return bookFormData.title;
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
              Create Book Post
            </CardTitle>
            <RiCloseLine
              onClick={() => router.back("/study/add-book")}
              className="w-6 h-6 cursor-pointer font-bold"
            />
          </div>
        </CardHeader>
        <CardContent className="p-5">
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}{" "}
          {/* Display error */}
          <CommonForm
            formControlls={bookPostFormControlls}
            buttonText={loading ? "Submitting..." : "Submit"}
            formData={bookFormData}
            setFormData={setBookFormData}
            isButtonDisabled={!checkIfFormIsValid()}
            handleSubmit={handleBookFormSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBookPost;
