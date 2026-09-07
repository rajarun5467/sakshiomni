import { Link } from "react-router-dom";
import { company } from "../data/site";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Brand lockup for Sakshionmi Group.
 * Built from the visiting-card reference: navy/blue mark with green & orange accents.
 * To use a real logo asset later, replace the <svg> mark with an <img src="/logo.svg" />.
 */
export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-brand-navy";
  const subColor = variant === "light" ? "text-white/70" : "text-slate-500";

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${company.name} home`}
    >
      <span className="relative inline-flex h-10 w-10 items-center justify-center">
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
          <defs>
            <linearGradient id="lg-navy" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0A1F44" />
              <stop offset="1" stopColor="#1B3A8B" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#lg-navy)" />
          {/* S monogram with green + orange accents */}
          <path
            d="M30 16c-1.6-2-4-3-7-3-3.6 0-6 2-6 4.8 0 2.6 2 3.8 6 4.6 4.4.9 6.6 2.2 6.6 5.2 0 2.9-2.7 5-6.8 5-3.4 0-6-1.2-7.6-3.2"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle cx="16.5" cy="15.5" r="2.2" fill="#F58220" />
          <circle cx="31.5" cy="32.5" r="2.2" fill="#1FA372" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.05rem] font-extrabold tracking-tight ${textColor}`}>
          Sakshionmi
          <span className="text-brand-orange"> Group</span>
        </span>
        <span className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] ${subColor}`}>
          Financial Solutions
        </span>
      </span>
    </Link>
  );
}
