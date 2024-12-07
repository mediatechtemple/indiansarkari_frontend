"use client";
import Image from "next/image";
import React from "react";
import { RiNotification2Line, RiSearchLine } from "@remixicon/react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-primary shadow-md z-50">
      <div className="flex w-full items-center ">
        {/* Logo Section */}
        <div className="w-[18%] flex justify-center items-center bg-white p-2">
          <Link href="/">
            <Image
              src="/images/website_logo.png"
              alt="Logo"
              width={80}
              height={80}
            />
          </Link>
        </div>

        {/* Right Side Header */}
        <div className="flex w-4/5 justify-between items-center px-5">
          <h3 className="text-2xl font-semibold text-white font-poppins">
            INDIA SARAKRI NAUKRI
          </h3>

          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search across menu..."
              className="w-72 rounded-full bg-transparent border border-white px-4 py-2 text-white placeholder-white text-sm focus:outline-none"
            />
            <RiSearchLine className="absolute right-4 text-white text-base" />
          </div>

          <div className="flex items-center justify-center w-11 h-11 bg-white rounded-full ml-5 cursor-pointer">
            <RiNotification2Line className="text-primary text-base" />
          </div>

          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/images/Profile.png"
              alt="User"
              width={45}
              height={45}
              className="rounded-full"
            />
            <select className="bg-transparent outline-none text-white font-poppins cursor-pointer ">
              <option className=" bg-primary">John Semi</option>
              <option className=" bg-primary">John Semi Semi</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
