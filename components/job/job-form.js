import { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import Dropdown from "./job-dropdown";
import { apiurl, initialJobFormData } from "@/utils";

// Dynamic import of JoditEditor to avoid SSR issues
const AsyncJoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const JobFormComponent = () => {
  const [formData, setFormData] = useState(initialJobFormData);
  const editor = useRef(null);

  // Handle input changes for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleJobFormSubmit = (event) => {
    event.preventDefault(); // Prevent the page reload
    console.log("Job Form Data:", formData); // Add this to see the submitted data
  };

  // Handle content field change
  const handleContentChange = (newContent) => {
    setFormData({
      ...formData,
      content: newContent,
    });
  };

  return (
    <div className="">
      <form className="space-y-6" onSubmit={handleJobFormSubmit}>
        {/* Job Title */}
        <div>
          <Label htmlFor="jobTitle" className="text-lg text-blueish">
            Job Title
          </Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="mt-2 p-2 w-full border rounded-lg border-secondary font-montserrat text-lg"
          />
        </div>

        {/* Job Date */}
        <div>
          <Label htmlFor="jobDate" className="text-lg text-blueish">
            Job Date
          </Label>
          <Input
            id="jobDate"
            name="jobDate"
            value={formData.jobDate}
            onChange={handleInputChange}
            type="date"
            className="mt-2 p-2 w-full border rounded-lg border-secondary font-montserrat text-lg"
          />
        </div>

        {/* Short Description */}
        <div>
          <Label htmlFor="shortDescription" className="text-lg text-blueish">
            Short Description
          </Label>
          <Input
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            className="mt-2 p-2 w-full border rounded-lg border-secondary font-montserrat text-lg"
          />
        </div>

        {/* Content (JoditEditor) */}
        <div>
          <Label htmlFor="content" className="text-lg text-blueish">
            Content
          </Label>
          <AsyncJoditEditor
            ref={editor}
            value={formData.content}
            onChange={handleContentChange}
            className="mt-2 p-2 w-full border rounded-lg border-secondary font-montserrat text-lg"
          />
        </div>

        {/* Slug */}
        <div>
          <Label htmlFor="slug" className="text-lg text-blueish">
            Slug
          </Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            className="mt-2 p-2 w-full border rounded-lg border-secondary font-montserrat text-lg"
          />
        </div>

        {/* Meta Tags */}
        <div>
          <Label htmlFor="metaTags" className="text-lg text-blueish">
            Meta Tags
          </Label>
          <Input
            id="metaTags"
            name="metaTags"
            value={formData.metaTags}
            onChange={handleInputChange}
            className="mt-2 p-2 w-full border rounded-lg border-secondary font-montserrat text-lg"
          />
        </div>

        {/* Meta Descriptions */}
        <div>
          <Label htmlFor="metaDescriptions" className="text-lg text-blueish">
            Meta Descriptions
          </Label>
          <Input
            id="metaDescriptions"
            name="metaDescriptions"
            value={formData.metaDescriptions}
            onChange={handleInputChange}
            className="mt-2 p-2 w-full border rounded-lg border-secondary font-montserrat text-lg"
          />
        </div>

        {/* Canonical */}
        <div>
          <Label htmlFor="canonical" className="text-lg text-blueish">
            Canonical
          </Label>
          <Input
            id="canonical"
            name="canonical"
            value={formData.canonical}
            onChange={handleInputChange}
            className="mt-2 p-2 w-full border rounded-lg border-secondary font-montserrat text-lg"
          />
        </div>
        <Dropdown
          label="State"
          endpoint={`${apiurl}/state`}
          formData={formData}
          setFormData={setFormData}
          dataKey="state_id"
        />

        <Dropdown
          label="Category"
          endpoint={`${apiurl}/category`}
          formData={formData}
          setFormData={setFormData}
          dataKey="category_id"
        />

        <Dropdown
          label="Subcategory"
          endpoint={`${apiurl}/subcategory`}
          formData={formData}
          setFormData={setFormData}
          dataKey="subcategory_id"
        />

        <Dropdown
          label="Department"
          endpoint={`${apiurl}/depertment`}
          formData={formData}
          setFormData={setFormData}
          dataKey="department_id"
        />

        {/* Submit Button */}
        <div className="mt-6">
          <Button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-lg shadow-lg hover:bg-secondary"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobFormComponent;
