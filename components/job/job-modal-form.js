"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const ModalForm = ({ showModal, setShowModal, jobId }) => {
  const [formData, setFormData] = useState({
    update_type: "",
    job_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiResponse = await fetch(`${apiurl}/jobupdate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, job_id: jobId }),
      });
      if (!apiResponse.ok) throw new Error("something went wrong");
      setFormData({
        update_type: "",
        job_id: "",
      });
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
  };

  const handleBackgroundClick = () => {
    setShowModal(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleBackgroundClick}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            onClick={handleModalClick}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Modal Form
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-base font-medium">
                  Select Type <span className="text-red-500">*</span>
                </Label>
                <select
                  name="update_type"
                  value={formData.update_type}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-lg"
                >
                  <option value="" className="text-lg">
                    Select Type
                  </option>
                  <option value="admit_card" className="text-lg">
                    Admit Card
                  </option>
                  <option value="answer_key" className="text-lg">
                    Answer Key
                  </option>
                  <option value="result" className="text-lg">
                    Result
                  </option>
                  <option value="other" className="text-lg">
                    Other
                  </option>
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalForm;
