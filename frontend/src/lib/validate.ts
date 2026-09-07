export function isIndianMobile(value: string): boolean {
  const v = value.replace(/[^\d]/g, "");
  // 10 digits, starting 6-9, optionally prefixed with 91 / 0
  return /^(?:91|0)?[6-9]\d{9}$/.test(v);
}

export function normalizeMobile(value: string): string {
  return value.replace(/[^\d]/g, "").replace(/^0+/, "");
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function required(value: string): boolean {
  return value.trim().length > 0;
}

export function formatINR(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-IN").format(n);
}
