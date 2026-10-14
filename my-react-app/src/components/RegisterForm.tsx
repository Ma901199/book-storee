import { useState, type FormEvent } from "react";

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type Props = {
  onRegister: (data: RegisterData) => string;
  onSwitch: () => void;
  notice: string;
};

export default function RegisterForm({
  onRegister,
  onSwitch,
  notice
}: Props) {
  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(onRegister({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password
    }));
  }

  return (
    <div className="auth-card">
      <div className="auth-icon">✦</div>
      <p className="eyebrow">YOUR PERSONAL LIBRARY</p>
      <h2>Создай аккаунт</h2>
      <p className="muted">Открой для себя мир новых историй.</p>

      {notice && <div className="success-message">{notice}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="form-stack">
        <label>
          Твоё имя
          <input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            minLength={2}
            maxLength={60}
            required
            placeholder="Твоё имя"
          />
        </label>

        <label>
          Электронная почта
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
            placeholder="you@example.com"
          />
        </label>

        <label>
          Пароль
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            minLength={6}
            maxLength={100}
            required
            placeholder="Минимум 6 символов"
          />
        </label>

        <button className="button-primary full-width" type="submit">
          Создать аккаунт
        </button>
      </form>

      <p className="auth-switch">
        Уже есть аккаунт?{" "}
        <button type="button" className="text-button" onClick={onSwitch}>
          Войти
        </button>
      </p>
    </div>
  );
}