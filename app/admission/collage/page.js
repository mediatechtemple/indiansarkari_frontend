import CollageAdmissionTable from "@/components/admission/collage-admission-table";
import { collageAdmissionPostHeaderControlls } from "@/config";
import { getData } from "@/utils";

const CollageAdmissionPost = async () => {
  const collageAdmissionFormData = await getData("/upadmis/get/college");

  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        Collage Admission Posting
      </h1>
      <CollageAdmissionTable
        collageAdmissionFormData={collageAdmissionFormData || []}
        headers={collageAdmissionPostHeaderControlls}
      />
    </div>
  );
};

export default CollageAdmissionPost;
