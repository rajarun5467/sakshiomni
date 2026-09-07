import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Breadcrumb from "../components/Breadcrumb";
import SectionHeader from "../components/SectionHeader";
import TeamCard from "../components/TeamCard";
import Reveal from "../components/Reveal";
import CTA from "../components/CTA";
import Icon from "../components/Icon";
import { company } from "../data/site";
import { whyChoose } from "../data/content";

const values = [
  { icon: "shield", title: "Customer-First Approach", text: "Every recommendation starts with what's right for the customer's requirement." },
  { icon: "users", title: "Professional Guidance", text: "Experienced professionals who understand lending across categories." },
  { icon: "chat", title: "Transparent Communication", text: "Clear, honest communication at every stage — no hidden surprises." },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us | Sakshionmi Group"
        description="Sakshionmi Group is an independent financial advisory service helping customers navigate loans and property-related financial decisions with confidence."
        path="/about"
      />
      <PageHero
        eyebrow="About Us"
        title="Helping Customers Navigate Financial Decisions With Confidence"
        subtitle="Sakshionmi Group provides financial advisory and assistance for loan and property-related requirements — with a transparent, customer-first approach."
        icon="users"
      />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "About Us" }]} />

      {/* Story */}
      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow"><Icon name="sparkles" className="h-3.5 w-3.5" /> Our Story</span>
            <h2 className="mt-4 h2">A Trusted Financial Advisory Partner</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              <p>
                {company.name} is an independent financial advisory service based in Greater Noida West,
                Uttar Pradesh. We assist individuals, professionals and businesses with home loans,
                property loans, business loans, OD/CC limits, industrial loans and property sale & purchase.
              </p>
              <p>
                We are not a bank or a lender. Instead, we help customers understand and explore financing
                options available through various banks, NBFCs and financial institutions, based on their
                profile and requirement.
              </p>
              <p>
                Our role is to make the process simpler — from the first conversation to documentation and
                application — so customers can make informed financial decisions with confidence.
              </p>
            </div>
            <p className="mt-6 font-display text-lg font-bold text-brand-orange">{company.tagline}</p>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-soft">
                  <Icon name="handshake" className="h-8 w-8 text-brand-accent" />
                  <h3 className="mt-3 font-display text-base font-bold text-brand-navy">Advisory, Not Lending</h3>
                  <p className="mt-1 text-xs text-slate-500">We guide — the lender decides.</p>
                </div>
                <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-soft">
                  <Icon name="chart" className="h-8 w-8 text-brand-green" />
                  <h3 className="mt-3 font-display text-base font-bold text-brand-navy">Multiple Options</h3>
                  <p className="mt-1 text-xs text-slate-500">Banks & NBFCs explored.</p>
                </div>
                <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-soft">
                  <Icon name="doc" className="h-8 w-8 text-brand-orange" />
                  <h3 className="mt-3 font-display text-base font-bold text-brand-navy">Guided Process</h3>
                  <p className="mt-1 text-xs text-slate-500">From enquiry to application.</p>
                </div>
                <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-soft">
                  <Icon name="building" className="h-8 w-8 text-brand-royal" />
                  <h3 className="mt-3 font-display text-base font-bold text-brand-navy">Property Too</h3>
                  <p className="mt-1 text-xs text-slate-500">Sale & purchase support.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-brand-mist py-16 lg:py-24">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal as="article">
            <div className="h-full rounded-2xl border border-brand-line bg-white p-8 shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-royal text-white">
                <Icon name="sparkles" className="h-6 w-6" />
              </span>
              <h3 className="mt-4 h3">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                To help customers navigate financial decisions with confidence by providing clear, honest and
                personalized assistance across loans and property — without making false promises.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} as="article">
            <div className="h-full rounded-2xl border border-brand-line bg-white p-8 shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green to-brand-greenDark text-white">
                <Icon name="globe" className="h-6 w-6" />
              </span>
              <h3 className="mt-4 h3">Our Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                To be a trusted financial advisory partner that customers rely on for transparent guidance —
                making financing and property decisions simpler, clearer and stress-free.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="container-x py-16 lg:py-24">
        <SectionHeader eyebrow="What We Stand For" title="Our Values" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80} as="article">
              <div className="h-full rounded-2xl border border-brand-line bg-white p-6 text-center shadow-soft">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-mist text-brand-royal">
                  <Icon name={v.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-brand-navy">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-brand-mist py-16 lg:py-24">
        <div className="container-x">
          <SectionHeader eyebrow="Why Sakshionmi" title="Why Customers Choose Us" />
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

      {/* Team */}
      <section className="container-x py-16 lg:py-24">
        <SectionHeader
          eyebrow="Our Team"
          title="Meet the People Behind Sakshionmi"
          subtitle="Reach out directly to our team for personalized assistance."
        />
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {company.people.map((p, i) => (
            <TeamCard key={p.tel} person={p} delay={i * 100} />
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-slate-500">
          We do not display invented qualifications, years of experience or certifications. Reach out to our
          team directly to learn more about how we can help.
        </p>
      </section>

      <CTA />
    </>
  );
}
