import { initialDatabase, type Database } from "../data/database";

const STORAGE_KEY = "bookverse-v1";

export function loadDatabase(): Database {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return initialDatabase;

    const parsed: unknown = JSON.parse(saved);

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "users" in parsed &&
      "books" in parsed &&
      Array.isArray(parsed.users) &&
      Array.isArray(parsed.books)
    ) {
      return parsed as Database;
    }

    return initialDatabase;
  } catch {
    return initialDatabase;
  }
}

export function saveDatabase(database: Database): string {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(database));
    return "";
  } catch {
    return "Не удалось сохранить данные.";
  }
}