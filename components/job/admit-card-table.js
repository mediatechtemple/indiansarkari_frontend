"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import { Dialog } from "../ui/dialog"; // Shadcn UI Dialog for edit
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { htmlToText } from "html-to-text";
import ModalForm from "./job-modal-form";
import SearchBar from "../search";
import Link from "next/link";
import JobFilters from "../filters/job-filter";
import AdmitCardFilters from "../filters/admit-card-filter";
const AdmitCardTable = ({ admitCardData = [], headers = [] }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [dialogContent, setDialogContent] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (admitCardData && admitCardData.length > 0) {
      setFilteredData(admitCardData);
    }
  }, [admitCardData]);
  const locations = useMemo(() => {
    return Array.from(
      new Set(admitCardData?.map((job) => job.State?.name || ""))
    );
  }, [admitCardData]);

  const categories = useMemo(() => {
    Array.from(
      new Set(admitCardData?.map((job) => job.Category?.name || "") || [])
    );
  }, [admitCardData]);
  const departments = useMemo(() => {
    Array.from(
      new Set(admitCardData?.map((job) => job.Depertment?.name || "") || [])
    );
  }, [admitCardData]);

  const contentData = useMemo(() => {
    return admitCardData?.map((contentItem) =>
      htmlToText(contentItem.content, {
        wordwrap: 130,
        selectors: [{ selector: "a", options: { ignoreHref: true } }],
      })
    );
  }, [admitCardData]);

  const handleSearch = useCallback(
    (term) => {
      const searchTerms = term.split(",").map((t) => t.trim().toLowerCase());
      const filtered = admitCardData.filter((formData) =>
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
    [admitCardData]
  );

  const openContentDialog = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
    setSearchTerm("");
  };

  const handleFilter = (filters) => {
    const filtered = admitCardData.filter((job) => {
      const locationMatch = job["State"]["name"]
        .toLowerCase()
        .includes(filters.location.toLowerCase());

      const departmentMatch = job["Depertment"]["name"]
        .toLowerCase()
        .includes(filters.department.toLowerCase());
      const categoryMatch = job["Category"]["name"]
        .toLowerCase()
        .includes(filters.category.toLowerCase());

      const jobDate = job.created_at ? new Date(job.created_at) : null;
      const dateFrom = filters.publishDate?.from
        ? new Date(filters.publishDate.from)
        : null;
      const dateTo = filters.publishDate?.to
        ? new Date(filters.publishDate.to)
        : null;

      const publishDateMatch =
        jobDate && dateFrom && dateTo
          ? jobDate >= dateFrom && jobDate <= dateTo
          : true; // No filter selected, match all

      const contentMatch = job["content"]
        .toLowerCase()
        .includes(filters.content.toLowerCase());

      const salaryMatch = job["content"].match(/salary\s*=\s*(\d+)-(\d+)/);
      const salaryInRange =
        salaryMatch &&
        filters.salary >= Number(salaryMatch[1]) &&
        filters.salary <= Number(salaryMatch[2]);

      // Age check
      const ageMatch = job["content"].match(/age\s*=\s*(\d+)-(\d+)/);
      const ageInRange =
        ageMatch &&
        filters.age >= Number(ageMatch[1]) &&
        filters.age <= Number(ageMatch[2]);

      //exprience check
      const exprienceMatch = job["content"].match(
        /exprience\s*=\s*(\d+)-(\d+)/
      );
      const exprienceInRange =
        exprienceMatch &&
        filters.exprience >= Number(exprienceMatch[1]) &&
        filters.exprience <= Number(exprienceMatch[2]);

      // If no filters for age, default to true
      const ageRangeValid = filters.age ? ageInRange : true;
      // If no filters for salary, default to true
      const salaryRangeValid = filters.salary ? salaryInRange : true;
      // If no filters for exprience, default to true
      const exprienceRangeValid = filters.exprience ? exprienceInRange : true;
      return (
        locationMatch &&
        departmentMatch &&
        categoryMatch &&
        contentMatch &&
        publishDateMatch &&
        salaryRangeValid &&
        ageRangeValid &&
        exprienceRangeValid
      );
    });

    setFilteredData(filtered);
  };

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search Across Admit Card..."
      />

      <h1 className="text-2xl font-semibold text-blueish font-montserrat">
        Filters By
      </h1>
      <AdmitCardFilters />

      <Table className="w-full table-auto border-collapse border border-white mt-3">
        <thead>
          <tr className="text-center text-white bg-primary font-montserrat">
            {headers.map((header, index) => (
              <TableCell key={index} className="border border-white px-4 py-2">
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
          {admitCardData.map((item) => (
            <TableRow
              key={item.id}
              className="hover:bg-gray-100 transition-all duration-200"
            >
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  className="border border-white px-4 py-2"
                >
                  {item[header]}
                </TableCell>
              ))}
              <TableCell className="flex justify-end gap-2 p-4">
                <Button
                  //onClick={() => edit(formData)}
                  className="bg-blue-500 text-white"
                >
                  <MdModeEditOutline />
                </Button>
                <Button
                  variant="destructive"
                  // onClick={() => deleteFormData(formData.id)}
                  className="bg-red-500 text-white"
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

export default AdmitCardTable;
