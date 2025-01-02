import { Button } from "@/components/ui/button";
import { getData } from "@/utils";
import Link from "next/link";

const GenralKnowledgePost = async () => {
  const genralKnowledgeData = await getData("/job");

  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        Genral Knowledge Posting
      </h1>
      <Button className="bg-primary text-white font-montserrat rounded-xl">
        <Link href="/study/add-genral-knowledge">
          Add New Genral Knowledge +
        </Link>
      </Button>
      {/* <GenralKnowledgeTable notesFormData={notesData?.rows || []} headers={""} /> */}
    </div>
  );
};

export default GenralKnowledgePost;
