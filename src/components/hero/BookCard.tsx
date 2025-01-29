import Link from "next/link";
import { Book } from "../../../types";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

function BookCard({
  id,
  title,
  genre,
  cover,
  color,
  isLoanedBook = false,
}: Book) {
  return (
    <li className={cn(isLoanedBook && "w-full xs:w-52")}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "flex w-full flex-col items-center")}
      >
        <BookCover coverColor={color} coverImage={cover} />
        <div className={cn("mt-4", !isLoanedBook && "max-w-28 xs:max-w-40")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src={"/icons/calendar.svg"}
                alt="calendar"
                className="object-contain"
                width={18}
                height={18}
              />
              <p className="text-light-100">11 days left to return</p>
            </div>
            <Button className="book-btn bg-dark-600 hover:bg-dark-600">
              Download receipt
            </Button>
          </div>
        )}
      </Link>
    </li>
  );
}

export default BookCard;
