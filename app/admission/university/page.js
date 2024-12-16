import UniversityAdmissionTable from "@/components/admission/university-admission-table";
import { universityAdmissionPostHeaderControlls } from "@/config";
import { getData } from "@/utils";

const SchoolAdmissionPost = async () => {
  const universityAdmissionFormData = await getData("/upadmis/get/university");

  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        University Admission Posting
      </h1>
      <UniversityAdmissionTable
        universityAdmissionFormData={universityAdmissionFormData || []}
        headers={universityAdmissionPostHeaderControlls}
      />
    </div>
  );
};

export default SchoolAdmissionPost;
