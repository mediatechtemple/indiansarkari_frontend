import AdmitCardTable from "@/components/job/admit-card-table";
import { admitCardHeaderControlls } from "@/config";
import { getData } from "@/utils";

const AdmiCard = async () => {
  const admitCardData = await getData("/jobupdate/get/admit-cards");
  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        Admit Card
      </h1>
      <AdmitCardTable
        admitCardData={admitCardData?.rows || []}
        headers={admitCardHeaderControlls}
      />
    </div>
  );
};

export default AdmiCard;
