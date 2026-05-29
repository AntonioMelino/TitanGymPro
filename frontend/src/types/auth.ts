export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  email: string;
  role: string;
}
