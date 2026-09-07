import Icon from "./Icon";
import Reveal from "./Reveal";

interface Person {
  name: string;
  role: string;
  phone: string;
  tel: string;
}

export default function TeamCard({ person, delay = 0 }: { person: Person; delay?: number }) {
  return (
    <Reveal delay={delay} as="article">
      <div className="group relative overflow-hidden rounded-2xl border border-brand-line bg-white p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-mist to-transparent" />
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-royal text-2xl font-bold text-white shadow-soft">
          {person.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <h3 className="relative mt-4 font-display text-lg font-bold text-brand-navy">{person.name}</h3>
        <p className="relative text-sm font-semibold text-brand-accent">{person.role}</p>
        <p className="relative mt-1 text-sm text-slate-500">{person.phone}</p>
        <div className="relative mt-5 flex items-center justify-center gap-2">
          <a href={`tel:${person.tel}`} className="btn-primary px-4 py-2.5 text-xs">
            <Icon name="phone" className="h-4 w-4" /> Call
          </a>
          <a
            href={`https://wa.me/91${person.tel.replace("+91", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green px-4 py-2.5 text-xs"
          >
            <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </Reveal>
  );
}
