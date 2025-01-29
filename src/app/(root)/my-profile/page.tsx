import { signOut } from "@/auth";
import BookList from "@/components/hero/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";

function page() {
  return (
    <>
      <form
        className="mb-10"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Logout</Button>
      </form>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
}

export default page;
