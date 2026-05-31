import React, { useState } from "react";
import type { LoginRequest } from "./types/auth";
import { useAuth } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, login, logout } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const payload: LoginRequest = {
      email,
      password,
    };

    try {
      await login(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
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
                    <>
                      <div className="success">
                        <strong>Login exitoso</strong>
                        <p>Usuario: {user.email}</p>
                        <p>Rol: {user.role}</p>
                      </div>
                      <button type="button" onClick={() => logout()}>
                        Cerrar sesión
                      </button>
                    </>
                  ) : null}
                </form>
              </section>
            </main>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
