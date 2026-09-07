import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className = "",
}: SectionHeaderProps) {
  const alignCls = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignCls} ${className}`}>
      {eyebrow && (
        <span className={light ? "eyebrow border-white/20 bg-white/10 text-white" : "eyebrow"}>
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${light ? "text-white" : "text-brand-navy"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-white/80" : "text-slate-600"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
