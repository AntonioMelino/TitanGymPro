import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <main className="container">
      <section className="login-card">
        <h1>Panel de {user?.email}</h1>
        <p>Bienvenido al panel de administración básico.</p>
      </section>
    </main>
  );
}
