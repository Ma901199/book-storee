import { useState } from "react";
import type { Book, Database, User } from "./data/database";
import { initialDatabase } from "./data/database";
import { loadDatabase, saveDatabase } from "./utils/storage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import BookCatalog from "./components/BookCatalog";
import AddBookForm from "./components/AddBookForm";
import "./App.css";

type AuthTab = "register" | "login";
type Page = "catalog" | "add";

function getInitialDatabase(): Database {
  return localStorage.getItem("bookverse-v1") === null
    ? initialDatabase
    : loadDatabase();
}

export default function App() {
  const [database, setDatabase] = useState<Database>(getInitialDatabase);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authTab, setAuthTab] = useState<AuthTab>("register");
  const [page, setPage] = useState<Page>("catalog");
  const [notice, setNotice] = useState("");

  function commitDatabase(nextDatabase: Database): string {
    const error = saveDatabase(nextDatabase);
    if (error) return error;
    setDatabase(nextDatabase);
    return "";
  }

  function registerUser(form: {
    name: string;
    email: string;
    password: string;
  }): string {
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (name.length < 2 || name.length > 60) {
      return "Имя должно содержать от 2 до 60 символов.";
    }

    if (form.password.length < 6 || form.password.length > 100) {
      return "Пароль должен содержать от 6 до 100 символов.";
    }

    if (database.users.some((user) => user.email.toLowerCase() === email)) {
      return "Аккаунт с такой почтой уже существует.";
    }

    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password: form.password
    };

    const error = commitDatabase({
      ...database,
      users: [...database.users, user]
    });

    if (error) return error;

    setNotice("Регистрация успешна. Теперь войди в аккаунт.");
    setAuthTab("login");
    return "";
  }

  function loginUser(email: string, password: string): string {
    const user = database.users.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!user) return "Неверная почта или пароль.";

    setCurrentUser(user);
    setPage("catalog");
    setNotice("");
    return "";
  }

  function addBook(book: Book): string {
    const error = commitDatabase({
      ...database,
      books: [...database.books, book]
    });

    if (error) return error;

    setPage("catalog");
    setNotice("Книга успешно добавлена!");
    return "";
  }

  function logout() {
    setCurrentUser(null);
    setAuthTab("login");
    setPage("catalog");
    setNotice("");
  }

  if (!currentUser) {
    return (
      <main className="auth-layout">
        <div className="auth-brand">
          <span className="brand-symbol">B.</span>
          <span>BookVerse</span>
        </div>

        <div className="auth-content">
          <div className="auth-art">
            <div className="art-glow" />
            <div className="floating-book book-one">BOOKS</div>
            <div className="floating-book book-two">DREAM</div>
            <div className="floating-book book-three">EXPLORE</div>
            <p>Миллионы миров.<br />Одна библиотека.</p>
          </div>

          {authTab === "register" ? (
            <RegisterForm
              onRegister={registerUser}
              onSwitch={() => {
                setAuthTab("login");
                setNotice("");
              }}
              notice={notice}
            />
          ) : (
            <LoginForm
              onLogin={loginUser}
              onSwitch={() => {
                setAuthTab("register");
                setNotice("");
              }}
              notice={notice}
            />
          )}
        </div>

        <footer className="auth-footer">
          BookVerse · Твоя следующая любимая история ждёт тебя.
        </footer>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand-button" onClick={() => setPage("catalog")}>
          <span className="brand-symbol">B.</span>
          <span>BookVerse</span>
        </button>

        <nav className="main-nav">
          <button
            className={page === "catalog" ? "nav-link active" : "nav-link"}
            onClick={() => {
              setPage("catalog");
              setNotice("");
            }}
          >
            Каталог
          </button>
          <button
            className={page === "add" ? "nav-link active" : "nav-link"}
            onClick={() => {
              setPage("add");
              setNotice("");
            }}
          >
            + Добавить книгу
          </button>
        </nav>

        <div className="user-menu">
          <span className="user-avatar">{currentUser.name.charAt(0).toUpperCase()}</span>
          <span className="user-name">{currentUser.name}</span>
          <button className="button-secondary logout-button" onClick={logout}>
            Выйти
          </button>
        </div>
      </header>

      <main className="main-content">
        {notice && (
          <div className="success-message app-notice">
            <span>{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Закрыть">×</button>
          </div>
        )}

        {page === "catalog" ? (
          <>
            <section className="hero">
              <div className="hero-content">
                <p className="eyebrow">A WORLD BETWEEN THE COVERS</p>
                <h1>Найди свою<br /><span>следующую историю.</span></h1>
                <p>
                  От захватывающего фэнтези до научной фантастики —
                  здесь начинается твоё новое приключение.
                </p>
                <button
                  className="button-primary"
                  onClick={() => document.querySelector(".catalog")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Исследовать каталог ↘
                </button>
              </div>

              <div className="hero-decoration">
                <div className="hero-orbit orbit-one" />
                <div className="hero-orbit orbit-two" />
                <div className="hero-book">
                  <span>BOOKVERSE</span>
                  <strong>Stories<br />await.</strong>
                  <small>YOUR NEXT CHAPTER</small>
                </div>
              </div>
            </section>

            <BookCatalog books={database.books} />
          </>
        ) : (
          <AddBookForm onAddBook={addBook} onCancel={() => setPage("catalog")} />
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-symbol">B.</span> BookVerse
        </div>
        <p>Читай больше. Мечтай шире.</p>
        <span>© {new Date().getFullYear()} BookVerse</span>
      </footer>
    </div>
  );
}