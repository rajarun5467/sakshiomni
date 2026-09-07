import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Breadcrumb from "../components/Breadcrumb";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import EnquiryCard from "../components/EnquiryCard";
import Icon from "../components/Icon";
import { company } from "../data/site";

export default function Contact() {
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(company.mapsQuery)}&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapsQuery)}`;

  return (
    <>
      <Seo
        title="Contact Us | Sakshionmi Group"
        description="Contact Sakshionmi Group for home loans, property loans, business loans, OD/CC limits, industrial loans and property sale & purchase assistance."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact Us"
        title="Get in Touch With Our Team"
        subtitle="Have a question or a financing requirement? Reach out — we're here to help you explore your options."
        icon="phone"
      />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />

      {/* Contact cards */}
      <section className="container-x py-16 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal as="article">
            <a href={`tel:${company.primaryPhone}`} className="group flex h-full flex-col rounded-2xl border border-brand-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-white"><Icon name="phone" className="h-6 w-6" /></span>
              <h3 className="mt-4 font-display text-base font-bold text-brand-navy">Call Now</h3>
              <p className="mt-1 text-sm text-slate-600">{company.people[0].phone}</p>
              <p className="mt-0.5 text-sm text-slate-600">{company.people[1].phone}</p>
            </a>
          </Reveal>
          <Reveal delay={80} as="article">
            <a href={`mailto:${company.email}`} className="group flex h-full flex-col rounded-2xl border border-brand-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent text-white"><Icon name="mail" className="h-6 w-6" /></span>
              <h3 className="mt-4 font-display text-base font-bold text-brand-navy">Email Us</h3>
              <p className="mt-1 text-sm text-slate-600 break-all">{company.email}</p>
              <p className="mt-0.5 text-sm text-slate-600">{company.website}</p>
            </a>
          </Reveal>
          <Reveal delay={160} as="article">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-2xl border border-brand-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green text-white"><Icon name="pin" className="h-6 w-6" /></span>
              <h3 className="mt-4 font-display text-base font-bold text-brand-navy">Get Directions</h3>
              <p className="mt-1 text-sm text-slate-600">{company.address.line1}</p>
              <p className="text-sm text-slate-600">{company.address.line2}</p>
            </a>
          </Reveal>
          <Reveal delay={240} as="article">
            <a href="/apply" className="group flex h-full flex-col rounded-2xl border border-brand-line bg-gradient-to-br from-brand-orange to-brand-orangeDark p-6 text-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white"><Icon name="arrow" className="h-6 w-6" /></span>
              <h3 className="mt-4 font-display text-base font-bold">Apply for Loan</h3>
              <p className="mt-1 text-sm text-white/80">Start your application online.</p>
            </a>
          </Reveal>
        </div>
      </section>

      {/* People + form */}
      <section className="bg-brand-mist py-16 lg:py-24">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow"><Icon name="users" className="h-3.5 w-3.5" /> Speak Directly</span>
              <h2 className="mt-4 h2">Our Team</h2>
              <p className="lead mt-4">Reach out to our team members directly for personalized assistance.</p>
              <div className="mt-8 space-y-4">
                {company.people.map((p) => (
                  <div key={p.tel} className="flex flex-col gap-4 rounded-2xl border border-brand-line bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-royal text-lg font-bold text-white">
                        {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-display text-base font-bold text-brand-navy">{p.name}</div>
                        <div className="text-sm text-brand-accent">{p.role}</div>
                        <div className="text-sm text-slate-500">{p.phone}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a href={`tel:${p.tel}`} className="btn-primary px-4 py-2.5 text-xs"><Icon name="phone" className="h-4 w-4" /> Call</a>
                      <a href={`https://wa.me/91${p.tel.replace("+91", "")}`} target="_blank" rel="noopener noreferrer" className="btn-green px-4 py-2.5 text-xs"><Icon name="whatsapp" className="h-4 w-4" /> WhatsApp</a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-brand-line bg-white p-6 shadow-soft">
                <h3 className="h3">Office Address</h3>
                <div className="mt-3 flex gap-3 text-sm text-slate-600">
                  <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  <p>{company.address.full}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="h2">Send Us a Message</h2>
              <p className="lead mt-4">Fill in your details and requirement — we'll get back to you shortly.</p>
              <div className="mt-6">
                <EnquiryCard />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="container-x py-16 lg:py-24">
        <SectionHeader eyebrow="Find Us" title="Our Location" />
        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-3xl border border-brand-line shadow-card">
            <iframe
              title="Sakshionmi Group office location"
              src={mapsEmbed}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
