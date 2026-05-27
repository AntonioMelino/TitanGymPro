namespace TitanGym.Api.Models;

public record LoginRequest(string Email, string Password);
public record RegisterRequest(string Email, string Password, string FullName, string Role);
public record AuthResponse(string Token, DateTime ExpiresAt, string Email, string Role);
