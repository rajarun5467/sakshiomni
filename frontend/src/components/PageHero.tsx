import type { ReactNode } from "react";
import Reveal from "./Reveal";
import Icon from "./Icon";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: string;
}

export default function PageHero({ eyebrow, title, subtitle, icon }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-gradient pb-16 pt-28 text-white sm:pb-20 lg:pb-24 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-hero-grid [background-size:22px_22px] opacity-30" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-accent/25 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-green/20 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-32 w-64 rounded-full bg-brand-orange/15 blur-3xl" />
      <div className="container-x relative">
        <Reveal className="max-w-4xl">
          {eyebrow && (
            <span className="eyebrow max-w-full border-white/20 bg-white/10 text-white">
              {icon && <Icon name={icon} className="h-3.5 w-3.5 shrink-0" />}
              <span className="truncate">{eyebrow}</span>
            </span>
          )}
          <h1 className="mt-5 max-w-4xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
