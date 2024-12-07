import { RiCopyrightLine } from "@remixicon/react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full text-center bg-[#409CBC] py-4  bottom-0 z-50">
      <h5 className="text-white text-[16px] font-normal">
        <RiCopyrightLine className="inline-block mr-1" size={17} />
        All Rights Reserved to{" "}
        <span>
          <a href="#" className="text-[#172F5F]">
            MediaTechTemple
          </a>
        </span>
        . Design & Developed by{" "}
        <span>
          <a href="#" className="text-[#172F5F]">
            MediaTechTemple
          </a>
        </span>
      </h5>
    </div>
  );
};

export default Footer;
