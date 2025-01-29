import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "./BookCoverSvg";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantsStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};
interface IProps {
  className?: string;
  coverColor: string;
  coverImage: string;
  variant: BookCoverVariant;
}
function BookCover({
  coverColor = "#012B48",
  coverImage = "https://placeholder.co/400*600.png",
  className,
  variant = "regular",
}: IProps) {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantsStyles[variant],
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverImage}
          alt="Book Cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
}

export default BookCover;
