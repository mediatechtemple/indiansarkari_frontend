import React from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";

const SideBarOptions = ({
  optionsName,
  Icon,
  onClick,
  isOpen,
  toggleArrow,
}) => {
  return (
    <div
      className={`flex items-center py-2 justify-between cursor-pointer transition duration-200 ${
        isOpen ? "bg-secondary" : "bg-primary"
      }`}
    >
      <div onClick={onClick} className="flex items-center p-2 space-x-2">
        <Icon size={17} className="text-white" />
        <span className="text-white font-semibold">{optionsName}</span>
      </div>
      {/* Toggling arrow based on isOpen */}
      <div
        onClick={() => toggleArrow()}
        className="flex items-center justify-start mr-3 cursor-pointer"
      >
        {isOpen ? (
          <RiArrowUpSLine size={20} className="text-white" />
        ) : (
          <RiArrowDownSLine size={20} className="text-white" />
        )}
      </div>
    </div>
  );
};

export default SideBarOptions;
