import { Link, useParams, Navigate } from "react-router-dom";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Breadcrumb from "../components/Breadcrumb";
import SectionHeader from "../components/SectionHeader";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import EnquiryCard from "../components/EnquiryCard";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { getService, services } from "../data/services";
import { lenderDisclaimer } from "../data/site";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = slug ? getService(slug) : undefined;

  if (!service) return <Navigate to="/services" replace />;

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Seo
        title={`${service.title} Assistance | Sakshionmi Group`}
        description={service.short}
        path={`/services/${service.slug}`}
      />

      <PageHero
        eyebrow={service.title}
        title={service.hero}
        subtitle={service.short}
        icon={service.icon}
      />

      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: service.title }]} />

      {/* Highlights */}
      <section className="container-x py-12 lg:py-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {service.highlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 80} as="article">
              <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">{h.label}</div>
                <div className="mt-1 font-display text-lg font-bold text-brand-navy">{h.value}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Overview + Who can apply */}
      <section className="container-x pb-16 lg:pb-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="h2">Overview</h2>
            <ul className="mt-5 space-y-3">
              {service.overview.map((o, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-brand-line bg-brand-mist p-6">
              <h3 className="h3">Who Can Apply?</h3>
              <ul className="mt-4 space-y-3">
                {service.whoCanApply.map((o, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                    <Icon name="users" className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Typical requirements */}
      <section className="bg-brand-mist py-16 lg:py-20">
        <div className="container-x">
          <SectionHeader eyebrow="Eligibility" title="Typical Requirements" align="left" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.typicalRequirements.map((r, i) => (
              <Reveal key={i} delay={i * 70} as="article">
                <div className="flex items-start gap-3 rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-white">
                    <Icon name="check" className="h-5 w-5" />
                  </span>
                  <p className="text-sm leading-relaxed text-slate-700">{r}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-500">
            Eligibility criteria vary by lender, applicant profile and loan type. Final eligibility is decided by the lender.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="container-x py-16 lg:py-20">
        <SectionHeader eyebrow="Process" title="Financing Process" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((s, i) => (
            <Reveal key={i} delay={i * 90} as="article">
              <div className="relative h-full rounded-2xl border border-brand-line bg-white p-6 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-royal font-display text-lg font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-brand-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl rounded-xl bg-brand-mist px-5 py-3 text-center text-xs leading-relaxed text-slate-500">
          {lenderDisclaimer}
        </p>
      </section>

      {/* Documents */}
      <section className="bg-brand-mist py-16 lg:py-20">
        <div className="container-x">
          <SectionHeader eyebrow="Documents" title="Documents Generally Required" align="left" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.documents.map((d, i) => (
              <Reveal key={i} delay={i * 60} as="article">
                <div className="flex items-start gap-3 rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
                  <Icon name="doc" className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" />
                  <p className="text-sm leading-relaxed text-slate-700">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 rounded-xl bg-white px-5 py-3 text-xs font-medium text-slate-500">
            Documents may vary based on lender, applicant profile and loan type. We help you organise the exact set required by your chosen lender.
          </p>
        </div>
      </section>

      {/* Enquiry + FAQ */}
      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="h2">Apply for {service.title}</h2>
            <p className="lead mt-4">
              Share your requirement and our team will get in touch to guide you on suitable options.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/apply" className="btn-accent">
                Start Full Application
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <a href="tel:+918796629912" className="btn-outline">
                <Icon name="phone" className="h-4 w-4" /> Talk to an Expert
              </a>
            </div>
            <div className="mt-8">
              <EnquiryCard compact />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="h2">FAQs</h2>
            <FAQ items={service.faqs} className="mt-6" />
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-brand-mist py-16 lg:py-20">
        <div className="container-x">
          <SectionHeader eyebrow="Explore More" title="Other Services" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70} as="article">
                <Link
                  to={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-brand-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-royal text-white">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-brand-navy">{s.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent">
                    Learn More
                    <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
