import SchoolAdmissionTable from "@/components/admission/school-admission-table";
import { schoolAdmissionPostHeaderControlls } from "@/config";
import { getData } from "@/utils";

const SchoolAdmissionPost = async () => {
  const schoolAdmissionFormData = await getData("/upadmis/get/school");

  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        School Admission Posting
      </h1>
      <SchoolAdmissionTable
        schoolAdmissionFormData={schoolAdmissionFormData?.rows || []}
        headers={schoolAdmissionPostHeaderControlls}
      />
    </div>
  );
};

export default SchoolAdmissionPost;
