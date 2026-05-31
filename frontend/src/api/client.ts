export async function authFetch(input: RequestInfo, init?: RequestInit) {
  const token = localStorage.getItem("tg_token");
  const headers = new Headers((init?.headers as HeadersInit | undefined) || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(input, { ...init, headers });
  return res;
}
