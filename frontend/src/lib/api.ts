const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

export async function submitToApi<T>(path: string, payload: T): Promise<void> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message || "Unable to submit your enquiry right now");
  }
}
