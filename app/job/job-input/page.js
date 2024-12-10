"use client";

import React, { useEffect, useState } from "react";
import CommonForm from "@/components/common-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  subCategoryFormControls,
  categoryFormControls,
  departmentFormControls,
  stateFormControls,
  categoryHeaderControlls,
  subCategoryHeaderControlls,
  departmentHeaderControlls,
  stateHeaderControlls,
} from "@/config";
import SearchBar from "@/components/search";
import JobinputCommonTable from "@/components/job/jobInputTable";
import { deleteData, getData, postData, putData } from "@/utils";

const formConfigs = {
  category: { controls: categoryFormControls, endpoint: "/category" },
  subcategory: { controls: subCategoryFormControls, endpoint: "/subcategory" },
  department: { controls: departmentFormControls, endpoint: "/depertment" },
  state: { controls: stateFormControls, endpoint: "/state" },
};

const JobInput = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formType, setFormType] = useState(""); // Determines the form type
  const [formData, setFormData] = useState({}); // Stores form data
  const [loading, setLoading] = useState(false); // Loading state
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [stateData, setStateData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const [categories, subCategories, departments, states] =
        await Promise.all([
          getData("/category"),
          getData("/subcategory"),
          getData("/depertment"),
          getData("/state"),
        ]);
      setCategoryData(categories.rows || []);
      setSubCategoryData(subCategories.rows || []);
      setDepartmentData(departments.rows || []);
      setStateData(states.rows || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const onEdit = (item) => {
    setFormData(item);
    setDialogOpen(true);
  };
  const Remove = () => {
    setFormData({});
    setDialogOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formType || !formConfigs[formType]) {
      console.error("Invalid form type");
      return;
    }

    const { endpoint } = formConfigs[formType];

    setLoading(true); // Start loading
    try {
      if (formData.id) {
        const result = await putData(`${endpoint}/${formData.id}`, formData);
        const updatedItem = result;
        switch (formType) {
          case "category":
            setCategoryData((prev) =>
              prev.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
              )
            );
            break;
          case "subcategory":
            setSubCategoryData((prev) =>
              prev.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
              )
            );
            break;
          case "department":
            setDepartmentData((prev) =>
              prev.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
              )
            );
            break;
          case "state":
            setStateData((prev) =>
              prev.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
              )
            );
            break;
          default:
            break;
        }
      } else {
        const result = await postData(endpoint, formData);
        const newItem = result;
        switch (formType) {
          case "category":
            setCategoryData((prev) => [...prev, newItem]);
            break;
          case "subcategory":
            setSubCategoryData((prev) => [...prev, newItem]);
            break;
          case "department":
            setDepartmentData((prev) => [...prev, newItem]);
            break;
          case "state":
            setStateData((prev) => [...prev, newItem]);
            break;
          default:
            break;
        }
      }
      setDialogOpen(false); // Close dialog
      setFormData({}); // Reset form data
    } catch (error) {
      console.log(`Failed to create ${formType}: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleDelete = async (id, type) => {
    try {
      const { endpoint } = formConfigs[type];

      await deleteData(`${endpoint}/${id}`);

      switch (type) {
        case "category":
          setCategoryData((prev) => prev.filter((item) => item.id !== id));
          break;
        case "subcategory":
          setSubCategoryData((prev) => prev.filter((item) => item.id !== id));
          break;
        case "department":
          setDepartmentData((prev) => prev.filter((item) => item.id !== id));
          break;
        case "state":
          setStateData((prev) => prev.filter((item) => item.id !== id));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Failed to delete ${type} with ID ${id}:`, error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl text-blueish font-semibold">
        Job Input
      </h1>
      <SearchBar placeholder="Search Across Job Input......." />
      <div className="grid grid-cols-2 gap-4 mt-2">
        {Object.keys(formConfigs).map((type) => (
          <button
            key={type}
            className="bg-primary hover:bg-secondary transition duration-200 text-white py-2 px-4 rounded-lg"
            onClick={() => {
              setFormType(type);
              setDialogOpen(true);
            }}
          >
            Create {type.charAt(0).toUpperCase() + type.slice(1)} Form
          </button>
        ))}
      </div>

      <div className="space-y-8 mt-4">
        <section>
          <h2 className="text-xl text-blue-600 font-semibold mb-2">
            Category List
          </h2>
          <JobinputCommonTable
            data={categoryData}
            headers={categoryHeaderControlls}
            onEdit={onEdit}
            onDelete={(id) => handleDelete(id, "category")}
          />
        </section>
        <section>
          <h2 className="text-xl text-blue-600 font-semibold mb-2">
            SubCategory List
          </h2>
          <JobinputCommonTable
            data={subCategoryData}
            headers={subCategoryHeaderControlls}
            onEdit={onEdit}
            onDelete={(id) => handleDelete(id, "subcategory")}
          />
        </section>
        <section>
          <h2 className="text-xl text-blue-600 font-semibold mb-2">
            Department List
          </h2>
          <JobinputCommonTable
            data={departmentData}
            headers={departmentHeaderControlls}
            onEdit={onEdit}
            onDelete={(id) => handleDelete(id, "department")}
          />
        </section>
        <section>
          <h2 className="text-xl text-blue-600 font-semibold mb-2">
            State List
          </h2>
          <JobinputCommonTable
            data={stateData}
            headers={stateHeaderControlls}
            onEdit={onEdit}
            onDelete={(id) => handleDelete(id, "state")}
          />
        </section>
      </div>

      {/* Dialog for Form */}
      <Dialog open={dialogOpen} onOpenChange={Remove}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create {formType}</DialogTitle>
          </DialogHeader>
          <CommonForm
            formControlls={formConfigs[formType]?.controls}
            formData={formData}
            setFormData={setFormData}
            buttonText={loading ? "Submitting..." : "Submit"}
            handleSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobInput;
