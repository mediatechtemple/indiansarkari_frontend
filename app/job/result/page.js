import ResultTable from "@/components/job/result-table";
import { resultHeaderControlls } from "@/config";
import { getData } from "@/utils";

const Result = async () => {
  //const admitCardData = await getData("/jobupdate/get/admit-cards");
  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        Result
      </h1>
      <ResultTable resultData={[]} headers={resultHeaderControlls} />
    </div>
  );
};

export default Result;
