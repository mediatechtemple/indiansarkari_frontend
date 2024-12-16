import AdmissionTable from "@/components/admission/admission-table";
import { admissionPostHeaderControlls } from "@/config";
import { getData } from "@/utils";

const AdmissionPost = async () => {
  const admissionFormData = await getData("/admission");

  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        Admission Posting
      </h1>
      <AdmissionTable
        admissionFormData={admissionFormData?.rows || []}
        headers={admissionPostHeaderControlls}
      />
    </div>
  );
};

export default AdmissionPost;
