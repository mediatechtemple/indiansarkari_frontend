import { apiurl } from "@/utils";

export const jobPostFormControlls = [
  {
    label: "Title",
    name: "jobTitle",
    type: "text",
    componentType: "input",
  },
  {
    label: "Date",
    name: "jobDate",
    type: "date",
    componentType: "input",
  },
  {
    name: "content",
    label: "Content",
    componentType: "jodit-editor",
  },
  {
    label: "Short Information",
    name: "shortDescription",
    type: "text",
    componentType: "input",
  },
  {
    label: "Slug",
    name: "slug",
    type: "text",
    componentType: "input",
  },
  {
    label: "Meta Tags",
    name: "metaTags",
    type: "text",
    componentType: "input",
  },
  {
    label: "Meta Description",
    name: "metaDescriptions",
    type: "text",
    componentType: "input",
  },
  {
    label: "Canonical URL",
    name: "canonical",
    type: "text",
    componentType: "input",
  },
  {
    label: "Category",
    name: "category",
    componentType: "multi-select",
    apiEndpoint: `${apiurl}/category`, // Replace with your API endpoint
  },
  {
    label: "Sub Category",
    name: "subCategory",
    componentType: "multi-select",
    apiEndpoint: `${apiurl}/subcategory`,
  },
  {
    label: "State",
    name: "state",
    componentType: "multi-select",
    apiEndpoint: `${apiurl}/state`,
  },
  {
    label: "Department",
    name: "department",
    componentType: "multi-select",
    apiEndpoint: `${apiurl}/depertment`,
  },
];

export const subCategoryFormControls = [
  {
    label: "SubCategory Name",
    name: "name",
    type: "text",
    componentType: "input",
  },
  {
    label: "Slug",
    name: "slug",
    type: "text",
    componentType: "input",
  },
];

export const categoryFormControls = [
  {
    label: "Category Name",
    name: "name",
    type: "text",
    componentType: "input",
  },
  {
    label: "Slug",
    name: "slug",
    type: "text",
    componentType: "input",
  },
];

export const departmentFormControls = [
  {
    label: "Department Name",
    name: "name",
    type: "text",
    componentType: "input",
  },
  {
    label: "Slug",
    name: "slug",
    type: "text",
    componentType: "input",
  },
];

export const stateFormControls = [
  {
    label: "State Name",
    name: "name",
    type: "text",
    componentType: "input",
  },
  {
    label: "Slug",
    name: "slug",
    type: "text",
    componentType: "input",
  },
];

export const categoryHeaderControlls = [
  "Category ID",
  "Category Name",
  "Slug",
  "Actions",
];

export const subCategoryHeaderControlls = [
  "SubCategory ID",
  "SubCategory Name",
  "Slug",
  "Actions",
];

export const departmentHeaderControlls = [
  "Category ID",
  "Category Name",
  "Slug",
  "Actions",
];
export const stateHeaderControlls = [
  "State ID",
  "State Name",
  "Slug",
  "Actions",
];

export const jobPostHeaderControlls = [
  "Job ID",
  "Title",
  "Date of  JobPosting",
  "Description",
  "Date of AdmiCard",
  "Date of AnswerKey",
  "Date of Result",
  "Admit Card",
  "Answer Key",
  "Result",
  "SEO",
  "Category",
  "SubCategory",
  "State",
  "Department",
  "Actions",
];
