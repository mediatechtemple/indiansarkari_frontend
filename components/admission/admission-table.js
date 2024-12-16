"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"; // Shadcn UI Dialog for edit
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { htmlToText } from "html-to-text";
import SearchBar from "../search";
import Link from "next/link";
import { FiUploadCloud } from "react-icons/fi";

import { GrView } from "react-icons/gr";

import parse from "html-react-parser";

import { deleteData, initialJobFormData, putData } from "@/utils";
import { jobPostFormControlls } from "@/config";
import CommonForm from "../common-form";
import ModalForm from "./admission-modal-form";
import AdmissionFilters from "../filters/admission-filter/index.";
const AdmissionTable = ({ admissionFormData = [], headers = [] }) => {
  const [showModel, setShowModel] = useState(false);
  const [editDailog, setEditDailog] = useState(false);
  const [formData, setFormData] = useState(initialJobFormData);
  const [admissionID, setAdmissionID] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [dialogContent, setDialogContent] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const handleDelete = async (id) => {
    try {
      await deleteData(`/admission/${id}`);
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
        const updatedData = {
          ...formData,
          content: encodeURIComponent(formData.content || ""),
        };
        await putData(`/admission/${formData.id}`, updatedData);
        setEditDailog(false);
        router.refresh();
      } catch (error) {
        console.error("Failed to update the admission:", error);
      }
    }
  };

  useEffect(() => {
    if (admissionFormData && admissionFormData.length > 0) {
      setFilteredData(admissionFormData);
    }
  }, [admissionFormData]);
  const locations = useMemo(() => {
    return Array.from(
      new Set(admissionFormData?.map((job) => job.State?.name || ""))
    );
  }, [admissionFormData]);

  const categories = useMemo(() => {
    return Array.from(
      new Set(admissionFormData?.map((job) => job.Category?.name || ""))
    );
  }, [admissionFormData]);
  const departments = useMemo(() => {
    return Array.from(
      new Set(admissionFormData?.map((job) => job.Depertment?.name || ""))
    );
  }, [admissionFormData]);

  const contentData = useMemo(() => {
    return admissionFormData?.map((contentItem) =>
      htmlToText(contentItem.content, {
        wordwrap: 130,
        selectors: [{ selector: "a", options: { ignoreHref: true } }],
      })
    );
  }, [admissionFormData]);

  const handleSearch = useCallback(
    (term) => {
      const searchTerms = term.split(",").map((t) => t.trim().toLowerCase());

      const filtered = admissionFormData.filter((formData) =>
        searchTerms.some((searchTerm) => {
          // Format the created_at date as per the desired format
          const formattedDate = new Date(
            formData?.created_at
          ).toLocaleDateString("en-GB");

          // Convert object values and nested fields to strings for search
          return (
            // Check direct fields (id, title, description, etc.)
            Object.values(formData).some(
              (value) =>
                (typeof value === "string" &&
                  value.toLowerCase().includes(searchTerm)) ||
                (typeof value === "number" &&
                  value.toString().toLowerCase().includes(searchTerm))
            ) ||
            // Check nested fields (e.g., Category.name, State.name, etc.)
            formData.Category?.name?.toLowerCase().includes(searchTerm) ||
            formData.Subcategory?.name?.toLowerCase().includes(searchTerm) ||
            formData.State?.name?.toLowerCase().includes(searchTerm) ||
            formData.Depertment?.name?.toLowerCase().includes(searchTerm) ||
            // Check formatted created_at date
            formattedDate.includes(searchTerm)
          );
        })
      );

      setFilteredData(filtered);
    },
    [admissionFormData]
  );

  function OpenHandler(id) {
    setAdmissionID(id);
    setShowModel(true);
  }

  const openContentDialog = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
    setSearchTerm("");
  };

  const handleFilter = (filters) => {
    const filtered = admissionFormData.filter((job) => {
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
      console.log(publishDateMatch);

      const contentMatch = job["content"]
        .toLowerCase()
        .includes(filters.content.toLowerCase());

      return (
        locationMatch &&
        departmentMatch &&
        categoryMatch &&
        contentMatch &&
        publishDateMatch
      );
    });

    setFilteredData(filtered);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search Across Admission Post..."
        />

        <Button className="bg-primary text-white font-montserrat rounded-xl">
          <Link href="/admission/add-admission-post">Add New Admission +</Link>
        </Button>
      </div>
      <h1 className="text-2xl font-semibold text-blueish font-montserrat">
        Filters By
      </h1>
      <AdmissionFilters
        onApplyFilter={handleFilter}
        locations={locations}
        categories={categories}
        departments={departments}
        contentData={contentData}
      />

      <ModalForm
        showModal={showModel}
        setShowModal={setShowModel}
        admissionId={admissionID}
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
      <Table className="w-full max-w-6xl table-auto border-collapse border border-white mt-3">
        <thead>
          <tr className="text-center text-white bg-primary font-montserrat">
            {headers.map((header, index) => (
              <TableCell
                key={index}
                className="border border-white px-4 py-1  min-w-[150px]"
              >
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
          {filteredData &&
            filteredData.length > 0 &&
            filteredData.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-gray-100 transition-all duration-200 text-center truncate"
              >
                <TableCell className="border border-white px-4 py-1">
                  {item?.id}
                </TableCell>
                <TableCell className="border border-white px-4 py-1">
                  {item?.title}
                </TableCell>
                <TableCell className="border border-white px-4 py-1">
                  {new Date(item?.created_at).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell className="border border-white px-4 py-1">
                  {item?.description}
                </TableCell>
                <TableCell className="border border-white px-4 py-1">
                  {" "}
                  <a
                    href="#"
                    onClick={() => openContentDialog(item?.content)}
                    className="text-blue-500 hover:underline"
                  >
                    <GrView size={30} className="text-center text-gray-400" />
                  </a>
                </TableCell>
                <TableCell className="border border-white px-4 py-1">
                  {new Date(item?.updated_at).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell className="border border-white px-4 py-1">
                  {new Date(item?.updated_at).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell className="border border-white px-4 py-1">
                  {new Date(item?.updated_at).toLocaleDateString("en-GB")}
                </TableCell>

                <TableCell className="border border-white px-4 py-1">
                  {item?.meta_title}
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
                  {item?.Depertment?.name}
                </TableCell>

                <TableCell className="flex justify-end gap-2 px-4 py-1">
                  <Button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white hover:bg-blue-600 transition duration-150 h-8 w-8"
                  >
                    <MdModeEditOutline size={10} />
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
                    <RiDeleteBin6Line size={10} />
                  </Button>
                  <Button
                    onClick={() => OpenHandler(item.id)}
                    className="bg-blue-500 text-white  hover:bg-blue-600 transition duration-200 h-8 w-8"
                  >
                    <FiUploadCloud size={10} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdmissionTable;
