const configuredApiUrl = (import.meta.env.VITE_API_URL || "").trim();
const API_BASE_URL = configuredApiUrl.replace(/\/$/, "");

export async function submitToApi<T>(path: string, payload: T): Promise<void> {
  if (!API_BASE_URL && !import.meta.env.DEV) {
    throw new Error("The enquiry service is not configured. Please try again later or call us directly.");
  }

  const response = await fetch(`${API_BASE_URL || "http://localhost:4000"}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message || "Unable to submit your enquiry right now");
  }
}
