import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page() {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href={"/admin/books"} className="text-white">
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        {/* TODO: BOOK FORM */}
        <BookForm />
      </section>
    </>
  );
}

export default page;
