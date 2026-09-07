import { Link } from "react-router-dom";
import Logo from "./Logo";
import Icon from "./Icon";
import { company, footerServices, navLinks } from "../data/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-navy text-white">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-green/15 blur-3xl" />

      <div className="container-x relative py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {company.name} is an independent financial advisory service offering assistance for home loans,
              property loans, business loans, OD/CC limits, industrial loans and property sale & purchase.
            </p>
            <p className="mt-4 text-sm font-semibold text-brand-orange">{company.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={`tel:${company.primaryPhone}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <Icon name="phone" className="h-4 w-4" /> Call
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/70 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/apply" className="text-white/70 transition hover:text-white">
                  Apply for Loan
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerServices.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/70 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex gap-3">
                <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                <span>{company.address.full}</span>
              </li>
              {company.people.map((p) => (
                <li key={p.tel} className="flex gap-3">
                  <Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <a href={`tel:${p.tel}`} className="hover:text-white">
                    {p.name} — {p.phone}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" />
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="globe" className="mt-0.5 h-5 w-5 shrink-0 text-white/60" />
                <span>{company.website}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {company.year} {company.name}. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link to="/disclaimer" className="hover:text-white">Disclaimer</Link>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-[0.7rem] leading-relaxed text-white/40">
          Sakshionmi Group is an independent financial advisory service and is not a bank or lender. Loan
          approvals, interest rates, tenure and disbursement are subject to the policies, eligibility criteria
          and approval of the respective lender. Names/logos of banks and NBFCs mentioned belong to their
          respective owners and are used for reference only.
        </p>
      </div>
    </footer>
  );
}
