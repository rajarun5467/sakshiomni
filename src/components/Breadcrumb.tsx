import { Link } from "react-router-dom";
import Icon from "./Icon";

interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-x py-5 sm:py-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {c.to ? (
              <Link to={c.to} className="font-semibold text-brand-royal hover:text-brand-accent">
                {c.label}
              </Link>
            ) : (
              <span className="font-semibold text-brand-navy">{c.label}</span>
            )}
            {i < items.length - 1 && <Icon name="chevron" className="h-3.5 w-3.5 -rotate-90 text-slate-300" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
