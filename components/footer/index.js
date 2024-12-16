import { RiCopyrightLine } from "@remixicon/react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full text-center bg-[#409CBC] py-4  bottom-0 z-50">
      <h5 className="text-white text-[16px] font-normal">
        <RiCopyrightLine className="inline-block mr-1" size={17} />
        All Rights Reserved to{" "}
        <a
          href="https://www.mediatechtemple.com/web-design-and-development-services/"
          target="_blank"
          title="Media Tech Temple"
        >
          Website Developed By
        </a>
        <a
          href="https://mediatechtemple.com/"
          target="_blank"
          title="Media Tech Temple"
        >
          &nbsp;Media Tech Temple
        </a>
      </h5>
    </div>
  );
};

export default Footer;
