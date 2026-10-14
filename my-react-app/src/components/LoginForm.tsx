import { useState, type FormEvent } from "react";

type Props = {
  onLogin: (email: string, password: string) => string;
  onSwitch: () => void;
  notice: string;
};

export default function LoginForm({
  onLogin,
  onSwitch,
  notice
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(onLogin(email.trim(), password));
  }

  return (
    <div className="auth-card">
      <div className="auth-icon">✦</div>
      <p className="eyebrow">WELCOME BACK</p>
      <h2>С возвращением</h2>
      <p className="muted">Продолжи своё книжное путешествие.</p>

      {notice && <div className="success-message">{notice}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="form-stack">
        <label>
          Электронная почта
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="you@example.com"
          />
        </label>

        <label>
          Пароль
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder="Твой пароль"
          />
        </label>

        <button className="button-primary full-width" type="submit">
          Войти в аккаунт
        </button>
      </form>

      <p className="auth-switch">
        Ещё нет аккаунта?{" "}
        <button type="button" className="text-button" onClick={onSwitch}>
          Зарегистрироваться
        </button>
      </p>
    </div>
  );
}