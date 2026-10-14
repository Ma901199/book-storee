import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Book } from "../data/database";

type Props = {
  onAddBook: (book: Book) => string;
  onCancel: () => void;
};

type BookForm = {
  title: string;
  author: string;
  price: string;
  genre: string;
  pages: string;
  description: string;
  image: string;
};

const emptyForm: BookForm = {
  title: "",
  author: "",
  price: "",
  genre: "Fantasy",
  pages: "",
  description: "",
  image: ""
};

export default function AddBookForm({ onAddBook, onCancel }: Props) {
  const [form, setForm] = useState<BookForm>(emptyForm);
  const [error, setError] = useState("");
  const [readingFile, setReadingFile] = useState(false);

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Разрешены только JPG, PNG и WebP.");
      return;
    }

    if (file.size > 500 * 1024) {
      setError("Изображение должно быть не больше 500 КБ.");
      return;
    }

    setError("");
    setReadingFile(true);

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setForm((current) => ({ ...current, image: reader.result as string }));
      } else {
        setError("Не удалось прочитать изображение.");
      }
      setReadingFile(false);
    };

    reader.onerror = () => {
      setError("Не удалось прочитать изображение.");
      setReadingFile(false);
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const title = form.title.trim();
    const author = form.author.trim();
    const description = form.description.trim();
    const price = Number(form.price);
    const pages = Number(form.pages);
    const image = form.image.trim();

    if (title.length < 2 || author.length < 2) {
      setError("Название и автор должны содержать минимум 2 символа.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0 || price > 100000) {
      setError("Укажи корректную цену.");
      return;
    }

    if (!Number.isInteger(pages) || pages < 1 || pages > 10000) {
      setError("Количество страниц должно быть от 1 до 10000.");
      return;
    }

    if (description.length < 20) {
      setError("Описание должно содержать минимум 20 символов.");
      return;
    }

    if (
      image &&
      !image.startsWith("data:image/") &&
      !/^https?:\/\/\S+$/i.test(image)
    ) {
      setError("Вставь корректную ссылку на изображение.");
      return;
    }

    const book: Book = {
      id: crypto.randomUUID(),
      title,
      author,
      price: Math.round(price * 100) / 100,
      genre: form.genre,
      pages,
      description,
      image: image || "https://placehold.co/300x440/242035/ffffff?text=Book"
    };

    const message = onAddBook(book);

    if (message) {
      setError(message);
      return;
    }

    setForm(emptyForm);
  }

  return (
    <section className="add-page">
      <button type="button" className="text-button back-button" onClick={onCancel}>
        ← Вернуться в каталог
      </button>

      <div className="form-panel">
        <p className="eyebrow">EXPAND THE COLLECTION</p>
        <h2>Добавить книгу</h2>
        <p className="muted">Заполни информацию о новой книге.</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="form-stack">
          <label>
            Название
            <input name="title" value={form.title} onChange={updateField} required />
          </label>

          <label>
            Автор
            <input name="author" value={form.author} onChange={updateField} required />
          </label>

          <div className="form-row">
            <label>
              Цена (€)
              <input
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                value={form.price}
                onChange={updateField}
                required
              />
            </label>

            <label>
              Страницы
              <input
                name="pages"
                type="number"
                min="1"
                step="1"
                value={form.pages}
                onChange={updateField}
                required
              />
            </label>
          </div>

          <label>
            Жанр
            <select name="genre" value={form.genre} onChange={updateField}>
              <option>Fantasy</option>
              <option>Science Fiction</option>
              <option>Classic</option>
              <option>Romance</option>
              <option>Mystery</option>
              <option>Non-fiction</option>
              <option>Horror</option>
              <option>Adventure</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Описание
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              minLength={20}
              required
              rows={4}
            />
          </label>

          <label>
            Ссылка на обложку (необязательно)
            <input
              name="image"
              value={form.image.startsWith("data:image/") ? "" : form.image}
              onChange={updateField}
              placeholder="https://example.com/cover.jpg"
            />
          </label>

          <label>
            Или загрузи обложку (JPG, PNG, WebP, до 500 КБ)
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImage}
            />
          </label>

          {form.image && (
            <img className="image-preview" src={form.image} alt="Предпросмотр обложки" />
          )}

          <button className="button-primary full-width" type="submit" disabled={readingFile}>
            {readingFile ? "Загружаем..." : "Добавить книгу"}
          </button>
        </form>
      </div>
    </section>
  );
}