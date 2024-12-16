"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"; // Shadcn UI Dialog for edit
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { htmlToText } from "html-to-text";
import SearchBar from "../search";

import { GrView } from "react-icons/gr";

import parse from "html-react-parser";

import { deleteData, initialJobFormData, putData } from "@/utils";
import AdmitCardFilters from "../filters/admit-card-filter";
import CommonForm from "../common-form";
import { jobPostFormControlls } from "@/config";
const ResultTable = ({ resultData = [], headers = [] }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [formData, setFormData] = useState(initialJobFormData);
  const [editDailog, setEditDailog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const handleDelete = async (id) => {
    try {
      await deleteData(`/jobupdate/${id}`);
      setFilteredData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete the job:", error);
    }
  };
  const handleEdit = (item) => {
    //console.log(item);
    setEditDailog(true);
    setFormData(item);
  };
  const Remove = () => {
    setFormData(initialJobFormData);
    setEditDailog(false);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      try {
        await putData(`/jobupdate/${formData.id}`, formData);
        setEditDailog(false);
        router.refresh();
      } catch (error) {
        console.error("Failed to update the job:", error);
      }
    }
  };
  useEffect(() => {
    if (resultData && resultData.length > 0) {
      setFilteredData(resultData);
    }
  }, [resultData]);
  const locations = useMemo(() => {
    return Array.from(new Set(resultData?.map((job) => job.State?.name || "")));
  }, [resultData]);

  const categories = useMemo(() => {
    return Array.from(
      new Set(resultData?.map((job) => job.Category?.name || "") || [])
    );
  }, [resultData]);
  const departments = useMemo(() => {
    return Array.from(
      new Set(resultData?.map((job) => job.Depertment?.name || "") || [])
    );
  }, [resultData]);

  const contentData = useMemo(() => {
    return resultData?.map((contentItem) =>
      htmlToText(contentItem?.job?.content, {
        wordwrap: 130,
        selectors: [{ selector: "a", options: { ignoreHref: true } }],
      })
    );
  }, [resultData]);

  const handleSearch = useCallback(
    (term) => {
      const searchTerms = term.split(",").map((t) => t.trim().toLowerCase());
      const filtered = resultData.filter((formData) =>
        searchTerms.some((searchTerm) =>
          // Check all values in the top-level object
          Object.values(formData).some((value) => {
            if (
              typeof value === "string" &&
              value.toLowerCase().includes(searchTerm)
            ) {
              return true;
            }
            // Check nested objects (job, Category, Department, etc.)
            if (typeof value === "object" && value !== null) {
              return Object.values(value).some(
                (nestedValue) =>
                  typeof nestedValue === "string" &&
                  nestedValue.toLowerCase().includes(searchTerm)
              );
            }
            return false;
          })
        )
      );
      setFilteredData(filtered);
    },
    [resultData]
  );

  const openContentDialog = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
    setSearchTerm("");
  };

  const handleFilter = (filters) => {
    const filtered = resultData.filter((job) => {
      const locationMatch = job["State"]["name"]
        .toLowerCase()
        .includes(filters.location.toLowerCase());

      const departmentMatch = job["Depertment"]["name"]
        .toLowerCase()
        .includes(filters.department.toLowerCase());
      const categoryMatch = job["Category"]["name"]
        .toLowerCase()
        .includes(filters.category.toLowerCase());

      const jobDate = job?.created_at ? new Date(job?.created_at) : null;
      const admitCardDate = job?.job?.created_at
        ? new Date(job?.job?.created_at)
        : null;

      const dateFrom = filters.publishDate?.from
        ? new Date(filters.publishDate.from)
        : null;
      const dateTo = filters.publishDate?.to
        ? new Date(filters.publishDate.to)
        : null;
      const admitCardDateFrom = filters.admitCardDate?.from
        ? new Date(filters.admitCardDate.from)
        : null;
      const admitCardDateTo = filters.admitCardDate?.to
        ? new Date(filters.admitCardDate.to)
        : null;

      const publishDateMatch =
        jobDate && dateFrom && dateTo
          ? jobDate >= dateFrom && jobDate <= dateTo
          : true; // No filter selected, match all

      const admitCardDateMatch =
        admitCardDate && admitCardDateFrom && admitCardDateTo
          ? admitCardDate >= admitCardDateFrom &&
            admitCardDate <= admitCardDateTo
          : true;
      console.log({ publishDateMatch, admitCardDate });

      const contentMatch = job["job"]["content"]
        .toLowerCase()
        .includes(filters.content.toLowerCase());

      return (
        locationMatch &&
        departmentMatch &&
        categoryMatch &&
        contentMatch &&
        publishDateMatch &&
        admitCardDateMatch
      );
    });

    setFilteredData(filtered);
  };
  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search Across Result..."
      />

      <h1 className="text-2xl font-semibold text-blueish font-montserrat">
        Filters By
      </h1>
      <AdmitCardFilters
        onApplyFilter={handleFilter}
        locations={locations}
        categories={categories}
        departments={departments}
        contentData={contentData}
        dataPlaceholder="Result..."
        dateLabel="Publish Date of Result"
      />

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
              className="hover:bg-gray-100 transition-all duration-200 text-center truncate"
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
                  onClick={() => handleEdit(item)}
                  className="bg-blue-500 text-white hover:bg-blue-600 transition duration-150 h-8 w-8"
                >
                  <MdModeEditOutline />
                </Button>
                {/* Dialog for Form */}
                <Dialog open={editDailog} onOpenChange={Remove}>
                  <DialogContent className="max-h-[80vh] overflow-y-auto rounded-lg bg-white p-6 shadow-lg w-full max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-gray-800">
                        Update Job Post
                      </DialogTitle>
                    </DialogHeader>
                    <CommonForm
                      formControlls={jobPostFormControlls}
                      formData={formData}
                      setFormData={setFormData}
                      buttonText={"Update"}
                      handleSubmit={handleEditSubmit}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
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

export default ResultTable;
