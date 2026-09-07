const configuredApiUrl = (import.meta.env.VITE_API_URL || "").trim();
const API_BASE_URL = configuredApiUrl.replace(/\/$/, "");

export async function apiRequest<TResponse>(path: string, init: RequestInit = {}): Promise<TResponse> {
  if (!API_BASE_URL && !import.meta.env.DEV) {
    throw new Error("The API service is not configured. Please set VITE_API_URL.");
  }

  const response = await fetch(`${API_BASE_URL || "http://localhost:4000"}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  const body = (await response.json().catch(() => null)) as (TResponse & { message?: string }) | null;
  if (!response.ok) throw new Error(body?.message || "Request failed");
  return body as TResponse;
}

export async function submitToApi<T>(path: string, payload: T): Promise<void> {
  await apiRequest(path, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
