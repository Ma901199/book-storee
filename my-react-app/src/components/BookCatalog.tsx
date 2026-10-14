import { useMemo, useState } from "react";
import type { Book } from "../data/database";
import BookCard from "./BookCard";
import { getVisibleBooks, type SortMode } from "../utils/catalog";

type Props = {
  books: Book[];
};

export default function BookCatalog({ books }: Props) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [minPages, setMinPages] = useState("");

  const visibleBooks = useMemo(
    () => getVisibleBooks(books, search, genre, sortMode, minPages),
    [books, search, genre, sortMode, minPages]
  );

  function resetFilters() {
    setSearch("");
    setGenre("all");
    setSortMode("default");
    setMinPages("");
  }

  return (
    <section className="catalog">
      <div className="section-heading">
        <div>
          <p className="eyebrow">DISCOVER YOUR NEXT READ</p>
          <h2>Книжная коллекция</h2>
          <p className="muted">Найди историю, в которую захочется погрузиться.</p>
        </div>
        <span className="result-count">{visibleBooks.length} книг</span>
      </div>

      <div className="filters">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Поиск по названию или автору..."
          aria-label="Поиск книг"
        />

        <select
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          aria-label="Жанр"
        >
          <option value="all">Все жанры</option>
          {Array.from(new Set(books.map((book) => book.genre))).map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value as SortMode)}
          aria-label="Сортировка"
        >
          <option value="default">По умолчанию</option>
          <option value="title-asc">Название: А–Я</option>
          <option value="title-desc">Название: Я–А</option>
          <option value="price-asc">Сначала дешевле</option>
          <option value="price-desc">Сначала дороже</option>
          <option value="pages-asc">По страницам</option>
        </select>

        <input
          type="number"
          min="1"
          value={minPages}
          onChange={(event) => setMinPages(event.target.value)}
          placeholder="Мин. страниц"
          aria-label="Минимум страниц"
        />

        <button className="button-secondary" onClick={resetFilters}>
          Сбросить
        </button>
      </div>

      {visibleBooks.length > 0 ? (
        <div className="book-grid">
          {visibleBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>📚</span>
          <h3>Книги не найдены</h3>
          <p>Попробуй изменить запрос или сбросить фильтры.</p>
          <button className="button-primary" onClick={resetFilters}>
            Показать все книги
          </button>
        </div>
      )}
    </section>
  );
}