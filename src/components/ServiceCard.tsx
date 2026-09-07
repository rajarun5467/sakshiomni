import { Link } from "react-router-dom";
import Icon from "./Icon";
import Reveal from "./Reveal";

interface ServiceCardProps {
  slug?: string;
  title: string;
  description: string;
  icon: string;
  to?: string;
  delay?: number;
}

export default function ServiceCard({ slug, title, description, icon, to, delay = 0 }: ServiceCardProps) {
  const href = to ?? (slug ? `/services/${slug}` : "/services");
  return (
    <Reveal delay={delay} as="article">
      <Link
        to={href}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/40 hover:shadow-card"
      >
        <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-mist opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-royal text-white shadow-soft transition-transform duration-300 group-hover:scale-105">
          <Icon name={icon} className="h-7 w-7" />
        </span>
        <h3 className="relative mt-5 font-display text-lg font-bold text-brand-navy">{title}</h3>
        <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
        <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent">
          Learn More
          <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}
