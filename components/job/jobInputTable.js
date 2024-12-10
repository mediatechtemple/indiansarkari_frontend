import { Button } from "@/components/ui/button";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
const JobinputCommonTable = ({ data = [], headers = [], onEdit, onDelete }) => {
  return (
    <div className="mt-2 border border-gray-300 rounded-lg shadow-lg">
      <div className="overflow-y-auto max-h-96">
        <Table className="w-full border-collapse">
          <thead className="sticky top-0 bg-primary text-white">
            <tr>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  className="border border-gray-300 px-4 py-2 font-semibold text-center"
                >
                  {header}
                  <span className="ml-2 text-sm text-gray-200">↑</span>
                  <span className="text-sm text-gray-200">↓</span>
                </TableCell>
              ))}
            </tr>
          </thead>
          <TableBody>
            {data &&
              data.length > 0 &&
              data.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <TableCell className="border border-gray-300 px-4 py-0.5 text-center">
                    {item.id}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-4 py-0.5 text-center">
                    {item.name}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-4 py-0.5 text-center">
                    {item.slug}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-4 py-0.5 flex justify-center gap-2">
                    <Button
                      onClick={() => onEdit(item)}
                      className="bg-blue-500 text-white px-1 py-0.5 h-6 rounded"
                    >
                      <MdModeEditOutline size={17} />
                    </Button>
                    <Button
                      onClick={() => onDelete(item.id)}
                      className="bg-red-500 text-white px-1 py-0.5 h-6 rounded "
                    >
                      <RiDeleteBin6Line size={17} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobinputCommonTable;
