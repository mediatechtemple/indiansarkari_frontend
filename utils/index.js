// Array of job management menu items
export const jobManagementItems = [
  { label: "Job Posting", path: "/job/job-post" },
  { label: "Get Admit Card", path: "/job/admit-card" },
  { label: "Get Answer Key", path: "/job/answer-key" },
  { label: "Get Result", path: "/job/result" },

  { label: "Job Input", path: "/job/job-input" },
];

export const AdmissionManagementItems = [
  { label: "Admission", path: "/admission/admission-post" },
  { label: "Schools", path: "/admission/school" },
  { label: "Collages", path: "/admission/collage" },
  { label: "Unversities", path: "/admission/university" },
];

export const studyMetarialManagementItems = [
  { label: "General Knowledge", path: "/study/genral-knowledge" },
  { label: "Video Class Management", path: "/study/video-class" },
  { label: "Books Management", path: "/study/books" },
  { label: "Notes Management", path: "/study/notes" },
  { label: "Old Papers Management", path: "/study/old-paper" },
];
export const websiteManagementsItems = [
  { label: "Support Management", path: "/support" },
  { label: "Social Media Management", path: "/social-media" },
];

export const initialJobFormData = {
  title: "",
  created_at: "",
  description: "",
  content: "",
  jobUrl: "",
  slug: "",
  meta_title: "",
  meta_description: "",
  canonical_url: "",
  state_id: "",
  category_id: "",
  subcategory_id: "",
  department_id: "",
  admit_card_released: "no",
  answer_key_released: "no",
  result_released: "no",
};
export const initialbookFormData = {
  title: "",
  description: "",
  uploadType: "BooksManagement",
  courseType: "",
  accessType: "",
  metaTags: "",
  metaDescription: "",
  canonicalUrl: "",
  fileUrl: "",
  file: null,
};
export const initialGenralKnowledgeFormData = {
  title: "",
  content: "",
  slug: "",
  meta_title: "",
  meta_description: "",
  canonical_url: "",
  og_image: "",
  is_paid: "free",
};
export const initialNotesFormData = {
  title: "",
  description: "",
  uploadType: "NotesManagement",
  courseType: "",
  accessType: "",
  metaTags: "",
  metaDescription: "",
  canonicalUrl: "",
  fileUrl: "",
  file: null,
};
export const initialOldPaperFormData = {
  title: "",
  description: "",
  uploadType: "OldPapersManagement",
  courseType: "",
  accessType: "",
  metaTags: "",
  metaDescription: "",
  canonicalUrl: "",
  fileUrl: "",
  file: null,
};
export const initialViodeFormData = {
  title: "",
  description: "",
  uploadType: "VideoClasses",
  courseType: "",
  accessType: "",
  metaTags: "",
  metaDescription: "",
  canonicalUrl: "",
  fileUrl: "",
  file: null,
};

// utils/index.js
export const apiurl = "https://newindiansarkari-production.up.railway.app";

export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${apiurl}${endpoint}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.statusText}`);
    }

    // Check if response has content
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return null; // Return null if no JSON content
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const putData = async (endpoint, data) => {
  try {
    const response = await fetch(`${apiurl}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getData = async (endpoint) => {
  try {
    const response = await fetch(`${apiurl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const formPostData = async (endpoint, data) => {
  try {
    const response = await fetch(`${apiurl}${endpoint}`, {
      method: "POST",
      headers:
        endpoint === "/category"
          ? undefined
          : { "Content-Type": "application/json" },
      body:
        endpoint === "/category"
          ? data
          : JSON.stringify(Object.fromEntries(data.entries())),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to submit: ${response.status} ${response.statusText}, Details: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
export const formPutData = async (endpoint, data) => {
  try {
    const response = await fetch(`${apiurl}${endpoint}`, {
      method: "PUT",
      headers:
        endpoint === "/category"
          ? undefined
          : { "Content-Type": "application/json" },
      body:
        endpoint === "/category"
          ? data
          : JSON.stringify(Object.fromEntries(data.entries())),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to submit: ${response.status} ${response.statusText}, Details: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${apiurl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to submit: ${response.status} ${response.statusText}, Details: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
