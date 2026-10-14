import type { Book } from "../data/database";

export type SortMode =
  | "default"
  | "title-asc"
  | "title-desc"
  | "price-asc"
  | "price-desc"
  | "pages-asc";

export function getVisibleBooks(
  books: Book[],
  search: string,
  genre: string,
  sortMode: SortMode,
  minPages: string
): Book[] {
  const query = search.trim().toLowerCase();

  const result = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);

    const matchesGenre = genre === "all" || book.genre === genre;

    const matchesPages =
      minPages.trim() === "" || book.pages >= Number(minPages);

    return matchesSearch && matchesGenre && matchesPages;
  });

  switch (sortMode) {
    case "title-asc":
      return result.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return result.sort((a, b) => b.title.localeCompare(a.title));
    case "price-asc":
      return result.sort((a, b) => a.price - b.price);
    case "price-desc":
      return result.sort((a, b) => b.price - a.price);
    case "pages-asc":
      return result.sort((a, b) => a.pages - b.pages);
    default:
      return result;
  }
}