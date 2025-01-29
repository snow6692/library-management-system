import React from "react";
import { Book } from "../../../types";
import BookCard from "./BookCard";

interface IProps {
  title: string;
  books: Book[];
  containerClassName?: string;
}
function BookList({ title, books, containerClassName }: IProps) {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className=" book-list">
        {books.map((book)=><BookCard key={book.id} {...book} />)}
      </ul>
    </section>
  );
}

export default BookList;
