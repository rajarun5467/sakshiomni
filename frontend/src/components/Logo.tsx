import { Link } from "react-router-dom";
import { company } from "../data/site";
import logoImage from "../assets/logo.jpeg";

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
      <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white shadow-soft">
        <img
          src={logoImage}
          alt={`${company.name} logo`}
          className="h-full w-full object-cover object-center"
        />
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
