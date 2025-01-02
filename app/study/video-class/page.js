import { Button } from "@/components/ui/button";
import { getData } from "@/utils";
import Link from "next/link";

const VideoPost = async () => {
  const genralKnowledgeData = await getData("/job");

  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        Video Posting
      </h1>
      <Button className="bg-primary text-white font-montserrat rounded-xl">
        <Link href="/study/add-video-class">
          Add New Video +
        </Link>
      </Button>
      {/* <GenralKnowledgeTable jobFormData={genralKnowledgeData?.rows || []} headers={""} /> */}
    </div>
  );
};

export default VideoPost;
