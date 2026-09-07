import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import ServiceCard from "../components/ServiceCard";
import LoanCalculator from "../components/LoanCalculator";
import CTA from "../components/CTA";
import Reveal from "../components/Reveal";
import { serviceSummaries } from "../data/services";
import { howItWorks, whyChoose } from "../data/content";
import { lenderDisclaimer } from "../data/site";

export default function Services() {
  return (
    <>
      <Seo
        title="Our Services | Sakshionmi Group"
        description="Explore home loans, property loans, business loans, OD/CC limits, industrial loans and property sale & purchase assistance from Sakshionmi Group."
        path="/services"
      />
      <PageHero
        eyebrow="Our Services"
        title="Financial Solutions for Every Need"
        subtitle="Professional assistance across loans and property — designed to keep your financing journey simple and transparent."
        icon="sparkles"
      />

      <section className="container-x py-16 lg:py-24">
        <SectionHeader
          eyebrow="Loan & Property Services"
          title="Explore Our Service Categories"
          subtitle="Select a service to view details, eligibility, documents and process."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceSummaries.map((s, i) => (
            <ServiceCard key={s.slug} slug={s.slug} title={s.title} description={s.short} icon={s.icon} delay={i * 70} />
          ))}
          <ServiceCard
            to="/property"
            title="Property Sale & Purchase"
            description="End-to-end assistance for property sale and purchase opportunities."
            icon="sale-purchase"
            delay={5 * 70}
          />
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-brand-mist py-16 lg:py-24">
        <div className="container-x">
          <SectionHeader
            eyebrow="Why Sakshionmi"
            title="A Customer-First Advisory Approach"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w, i) => (
              <Reveal key={w.no} delay={i * 70} as="article">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-brand-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <span className="font-display text-5xl font-extrabold text-brand-mist transition-colors group-hover:text-brand-accent/20">{w.no}</span>
                  <h3 className="mt-3 font-display text-lg font-bold text-brand-navy">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-x py-16 lg:py-24">
        <SectionHeader eyebrow="Process" title="How It Works" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((s, i) => (
            <Reveal key={s.no} delay={i * 90} as="article">
              <div className="relative h-full rounded-2xl border border-brand-line bg-white p-6 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-royal font-display text-lg font-bold text-white">{s.no}</span>
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

      {/* Calculator */}
      <section className="bg-brand-mist py-16 lg:py-24">
        <div className="container-x">
          <SectionHeader eyebrow="EMI Calculator" title="Estimate Your Monthly EMI" />
          <Reveal className="mt-12">
            <LoanCalculator />
          </Reveal>
        </div>
      </section>

      <CTA
        title="Not sure which loan suits you?"
        subtitle="Share your requirement and our team will help you identify suitable financing options."
        primaryLabel="Apply for Loan"
        secondaryLabel="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}
