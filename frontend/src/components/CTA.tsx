import { Link } from "react-router-dom";
import Icon from "./Icon";
import Reveal from "./Reveal";

interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTA({
  title = "Ready to explore your financing options?",
  subtitle = "Talk to our team or submit an enquiry. We'll help you understand suitable options based on your requirement.",
  primaryLabel = "Apply for Loan",
  primaryTo = "/apply",
  secondaryLabel = "Talk to an Expert",
  secondaryHref = "tel:+918796629912",
}: CTAProps) {
  return (
    <Reveal>
      <section className="container-x py-14 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-navy-gradient px-6 py-12 text-center shadow-card sm:px-10 lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-brand-green/20 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base text-white/80 sm:text-lg">{subtitle}</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to={primaryTo} className="btn-accent w-full px-7 py-3.5 sm:w-auto">
                {primaryLabel}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <a href={secondaryHref} className="btn-ghost-light w-full px-7 py-3.5 sm:w-auto">
                <Icon name="phone" className="h-4 w-4" />
                {secondaryLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
