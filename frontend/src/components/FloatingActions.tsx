import { useEffect, useState } from "react";
import Icon from "./Icon";
import { company } from "../data/site";

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {open && (
        <div className="flex flex-col items-end gap-2.5">
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 text-sm font-semibold text-brand-green shadow-card"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-white">
              <Icon name="whatsapp" className="h-5 w-5" />
            </span>
            WhatsApp
          </a>
          <a
            href={`tel:${company.primaryPhone}`}
            className="flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 text-sm font-semibold text-brand-navy shadow-card"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-white">
              <Icon name="phone" className="h-5 w-5" />
            </span>
            Call Kulbeer
          </a>
          <a
            href={`tel:${company.people[1].tel}`}
            className="flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 text-sm font-semibold text-brand-navy shadow-card"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white">
              <Icon name="phone" className="h-5 w-5" />
            </span>
            Call Sachin
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick actions" : "Open quick actions"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange to-brand-orangeDark text-white shadow-card transition-transform hover:scale-105"
      >
        <Icon name={open ? "close" : "chat"} className="h-6 w-6" />
      </button>
    </div>
  );
}
