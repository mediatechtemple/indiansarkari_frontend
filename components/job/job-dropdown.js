"use client";
import { useState, useEffect } from "react";

const Dropdown = ({ label, endpoint, formData, setFormData, dataKey }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();

        // Ensure data.rows exists before setting items
        setItems(data.rows || []);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [endpoint]);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [dataKey]: selectedId,
    }));
    // onChange(selectedId);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2"
        value={formData[dataKey] || ""}
        onChange={handleChange}
        multiple
        name={dataKey}
      >
        <option value="">Select {label}</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
