// Array of job management menu items
export const jobManagementItems = [
  { label: "Job Posting", path: "/job/job-post" },
  { label: "Get Admit Card", path: "/admit-card" },
  { label: "Get Answer Key", path: "/answer-key" },
  { label: "Get Result", path: "/result" },
  { label: "Get Syllabus", path: "/syllabus" },
  { label: "Job Input", path: "/job/job-input" },
];

export const AdmissionManagementItems = [
  { label: "Schools", path: "/school" },
  { label: "Collages", path: "/collage" },
  { label: "Unversities", path: "/university" },
];

export const studyMetarialManagementItems = [
  { label: "General Knowledge", path: "/genral-knowledge" },
  { label: "Video Class Management", path: "/video-class" },
  { label: "Books Management", path: "/books" },

  { label: "Notes Management", path: "/notes" },
  { label: "Old Papers Management", path: "/old-paper" },
];
export const websiteManagementsItems = [
  { label: "Support Management", path: "/support" },
  { label: "Social Media Management", path: "/social-media" },
];

export const initialJobFormData = {
  jobTitle: "",
  jobDate: "",
  shortDescription: "",
  content: "",
  slug: "",
  metaTags: "",
  metaDescriptions: "",
  canonical: "",
  state: [],
  category: [],
  subCategory: [],
  department: [],
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
      throw new Error(`Failed to submit: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Example API functions
export const fetchCategories = (searchTerm = "") => {
  return fetch(`${apiurl}/category?search=${searchTerm}`).then((res) =>
    res.json()
  );
};

export const fetchSubCategories = (searchTerm = "") => {
  return fetch(`${apiurl}/subcategory?search=${searchTerm}`).then((res) =>
    res.json()
  );
};

export const fetchStates = (searchTerm = "") => {
  return fetch(`${apiurl}/state?search=${searchTerm}`).then((res) =>
    res.json()
  );
};

export const fetchDepartments = (searchTerm = "") => {
  return fetch(`${apiurl}/departments?search=${searchTerm}`).then((res) =>
    res.json()
  );
};
