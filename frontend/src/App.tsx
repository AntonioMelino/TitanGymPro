import React, { useState } from "react";
import { login } from "./api/auth";
import type { LoginRequest, AuthResponse } from "./types/auth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthResponse | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const payload: LoginRequest = {
      email,
      password,
    };

    try {
      const auth = await login(payload);
      setUser(auth);
      // Guardar token para llamadas futuras
      try {
        localStorage.setItem('tg_token', auth.token);
      } catch {}
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <section className="login-card">
        <h1>TitanGym Pro</h1>
        <p>Inicia sesión para acceder al panel.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          {error ? <p className="error">{error}</p> : null}
          {user ? (
            <div className="success">
              <strong>Login exitoso</strong>
              <p>Usuario: {user.email}</p>
              <p>Rol: {user.role}</p>
            </div>
          ) : null}
        </form>
      </section>
    </main>
  );
}

export default App;
