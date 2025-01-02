"use client";
import { Label } from "../ui/label";
import AsyncSelect from "react-select/async";

import dynamic from "next/dynamic"; // Ensure this import is present

import { useEffect, useRef, useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const FormControll = ({ formControls = [], formData, setFormData }) => {
  const editor = useRef(null);
  const [optionsData, setOptionsData] = useState({}); // State to store fetched options for all fields
  useEffect(() => {
    const fetchAllOptions = async () => {
      const fetchPromises = formControls
        .filter((controlItem) => controlItem.apiEndpoint) // Only fields with API endpoints
        .map(async (controlItem) => {
          try {
            const response = await fetch(controlItem.apiEndpoint);
            if (!response.ok) {
              console.error(
                `Failed to fetch options for ${controlItem.name}:`,
                response.statusText
              );
              return { [controlItem.name]: [] }; // Return empty options on error
            }

            const data = await response.json();
            return {
              [controlItem.name]:
                data.rows?.map((item) => ({
                  id: item.id,
                  label: item.name,
                })) || [],
            };
          } catch (error) {
            console.error(
              `Error fetching options for ${controlItem.name}:`,
              error
            );
            return { [controlItem.name]: [] }; // Return empty options on error
          }
        });

      const results = await Promise.all(fetchPromises);

      // Merge all fetched options into a single state object
      const mergedOptions = results.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      );
      setOptionsData(mergedOptions);
    };

    fetchAllOptions();
  }, []);
  const renderComponentByType = (controlItem) => {
    const currentControlItemValue = formData[controlItem.name];

    // Fetch options from API dynamically
    // const loadOptions = async (inputValue) => {
    //   if (!inputValue) return [];
    //   try {
    //     const response = await fetch(
    //       `${controlItem.apiEndpoint}?query=${encodeURIComponent(inputValue)}`
    //     );

    //     if (!response.ok) {
    //       console.error(
    //         "Error response from server:",
    //         response.status,
    //         response.statusText
    //       );
    //       return [];
    //     }

    //     const data = await response.json();

    //     return (
    //       data.rows
    //         ?.filter((item) =>
    //           item.name.toLowerCase().includes(inputValue.toLowerCase())
    //         )
    //         .map((item) => ({
    //           value: item.id,
    //           label: item.name,
    //         })) || []
    //     );
    //   } catch (error) {
    //     console.error("Error fetching options:", error);
    //     return [];
    //   }
    // };

    switch (controlItem.componentType) {
      case "multi-select":
        return (
          <AsyncSelect
            id={`${controlItem.name}-multi-select`} // Unique ID
            instanceId={`${controlItem.name}-multi-select-instance`} // Unique instance
            isMulti
            cacheOptions
            defaultOptions={false}
            loadOptions={loadOptions}
            onChange={(selectedOptions) =>
              setFormData({
                ...formData,
                [controlItem.name]: selectedOptions.map((opt) => opt.value),
              })
            }
          />
        );

      case "jodit-editor":
        const config = {
          readonly: false, // Enable editing
          height: 400,
          width: "100%",
          toolbar: true,
          toolbarSticky: true,
          buttons: [
            "source",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "eraser",
            "superscript",
            "subscript",
            "|",
            "ul",
            "ol",
            "indent",
            "outdent",
            "|",
            "font",
            "fontsize",
            "brush",
            "paragraph",
            "|",
            "image",
            "video",
            "file",
            "table",
            "link",
            "|",
            "align",
            "undo",
            "redo",
            "|",
            "hr",
            "copyformat",
            "fullsize",
            "preview",
            "print",
            "|",
            "selectall",
            "cut",
            "copy",
            "paste", // Explicit paste button
            "|",
            "symbol",
            "embed",
            "dots",
          ],
          uploader: {
            insertImageAsBase64URI: true, // Allows image upload as Base64
          },
          placeholder: "Start typing or paste content here...",
          events: {
            paste: (e) => {
              const clipboardData = e.clipboardData || window.clipboardData;

              // Get the HTML content from clipboard if available
              const pastedHtml = clipboardData.getData("text/html");
              const pastedText = clipboardData.getData("text/plain");

              if (pastedHtml) {
                // If HTML is available, insert the HTML content into the editor
                editor.current.selection.insertHTML(pastedHtml);
              } else if (pastedText) {
                // If only plain text is available, insert the plain text
                editor.current.selection.insertText(pastedText);
              }

              // Prevent the default paste action so we can manage it ourselves
              e.preventDefault();
            },
          },
        };

        return (
          <JoditEditor
            ref={editor}
            value={formData[controlItem.name] || ""}
            config={config}
            onChange={(newContent) => {}}
            onBlur={(newContent) =>
              setFormData((prevData) => ({
                ...prevData,
                [controlItem.name]: newContent,
              }))
            }
          />
        );
      case "input":
        return (
          <input
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            className="mt-1 block outline-none w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            type={controlItem.type}
            value={currentControlItemValue || ""}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
      case "select":
        const options =
          controlItem.options || // Use static options if available
          optionsData[controlItem.name] || // Fallback to fetched options
          [];

        return (
          <div className="w-full">
            <select
              id={controlItem.name}
              name={controlItem.name}
              value={currentControlItemValue || ""}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [controlItem.name]: event.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-gray-700 bg-white transition duration-200 ease-in-out hover:border-blue-400"
            >
              <option value="" disabled className="text-gray-400">
                Select {controlItem.label}
              </option>
              {options.map((optionItem) => (
                <option
                  key={optionItem.value || optionItem.id}
                  value={optionItem.value || optionItem.id}
                  className="text-gray-700"
                >
                  {optionItem.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "textarea":
        return (
          <textarea
            id={controlItem.name}
            name={controlItem.name}
            className="mt-1 block outline-none w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder={controlItem.placeholder}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );

      case "file-upload":
        return (
          <input
            type="file"
            id={controlItem.name}
            name={controlItem.name}
            accept={controlItem.accept || "*"}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.files[0], // Store the uploaded file in formData
              })
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controlItem) => (
        <div key={controlItem.name}>
          <Label
            htmlFor={controlItem.name}
            className="text-lightBlue text-lg font-montserrat"
          >
            {controlItem.label}
          </Label>
          {renderComponentByType(controlItem)}
        </div>
      ))}
    </div>
  );
};

export default FormControll;
