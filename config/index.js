import { apiurl } from "@/utils";

export const jobPostFormControlls = [
  {
    label: "Title",
    name: "title",
    type: "text",
    componentType: "input",
  },
  {
    label: "Date",
    name: "created_at",
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
    name: "description",
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
    name: "meta_title",
    type: "text",
    componentType: "input",
  },
  {
    label: "Meta Description",
    name: "meta_description",
    type: "text",
    componentType: "input",
  },
  {
    label: "Canonical URL",
    name: "canonical_url",
    type: "text",
    componentType: "input",
  },
  {
    label: "Category",
    name: "category_id",
    componentType: "multi-select",
    apiEndpoint: `${apiurl}/category`, // Replace with your API endpoint
  },
  {
    label: "Sub Category",
    name: "subcategory_id",
    componentType: "multi-select",
    apiEndpoint: `${apiurl}/subcategory`,
  },
  {
    label: "State",
    name: "state_id",
    componentType: "multi-select",
    apiEndpoint: `${apiurl}/state`,
  },
  {
    label: "Department",
    name: "department_id",
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
  "Content",
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

export const admitCardHeaderControlls = [
  "Job ID",
  "Title",
  "Date of  JobPosting",
  "Description",
  "Date of AdmiCard",
  "Admit Card",
  "SEO",
  "Category",
  "SubCategory",
  "State",
  "Department",
  "Actions",
];

export const answerKeyHeaderControlls = [
  "Job ID",
  "Title",
  "Date of JobPosting",
  "Description",
  "Date of AnswerKey",
  "Answer Key",
  "SEO",
  "Category",
  "SubCategory",
  "State",
  "Department",
  "Actions",
];

export const resultHeaderControlls = [
  "Job ID",
  "Title",
  "Date of JobPosting",
  "Description",
  "Date of Result",
  "Result",
  "SEO",
  "Category",
  "SubCategory",
  "State",
  "Department",
  "Actions",
];
