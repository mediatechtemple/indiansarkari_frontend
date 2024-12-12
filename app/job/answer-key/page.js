import AnswerKeyTable from "@/components/job/answer-key-table";
import { answerKeyHeaderControlls } from "@/config";
import { getData } from "@/utils";

const AnswerKey = async () => {
  const answerKeyData = await getData("/jobupdate/get/answer-keys");
  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        Answer Key
      </h1>
      <AnswerKeyTable
        answerKeyData={answerKeyData || []}
        headers={answerKeyHeaderControlls}
      />
    </div>
  );
};

export default AnswerKey;
