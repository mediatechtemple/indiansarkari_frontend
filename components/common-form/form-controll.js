"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AsyncSelect from "react-select/async";

import dynamic from "next/dynamic"; // Ensure this import is present
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useRef } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const FormControll = ({ formControls = [], formData, setFormData }) => {
  // const editor = useRef(null);
  const renderComponentByType = (controlItem) => {
    const currentControlItemValue = formData[controlItem.name];

    // Fetch options from API dynamically
    const loadOptions = async (inputValue) => {
      if (!inputValue) return [];
      try {
        const response = await fetch(
          `${controlItem.apiEndpoint}?query=${encodeURIComponent(inputValue)}`
        );

        if (!response.ok) {
          console.error(
            "Error response from server:",
            response.status,
            response.statusText
          );
          return [];
        }

        const data = await response.json();

        return (
          data.rows
            ?.filter((item) =>
              item.name.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((item) => ({
              value: item.id,
              label: item.name,
            })) || []
        );
      } catch (error) {
        console.error("Error fetching options:", error);
        return [];
      }
    };

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
        return (
          <JoditEditor
            // ref={editor}
            value={formData[controlItem.name]}
            onChange={(newContent) =>
              setFormData({
                ...formData,
                [controlItem.name]: newContent,
              })
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
        return (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [controlItem.name]: value,
              })
            }
            value={currentControlItemValue}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={currentControlItemValue || controlItem.label}
              />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder || "Enter text here..."}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
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
