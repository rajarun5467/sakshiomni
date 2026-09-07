import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Icon from "./Icon";
import { navLinks } from "../data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // When at top (not scrolled) and menu closed, navbar is transparent over dark hero → light text
  // When scrolled or mobile menu open, navbar is white → dark text
  const light = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        light
          ? "border-b border-transparent bg-transparent"
          : "border-b border-brand-line bg-white/95 backdrop-blur-md shadow-soft"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between lg:h-20">
        <Logo variant={light ? "light" : "dark"} />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? light ? "text-white" : "text-brand-accent"
                      : light ? "text-white/80 hover:text-white" : "text-brand-navy/80 hover:text-brand-navy"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full transition-all duration-300 ${
                        light ? "bg-brand-orange" : "bg-brand-accent"
                      } ${isActive ? "opacity-100" : "opacity-0"}`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link
            to="/apply"
            className="btn-accent inline-flex items-center gap-2 px-5 py-3 text-sm"
          >
            Apply for Loan
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors lg:hidden ${
            light
              ? "border-white/25 bg-white/10 text-white backdrop-blur"
              : "border-brand-line bg-white text-brand-navy"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`fixed inset-0 top-16 z-40 bg-brand-navy/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`fixed inset-x-0 top-16 z-50 origin-top border-b border-brand-line bg-white shadow-card transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
          }`}
        >
          <ul className="container-x flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3.5 text-base font-semibold transition-colors ${
                      isActive ? "bg-brand-mist text-brand-accent" : "text-brand-navy hover:bg-brand-mist"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-2 px-1">
              <Link to="/apply" className="btn-accent flex w-full items-center justify-center gap-2 px-5 py-3.5">
                Apply for Loan
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
