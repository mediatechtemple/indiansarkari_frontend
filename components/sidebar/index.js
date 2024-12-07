"use client";
import React, { useState } from "react";
import {
  RiHome2Line,
  RiUserLine,
  RiTeamLine,
  RiBriefcaseLine,
  RiDraftLine,
  RiClipboardLine,
  RiGitRepositoryLine,
  RiCalendarCheckLine,
  RiEarthLine,
  RiNotificationLine,
} from "@remixicon/react";
import SideBarOptions from "./sidebar-options";
import {
  AdmissionManagementItems,
  jobManagementItems,
  studyMetarialManagementItems,
  websiteManagementsItems,
} from "@/utils";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({
    jobManagement: false,
    admissionManagement: false,
    studyMaterialManagement: false,
    websiteManagement: false,
  });
  const router = useRouter();

  const toggleSection = (section) => {
    setOpenSections((prev) => {
      const newSections = { ...prev };

      // If the clicked section is already open, close it
      if (newSections[section]) {
        newSections[section] = false;
      } else {
        // Close all sections
        Object.keys(newSections).forEach((key) => {
          newSections[key] = false;
        });

        // Open the selected section
        newSections[section] = true;
      }

      return newSections;
    });
  };

  // Function to render items dynamically
  const renderItems = (items) =>
    items.map((item) => (
      <p
        key={item.path}
        onClick={() => router.push(item.path)}
        className="bg-primary text-white shadow rounded-md p-2 hover:bg-secondary transition duration-150 cursor-pointer"
      >
        {item?.label}
      </p>
    ));

  return (
    <div className="bg-primary w-full pb-10">
      <div className="p-5">
        <SideBarOptions optionsName="Dashboard" Icon={RiHome2Line} />
        <SideBarOptions optionsName="User Management" Icon={RiUserLine} />
        <SideBarOptions optionsName="Student Management" Icon={RiTeamLine} />

        {/* Job Management */}
        <SideBarOptions
          optionsName="Job Management"
          Icon={RiBriefcaseLine}
          isOpen={openSections.jobManagement}
          onClick={() => toggleSection("jobManagement")}
          toggleArrow={() => toggleSection("jobManagement")}
        />
        {openSections.jobManagement && (
          <div className="ml-2 mt-2 space-y-2">
            {renderItems(jobManagementItems)}
          </div>
        )}

        {/* Admission Management */}
        <SideBarOptions
          optionsName="Admission Management"
          Icon={RiDraftLine}
          isOpen={openSections.admissionManagement}
          onClick={() => toggleSection("admissionManagement")}
          toggleArrow={() => toggleSection("admissionManagement")}
        />
        {openSections.admissionManagement && (
          <div className="ml-2 mt-2 space-y-2">
            {renderItems(AdmissionManagementItems)}
          </div>
        )}

        {/* Study Material Management */}
        <SideBarOptions
          optionsName="Study Material Management"
          Icon={RiGitRepositoryLine}
          isOpen={openSections.studyMaterialManagement}
          onClick={() => toggleSection("studyMaterialManagement")}
          toggleArrow={() => toggleSection("studyMaterialManagement")}
        />
        {openSections.studyMaterialManagement && (
          <div className="ml-2 mt-2 space-y-2">
            {renderItems(studyMetarialManagementItems)}
          </div>
        )}

        {/* Website Management */}
        <SideBarOptions
          optionsName="Website Management"
          Icon={RiEarthLine}
          isOpen={openSections.websiteManagement}
          onClick={() => toggleSection("websiteManagement")}
          toggleArrow={() => toggleSection("websiteManagement")}
        />
        {openSections.websiteManagement && (
          <div className="ml-2 mt-2 space-y-2">
            {renderItems(websiteManagementsItems)}
          </div>
        )}

        <SideBarOptions
          optionsName="Notification Management"
          Icon={RiNotificationLine}
        />
      </div>
    </div>
  );
};

export default Sidebar;
