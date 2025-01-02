import { Button } from "@/components/ui/button";
import { getData } from "@/utils";
import Link from "next/link";

const BookPost = async () => {
  const bookData = await getData("/job");

  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl font-semibold text-center text-blueish font-montserrat">
        Book Posting
      </h1>
      <Button className="bg-primary text-white font-montserrat rounded-xl">
        <Link href="/study/add-book">Add New Book +</Link>
      </Button>
      {/* <BookTable jobFormData={bookData?.rows || []} headers={""} /> */}
    </div>
  );
};

export default BookPost;
