import { getData } from "@/utils";

const NotesPost = async () => {
  const genralKnowledgeData = await getData("/job");

  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        Notes Posting
      </h1>
      {/* <GenralKnowledgeTable jobFormData={genralKnowledgeData?.rows || []} headers={""} /> */}
    </div>
  );
};

export default NotesPost;
