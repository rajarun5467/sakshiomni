import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import ServiceCard from "../components/ServiceCard";
import LoanCalculator from "../components/LoanCalculator";
import EnquiryCard from "../components/EnquiryCard";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import TestimonialsSlider from "../components/TestimonialsSlider";
import Icon from "../components/Icon";
import { company, lenders, lenderDisclaimer } from "../data/site";
import { serviceSummaries } from "../data/services";
import { whyChoose, howItWorks, homeFaqs } from "../data/content";
import { testimonials } from "../data/testimonials";
import heroImage from "../assets/hero.png";

function HeroLoanCard({
  icon,
  label,
  color,
  className,
  image,
}: {
  icon: string;
  label: string;
  color: "navy" | "orange" | "green" | "blue";
  className: string;
  image?: string;
}) {
  const colors = {
    navy: "bg-brand-navy",
    orange: "bg-brand-orange",
    green: "bg-brand-green",
    blue: "bg-brand-royal",
  };

  if (image) {
    return (
      <div className={`absolute z-20 animate-float ${className}`}>
        <div className="relative h-16 w-24 overflow-hidden rounded-xl border border-white/35 bg-brand-blue shadow-card sm:h-24 sm:w-40 sm:rounded-2xl md:h-20 md:w-32">
          <img
            src={image}
            alt="Modern home property"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 via-transparent to-white/10" />
        </div>
        <div className="relative -mt-1 ml-1 flex w-fit items-center gap-1.5 rounded-lg border border-brand-line bg-white px-2 py-2 shadow-card sm:-mt-2 sm:ml-4 sm:gap-2 sm:rounded-xl sm:px-4 sm:py-3 md:px-3 md:py-2.5">
          <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-white sm:h-8 sm:w-8 ${colors[color]}`}>
            <Icon name={icon} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="whitespace-nowrap text-[0.62rem] font-bold text-brand-navy sm:text-sm">{label}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute z-20 flex items-center gap-2 rounded-xl border border-white/30 bg-white px-3 py-2.5 shadow-card animate-float sm:gap-2.5 sm:px-4 sm:py-3 ${className}`}>
      <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-white ${colors[color]}`}>
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <span className="whitespace-nowrap text-[0.68rem] font-bold text-brand-navy sm:text-xs">{label}</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="Sakshionmi Group | Home Loan, Property Loan & Business Finance"
        description="Sakshionmi Group provides professional assistance for home loans, property loans, business loans, OD/CC limits, industrial loans and property sale & purchase."
        path="/"
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071b46] pt-20 text-white sm:pt-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid [background-size:22px_22px] opacity-25" />
        <div className="pointer-events-none absolute -right-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-brand-accent/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-brand-green/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-brand-blue/60 to-transparent" />

        <div className="container-x relative grid min-h-0 items-center gap-8 pb-10 pt-6 sm:gap-10 sm:pb-12 sm:pt-8 md:min-h-[520px] md:grid-cols-12 md:gap-3 lg:min-h-[590px] lg:gap-2 lg:pb-16 lg:pt-8">
          {/* Copy */}
          <div className="relative z-10 md:col-span-6 lg:col-span-6">
            <Reveal>
              <span className="eyebrow border-white/20 bg-white/10 text-white">
                <Icon name="shield" className="h-3.5 w-3.5" />
                {company.tagline}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-5xl xl:text-[4.15rem]">
                Financial Solutions
                <br />
                Designed Around Your
                <br />
                <span className="relative inline-block text-brand-orange">
                  Goals
                  <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-brand-orange/80" />
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                Get expert assistance for home loans, property loans, business finance, OD/CC limits and
                industrial loans — with a simple, transparent and hassle-free process.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link to="/apply" className="btn-accent px-7 py-3.5 text-sm sm:text-base">
                  Apply for Loan
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <a href={`tel:${company.primaryPhone}`} className="btn-ghost-light px-7 py-3.5 text-sm sm:text-base">
                  <Icon name="phone" className="h-4 w-4" />
                  Talk to an Expert
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70 sm:text-sm">
                <span className="flex items-center gap-1.5"><Icon name="clock" className="h-4 w-4 text-brand-green" /> Fast assistance</span>
                <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
                <span className="flex items-center gap-1.5"><Icon name="chart" className="h-4 w-4 text-brand-orange" /> Multiple financing options</span>
                <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
                <span className="flex items-center gap-1.5"><Icon name="users" className="h-4 w-4 text-brand-accent" /> Expert guidance</span>
              </div>
            </Reveal>
          </div>

          {/* Fintech visual */}
          <div className="relative z-10 md:col-span-6 lg:col-span-6">
            <Reveal delay={180} className="relative">
              <div className="relative mx-auto h-[320px] w-full max-w-[430px] sm:h-[420px] sm:max-w-[520px] md:h-[460px] md:max-w-[540px] lg:h-[535px] lg:max-w-[560px]">
                <div className="absolute inset-x-12 bottom-4 top-3 overflow-hidden rounded-[1.5rem] border border-white/20 bg-brand-blue/30 shadow-[0_25px_80px_-25px_rgba(0,0,0,0.65)] backdrop-blur-sm sm:inset-x-20 sm:rounded-[2rem] md:inset-x-24 lg:inset-x-28">
                  <img
                    src={heroImage}
                    alt="Sakshionmi Group financial advisor holding a laptop"
                    className="absolute bottom-0 left-1/2 h-[128%] w-[145%] max-w-none -translate-x-1/2 object-contain object-bottom sm:h-[132%] sm:w-[150%] md:h-[124%] md:w-[140%] lg:h-[132%] lg:w-[150%]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071b46] via-transparent to-brand-accent/20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#071b46]/70 via-transparent to-transparent" />
                </div>

                {/* Floating loan cards */}
                <HeroLoanCard
                  icon="home"
                  label="Home Loan"
                  color="navy"
                  image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=160&q=80"
                  className="!z-30 left-0 top-0 sm:left-2 sm:top-10"
                />
                <HeroLoanCard
                  icon="briefcase"
                  label="Business Loan"
                  color="orange"
                  image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=240&q=80"
                  className="!z-30 right-0 top-4 sm:right-0 sm:top-16"
                />
                <HeroLoanCard
                  icon="building"
                  label="Property Loan"
                  color="green"
                  image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=240&q=80"
                  className="bottom-24 left-0 sm:left-2"
                />
                <HeroLoanCard
                  icon="factory"
                  label="Industrial Loan"
                  color="blue"
                  image="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=240&q=80"
                  className="bottom-10 right-0 sm:right-0"
                />

                {/* Decorative finance line */}
                <div className="pointer-events-none absolute bottom-5 left-1/2 h-16 w-[90%] -translate-x-1/2 rotate-[-5deg] rounded-[50%] border-t-2 border-brand-accent/80 shadow-[0_-10px_30px_rgba(47,107,224,0.45)]" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* QUICK ENQUIRY */}
      <section className="relative z-10 bg-white pb-16 lg:pb-24">
        <div className="container-x -mt-8 lg:-mt-12">
          <Reveal>
            <EnquiryCard />
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-16 lg:py-24">
        <SectionHeader
          eyebrow="What We Offer"
          title="Financial Solutions for Every Need"
          subtitle="From home and property loans to business finance and industrial funding — explore assistance across categories."
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

      {/* WHY CHOOSE US */}
      <section className="bg-brand-mist py-16 lg:py-24">
        <div className="container-x">
          <SectionHeader
            eyebrow="Why Sakshionmi"
            title="Why Choose Sakshionmi Group?"
            subtitle="A customer-first advisory approach with clear communication at every step."
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

      {/* HOW IT WORKS */}
      <section className="container-x py-16 lg:py-24">
        <SectionHeader
          eyebrow="Process"
          title="How It Works"
          subtitle="A simple, guided process from your first enquiry to the lender's decision."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((s, i) => (
            <Reveal key={s.no} delay={i * 90} as="article">
              <div className="relative h-full rounded-2xl border border-brand-line bg-white p-6 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-royal font-display text-lg font-bold text-white">
                  {s.no}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-brand-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
                {i < howItWorks.length - 1 && (
                  <Icon name="arrow" className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-brand-line lg:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl rounded-xl bg-brand-mist px-5 py-3 text-center text-xs leading-relaxed text-slate-500">
          {lenderDisclaimer}
        </p>
      </section>

      {/* LOAN CALCULATOR */}
      <section className="bg-brand-mist py-16 lg:py-24">
        <div className="container-x">
          <SectionHeader
            eyebrow="EMI Calculator"
            title="Plan Your Loan With an EMI Calculator"
            subtitle="Adjust the amount, rate and tenure to get an illustrative monthly EMI estimate."
          />
          <Reveal className="mt-12">
            <LoanCalculator />
          </Reveal>
        </div>
      </section>

      {/* LENDERS */}
      <section className="container-x py-16 lg:py-24">
        <SectionHeader
          eyebrow="Financing Options"
          title="Explore Financing Options From Leading Financial Institutions"
          subtitle="We help you explore options across banks and NBFCs based on your profile and requirement."
        />
        <Reveal className="mt-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {lenders.map((l) => (
              <div
                key={l.name}
                className="flex flex-col items-center justify-center rounded-2xl border border-brand-line bg-white px-4 py-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-card"
              >
                <span className="font-display text-base font-bold text-brand-navy">{l.name}</span>
                <span className="mt-1 text-xs text-slate-500">{l.note}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <p className="mx-auto mt-8 max-w-3xl rounded-xl bg-brand-mist px-5 py-3 text-center text-xs leading-relaxed text-slate-500">
          {lenderDisclaimer}
        </p>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-brand-mist py-16 lg:py-24">
        <div className="container-x">
          <SectionHeader
            eyebrow="Customer Voices"
            title="What Our Customers Say"
            subtitle="Real experiences from customers we've helped with their financial requirements."
          />
          <div className="mt-12">
            <TestimonialsSlider items={testimonials} autoPlay intervalMs={4000} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-16 lg:py-24">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Quick answers to common questions about our services and the loan process."
        />
        <FAQ items={homeFaqs} className="mt-12" />
      </section>

      <CTA />
    </>
  );
}
