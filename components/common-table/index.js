import { useState } from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import { Dialog } from "../ui/dialog"; // Shadcn UI Dialog for edit
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
const CommonTable = ({ data = [], headers = [], onEdit, onDelete }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDelete = (id) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleEdit = (item) => {
    setSelectedRow(item);
    if (onEdit) {
      onEdit(item);
    }

    // Handle content based on type
    if (item.type === "pdf") {
      // Open PDF in a dialog
      openPdfInDialog(item);
    } else if (item.type === "video") {
      // Open video in a new tab
      openVideoInNewTab(item);
    }
  };

  const openPdfInDialog = (item) => {
    // Logic for opening the PDF content in a dialog
    setSelectedRow(item);
  };

  const openVideoInNewTab = (item) => {
    // Logic for opening the video content in a new tab
    window.open(item.videoUrl, "_blank");
  };

  return (
    <div className="mt-5">
      <Table className="w-full table-auto border-collapse border border-white">
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
          {data.map((item) => (
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

      {selectedRow && selectedRow.type === "pdf" && (
        <Dialog open={true} onClose={() => setSelectedRow(null)}>
          <div className="p-4">
            <h3 className="font-bold">View PDF</h3>
            <iframe
              src={selectedRow.pdfUrl}
              className="w-full h-96"
              title="PDF Preview"
            ></iframe>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default CommonTable;
