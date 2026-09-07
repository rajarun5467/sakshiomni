import { useState } from "react";
import Icon from "./Icon";

interface FaqItem {
  q: string;
  a: string;
}

export default function FAQ({ items, className = "" }: { items: FaqItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={`mx-auto max-w-3xl divide-y divide-brand-line overflow-hidden rounded-2xl border border-brand-line bg-white shadow-soft ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-brand-mist/60 sm:px-6"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-brand-navy">{item.q}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-line text-brand-royal transition-transform duration-300 ${
                  isOpen ? "rotate-180 border-brand-accent bg-brand-accent text-white" : ""
                }`}
              >
                <Icon name="chevron" className="h-4 w-4" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
