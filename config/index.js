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
    label: "Job URL",
    name: "jobUrl",
    type: "text",
    componentType: "input",
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
    label: "Admit Card Realeased",
    name: "admit_card_released",
    componentType: "select",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    label: "Answer Key Realeased",
    name: "answer_key_released",
    componentType: "select",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    label: "Result Realeased",
    name: "result_released",
    componentType: "select",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    label: "Category",
    name: "category_id",
    componentType: "select",
    apiEndpoint: `${apiurl}/category`, // Replace with your API endpoint
  },
  {
    label: "Sub Category",
    name: "subcategory_id",
    componentType: "select",
    apiEndpoint: `${apiurl}/subcategory`,
  },
  {
    label: "State",
    name: "state_id",
    componentType: "select",
    apiEndpoint: `${apiurl}/state`,
  },
  {
    label: "Department",
    name: "department_id",
    componentType: "select",
    apiEndpoint: `${apiurl}/depertment`,
  },
];

export const admissionPostFormControlls = [
  {
    label: "Title",
    name: "title",
    type: "text",
    componentType: "input",
  },
  {
    label: "Date",
    name: "date",
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
    componentType: "select",
    apiEndpoint: `${apiurl}/category`, // Replace with your API endpoint
  },
  {
    label: "Sub Category",
    name: "subcategory_id",
    componentType: "select",
    apiEndpoint: `${apiurl}/subcategory`,
  },
  {
    label: "State",
    name: "state_id",
    componentType: "select",
    apiEndpoint: `${apiurl}/state`,
  },
  {
    label: "Department",
    name: "department_id",
    componentType: "select",
    apiEndpoint: `${apiurl}/depertment`,
  },
];

export const bookPostFormControlls = [
  {
    label: "Title",
    name: "title",
    type: "text",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    componentType: "textarea",
  },
  {
    label: "Course Type",
    name: "courseType",
    componentType: "select",
    options: [
      { value: "course", label: "Course" },
      { value: "standalone", label: "Standalone" },
    ],
  },
  {
    label: "Access Type",
    name: "accessType",
    componentType: "select",
    options: [
      { value: "free", label: "Free" },
      { value: "paid", label: "Paid" },
    ],
  },
  {
    label: "File URL",
    name: "fileUrl",
    type: "text",
    componentType: "input",
  },
  {
    label: "Upload File",
    name: "file",
    type: "file",
    componentType: "file-upload",
  },
  {
    label: "Meta Tags",
    name: "metaTags",
    type: "text",
    componentType: "input",
  },
  {
    label: "Meta Description",
    name: "metaDescription",
    type: "text",
    componentType: "input",
  },
  {
    label: "Canonical URL",
    name: "canonicalUrl",
    type: "text",
    componentType: "input",
  },
];

export const genralKnowledgePostFormControlls = [
  {
    label: "Title",
    name: "title",
    type: "text",
    componentType: "input",
  },
  {
    label: "Content",
    name: "content",
    type: "text",
    componentType: "textarea",
  },
  {
    label: "Slug",
    name: "slug",
    type: "text",
    componentType: "input",
  },

  {
    label: "Meta Tags",
    name: " meta_title",
    type: "text",
    componentType: "input",
  },
  {
    label: "Meta Description",
    name: "meta_description",
    type: "text",
    componentType: "textarea",
  },
  {
    label: "Canonical URL",
    name: "canonical_url",
    type: "text",
    componentType: "input",
  },
  {
    label: "OG Image URL",
    name: "og_image",
    type: "text",
    componentType: "input",
  },
  {
    label: "Access Type",
    name: "accessType",
    componentType: "select",
    options: [
      { value: "free", label: "Free" },
      { value: "paid", label: "Paid" },
    ],
  },
];
export const videoPostFormControlls = [
  {
    label: "Title",
    name: "title",
    type: "text",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    componentType: "textarea",
  },
  {
    label: "Course Type",
    name: "courseType",
    componentType: "select",
    options: [
      { value: "course", label: "Course" },
      { value: "standalone", label: "Standalone" },
    ],
  },
  {
    label: "Access Type",
    name: "accessType",
    componentType: "select",
    options: [
      { value: "free", label: "Free" },
      { value: "paid", label: "Paid" },
    ],
  },
  {
    label: "File URL",
    name: "fileUrl",
    type: "text",
    componentType: "input",
  },
  {
    label: "Upload File",
    name: "file",
    type: "file",
    componentType: "file-upload",
  },
  {
    label: "Meta Tags",
    name: "metaTags",
    type: "text",
    componentType: "input",
  },
  {
    label: "Meta Description",
    name: "metaDescription",
    type: "text",
    componentType: "input",
  },
  {
    label: "Canonical URL",
    name: "canonicalUrl",
    type: "text",
    componentType: "input",
  },
];

export const oldPaperPostFormControlls = [
  {
    label: "Title",
    name: "title",
    type: "text",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    componentType: "textarea",
  },
  {
    label: "Course Type",
    name: "courseType",
    componentType: "select",
    options: [
      { value: "course", label: "Course" },
      { value: "standalone", label: "Standalone" },
    ],
  },
  {
    label: "Access Type",
    name: "accessType",
    componentType: "select",
    options: [
      { value: "free", label: "Free" },
      { value: "paid", label: "Paid" },
    ],
  },
  {
    label: "File URL",
    name: "fileUrl",
    type: "text",
    componentType: "input",
  },
  {
    label: "Upload File",
    name: "file",
    type: "file",
    componentType: "file-upload",
  },
  {
    label: "Meta Tags",
    name: "metaTags",
    type: "text",
    componentType: "input",
  },
  {
    label: "Meta Description",
    name: "metaDescription",
    type: "text",
    componentType: "input",
  },
  {
    label: "Canonical URL",
    name: "canonicalUrl",
    type: "text",
    componentType: "input",
  },
];

export const notesPostFormControlls = [
  {
    label: "Title",
    name: "title",
    type: "text",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    componentType: "textarea",
  },
  {
    label: "Course Type",
    name: "courseType",
    componentType: "select",
    options: [
      { value: "course", label: "Course" },
      { value: "standalone", label: "Standalone" },
    ],
  },
  {
    label: "Access Type",
    name: "accessType",
    componentType: "select",
    options: [
      { value: "free", label: "Free" },
      { value: "paid", label: "Paid" },
    ],
  },
  {
    label: "File URL",
    name: "fileUrl",
    type: "text",
    componentType: "input",
  },
  {
    label: "Upload File",
    name: "file",
    type: "file",
    componentType: "file-upload",
  },
  {
    label: "Meta Tags",
    name: "metaTags",
    type: "text",
    componentType: "input",
  },
  {
    label: "Meta Description",
    name: "metaDescription",
    type: "text",
    componentType: "input",
  },
  {
    label: "Canonical URL",
    name: "canonicalUrl",
    type: "text",
    componentType: "input",
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
    label: "Category",
    name: "category_id",
    componentType: "select",
    apiEndpoint: `${apiurl}/category`, // Replace with your API endpoint
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
    label: "Category Image",
    name: "file",
    type: "file",
    componentType: "file-upload",
    accept: "image/*",
  },
];

export const departmentFormControls = [
  {
    label: "Department Name",
    name: "name",
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
];

export const categoryHeaderControlls = [
  "Category ID",
  "Category Name",
  "Actions",
];

export const subCategoryHeaderControlls = [
  "SubCategory ID",
  "SubCategory Name",
  "Actions",
];

export const departmentHeaderControlls = [
  "Department ID",
  "Department Name",
  "Actions",
];
export const stateHeaderControlls = ["State ID", "State Name", "Actions"];

export const jobPostHeaderControlls = [
  "Job ID",
  "Title",
  "Date of  JobPosting",
  "Description",
  "Content",
  "Job URL",
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
  "Content",
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
  "Content",
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
  "Content",
  "Date of Result",
  "Result",
  "SEO",
  "Category",
  "SubCategory",
  "State",
  "Department",
  "Actions",
];

export const admissionPostHeaderControlls = [
  "Admission ID",
  "Title",
  "Date of  admissionPosting",
  "Description",
  "Content",
  "Date of school Admission",
  "Date of collage Admission",
  "University Date",

  "SEO",
  "Category",
  "SubCategory",
  "State",
  "Department",
  "Actions",
];

export const schoolAdmissionPostHeaderControlls = [
  "Admission ID",
  "Title",
  "Date of  admissionPosting",
  "Description",
  "Content",
  "Date of School Admission",

  "SEO",
  "Category",
  "SubCategory",
  "State",
  "Department",
  "Actions",
];

export const collageAdmissionPostHeaderControlls = [
  "Admission ID",
  "Title",
  "Date of  admissionPosting",
  "Description",
  "Content",
  "Date of Collage Admission",

  "SEO",
  "Category",
  "SubCategory",
  "State",
  "Department",
  "Actions",
];
export const universityAdmissionPostHeaderControlls = [
  "Admission ID",
  "Title",
  "Date of  admissionPosting",
  "Description",
  "Content",
  "University Date",
  "SEO",
  "Category",
  "SubCategory",
  "State",
  "Department",
  "Actions",
];
