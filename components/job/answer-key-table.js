"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"; // Shadcn UI Dialog for edit
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { htmlToText } from "html-to-text";
import ModalForm from "./job-modal-form";
import SearchBar from "../search";
import Link from "next/link";
import { FiUploadCloud } from "react-icons/fi";

import { GrView } from "react-icons/gr";

import JobFilters from "../filters/job-filter";
import parse from "html-react-parser";

import { deleteData } from "@/utils";
import AdmitCardFilters from "../filters/admit-card-filter";
const AnswerKeyTable = ({ answerKeyData = [], headers = [] }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [dialogContent, setDialogContent] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const handleDelete = async (id) => {
    try {
      await deleteData(`/job/${id}`);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete the job:", error);
    }
  };

  useEffect(() => {
    if (answerKeyData && answerKeyData.length > 0) {
      setFilteredData(answerKeyData);
    }
  }, [answerKeyData]);
  // const locations = useMemo(() => {
  //   return Array.from(
  //     new Set(answerKeyData?.map((job) => job.State?.name || ""))
  //   );
  // }, [answerKeyData]);

  // const categories = useMemo(() => {
  //   Array.from(
  //     new Set(answerKeyData?.map((job) => job.Category?.name || "") || [])
  //   );
  // }, [answerKeyData]);
  // const departments = useMemo(() => {
  //   Array.from(
  //     new Set(answerKeyData?.map((job) => job.Depertment?.name || "") || [])
  //   );
  // }, [answerKeyData]);

  // const contentData = useMemo(() => {
  //   return answerKeyData?.map((contentItem) =>
  //     htmlToText(contentItem.content, {
  //       wordwrap: 130,
  //       selectors: [{ selector: "a", options: { ignoreHref: true } }],
  //     })
  //   );
  // }, [answerKeyData]);

  const handleSearch = useCallback(
    (term) => {
      const searchTerms = term.split(",").map((t) => t.trim().toLowerCase());
      const filtered = answerKeyData.filter((formData) =>
        searchTerms.some((searchTerm) =>
          Object.values(formData).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(searchTerm)
          )
        )
      );
      setFilteredData(filtered);
    },
    [answerKeyData]
  );

  const openContentDialog = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
    setSearchTerm("");
  };

  // const handleFilter = (filters) => {
  //   const filtered = answerKeyData.filter((job) => {
  //     const locationMatch = job["State"]["name"]
  //       .toLowerCase()
  //       .includes(filters.location.toLowerCase());

  //     const departmentMatch = job["Depertment"]["name"]
  //       .toLowerCase()
  //       .includes(filters.department.toLowerCase());
  //     const categoryMatch = job["Category"]["name"]
  //       .toLowerCase()
  //       .includes(filters.category.toLowerCase());

  //     const jobDate = job.created_at ? new Date(job.created_at) : null;
  //     const dateFrom = filters.publishDate?.from
  //       ? new Date(filters.publishDate.from)
  //       : null;
  //     const dateTo = filters.publishDate?.to
  //       ? new Date(filters.publishDate.to)
  //       : null;

  //     const publishDateMatch =
  //       jobDate && dateFrom && dateTo
  //         ? jobDate >= dateFrom && jobDate <= dateTo
  //         : true; // No filter selected, match all

  //     const contentMatch = job["content"]
  //       .toLowerCase()
  //       .includes(filters.content.toLowerCase());

  //     const salaryMatch = job["content"].match(/salary\s*=\s*(\d+)-(\d+)/);
  //     const salaryInRange =
  //       salaryMatch &&
  //       filters.salary >= Number(salaryMatch[1]) &&
  //       filters.salary <= Number(salaryMatch[2]);

  //     // Age check
  //     const ageMatch = job["content"].match(/age\s*=\s*(\d+)-(\d+)/);
  //     const ageInRange =
  //       ageMatch &&
  //       filters.age >= Number(ageMatch[1]) &&
  //       filters.age <= Number(ageMatch[2]);

  //     //exprience check
  //     const exprienceMatch = job["content"].match(
  //       /exprience\s*=\s*(\d+)-(\d+)/
  //     );
  //     const exprienceInRange =
  //       exprienceMatch &&
  //       filters.exprience >= Number(exprienceMatch[1]) &&
  //       filters.exprience <= Number(exprienceMatch[2]);

  //     // If no filters for age, default to true
  //     const ageRangeValid = filters.age ? ageInRange : true;
  //     // If no filters for salary, default to true
  //     const salaryRangeValid = filters.salary ? salaryInRange : true;
  //     // If no filters for exprience, default to true
  //     const exprienceRangeValid = filters.exprience ? exprienceInRange : true;
  //     return (
  //       locationMatch &&
  //       departmentMatch &&
  //       categoryMatch &&
  //       contentMatch &&
  //       publishDateMatch &&
  //       salaryRangeValid &&
  //       ageRangeValid &&
  //       exprienceRangeValid
  //     );
  //   });

  //   setFilteredData(filtered);
  // };

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search Across Answer Key..."
      />

      <h1 className="text-2xl font-semibold text-blueish font-montserrat">
        Filters By
      </h1>
      <AdmitCardFilters />

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-[90%] max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex justify-between">
            <DialogTitle>Content Preview</DialogTitle>
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2 p-2 border-none outline-none rounded "
            />
          </DialogHeader>
          <div className="p-4 text-gray-700">
            {parse(
              dialogContent
                .split("\n")
                .filter((line) =>
                  line.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .join("\n")
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Table className="w-full table-auto border-collapse border border-white mt-3">
        <thead>
          <tr className="text-center text-white bg-primary font-montserrat">
            {headers.map((header, index) => (
              <TableCell key={index} className="border border-white px-4 py-1">
                {header}
                <span className="inline text-white" style={{ fontSize: 17 }}>
                  ↑
                </span>
                <span className="inline text-white" style={{ fontSize: 17 }}>
                  ↓
                </span>
              </TableCell>
            ))}
          </tr>
        </thead>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow
              key={item.id}
              className="hover:bg-gray-100 transition-all duration-200 text-center"
            >
              <TableCell className="border border-white px-4 py-1">
                {item?.id}
              </TableCell>
              <TableCell className="border border-white px-4 py-1">
                {item?.job?.title}
              </TableCell>
              <TableCell className="border border-white px-4 py-1">
                {new Date(item?.created_at).toLocaleDateString("en-GB")}
              </TableCell>
              <TableCell className="border border-white px-4 py-1">
                {item?.job?.description}
              </TableCell>
              <TableCell className="border border-white px-4 py-1">
                {" "}
                <a
                  href="#"
                  onClick={() => openContentDialog(item?.job?.content)}
                  className="text-blue-500 hover:underline"
                >
                  <GrView size={30} className="text-center text-gray-400" />
                </a>
              </TableCell>
              <TableCell className="border border-white px-4 py-1">
                {new Date(item?.job?.created_at).toLocaleDateString("en-GB")}
              </TableCell>
              <TableCell className="border border-white px-4 py-1">
                {item?.job?.admitcard}
              </TableCell>
              <TableCell className="border border-white px-4 py-1">
                {item?.job?.meta_title}
              </TableCell>

              <TableCell className="border border-white px-4 py-1">
                {item?.Category?.name}
              </TableCell>
              <TableCell className="border border-white px-4 py-1">
                {item?.Subcategory?.name}
              </TableCell>
              <TableCell className="border border-white px-4 py-1">
                {item?.State?.name}
              </TableCell>
              <TableCell className="border border-white px-4 py-1">
                {" "}
                {item?.Depertment?.name}
              </TableCell>
              <TableCell className="flex justify-end gap-2 border border-white px-4 py-1">
                <Button
                  //onClick={() => edit(formData)}
                  className="bg-blue-500 text-white hover:bg-blue-600 transition duration-150 h-8 w-8"
                >
                  <MdModeEditOutline />
                </Button>
                <Button
                  variant="destructive"
                  // onClick={() => deleteFormData(formData.id)}
                  className="bg-red-500 text-white hover:bg-red-600 transition duration-150 h-8 w-8"
                >
                  <RiDeleteBin6Line />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnswerKeyTable;
