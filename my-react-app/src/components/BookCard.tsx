import { useState } from "react";
import type { Book } from "../data/database";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="book-card">
      <div className="book-cover">
        <img
          src={
            imageError
              ? "https://placehold.co/300x440/242035/ffffff?text=Book"
              : book.image
          }
          alt={book.title}
          onError={() => setImageError(true)}
        />
        <span className="genre-badge">{book.genre}</span>
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p className="book-description">{book.description}</p>

        <div className="book-meta">
          <span>{book.pages} стр.</span>
          <strong>{book.price.toFixed(2)} €</strong>
        </div>
      </div>
    </article>
  );
}