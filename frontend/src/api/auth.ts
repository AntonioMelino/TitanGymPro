import type { LoginRequest, AuthResponse } from "../types/auth";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.message || body?.errors || "Error al iniciar sesión";
    throw new Error(
      Array.isArray(message) ? message.join(", ") : String(message),
    );
  }

  return response.json();
}
