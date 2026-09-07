import { useState, type FormEvent } from "react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Breadcrumb from "../components/Breadcrumb";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import CTA from "../components/CTA";
import Icon from "../components/Icon";
import { isIndianMobile, required } from "../lib/validate";
import { submitToApi } from "../lib/api";

const offerings = [
  {
    icon: "home",
    title: "Residential Property",
    text: "Assistance for apartments, villas, plots and independent houses — for buyers and sellers.",
  },
  {
    icon: "building",
    title: "Commercial Property",
    text: "Support for shops, offices, showrooms and commercial spaces across locations.",
  },
  {
    icon: "chart",
    title: "Investment Opportunities",
    text: "Guidance on property investment opportunities based on your goals and budget.",
  },
  {
    icon: "handshake",
    title: "Buyer Assistance",
    text: "End-to-end help for buyers — from requirement understanding to documentation.",
  },
  {
    icon: "users",
    title: "Seller Assistance",
    text: "Support for sellers in connecting with prospective buyers and completing the process.",
  },
  {
    icon: "doc",
    title: "Property Requirement Enquiry",
    text: "Share your requirement and our team will get in touch to assist you further.",
  },
];

const initial = {
  name: "",
  phone: "",
  requirement: "",
  propertyType: "",
  location: "",
  budget: "",
  message: "",
};

export default function Property() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const e: Record<string, string | undefined> = {};
    if (!required(form.name)) e.name = "Please enter your name";
    if (!required(form.phone)) e.phone = "Please enter your phone number";
    else if (!isIndianMobile(form.phone)) e.phone = "Enter a valid 10-digit Indian mobile number";
    if (!required(form.requirement)) e.requirement = "Select Buy or Sell";
    if (!required(form.propertyType)) e.propertyType = "Select property type";
    if (!required(form.location)) e.location = "Please enter the location";
    if (!required(form.budget)) e.budget = "Please enter your budget";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      await submitToApi("/api/property-enquiries", form);
      setDone(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit your property enquiry right now");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Seo
        title="Property Sale & Purchase Assistance | Sakshionmi Group"
        description="End-to-end assistance for property sale and purchase — residential, commercial and investment opportunities with buyer and seller support."
        path="/property"
      />
      <PageHero
        eyebrow="Property Sale & Purchase"
        title="Property Sale & Purchase Assistance"
        subtitle="All type property sale & purchase — residential, commercial and investment opportunities, with end-to-end buyer and seller support."
        icon="sale-purchase"
      />
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Property Sale & Purchase" }]} />

      <section className="container-x py-16 lg:py-24">
        <SectionHeader
          eyebrow="What We Offer"
          title="Comprehensive Property Assistance"
          subtitle="From finding the right property to connecting sellers with serious buyers — we support both sides of the transaction."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o, i) => (
            <Reveal key={o.title} delay={i * 70} as="article">
              <div className="group h-full rounded-2xl border border-brand-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-royal text-white">
                  <Icon name={o.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-brand-navy">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Enquiry form */}
      <section className="bg-brand-mist py-16 lg:py-24">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow"><Icon name="doc" className="h-3.5 w-3.5" /> Enquiry</span>
              <h2 className="mt-4 h2">Share Your Property Requirement</h2>
              <p className="lead mt-4">
                Whether you're looking to buy or sell, share your requirement and our team will get in touch
                to understand your needs and assist you further.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Buyer & seller support",
                  "Residential, commercial & investment",
                  "Documentation guidance",
                  "Connected financing assistance",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-3 text-sm text-slate-700">
                    <Icon name="check" className="h-5 w-5 text-brand-green" /> {t}
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-brand-line bg-white p-5 text-sm text-slate-600">
                <p className="font-semibold text-brand-navy">Note</p>
                <p className="mt-1">
                  We do not publish fabricated property listings. Property requirements are handled on an
                  enquiry basis, and listings can be connected to a backend/API in the future.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              {done ? (
                <div className="card flex flex-col items-center p-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                    <Icon name="check" className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-brand-navy">Requirement received!</h3>
                  <p className="mt-2 max-w-sm text-sm text-slate-600">
                    Thank you. Our team will contact you shortly to understand your property requirement.
                  </p>
                  <button type="button" onClick={() => { setForm(initial); setDone(false); setSubmitError(""); }} className="btn-outline mt-5">
                    Submit another requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-7">
                  <h3 className="font-display text-lg font-bold text-brand-navy">Property Requirement Enquiry</h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Field label="Name" error={errors.name}>
                      <input className="input" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
                    </Field>
                    <Field label="Phone" error={errors.phone}>
                      <input className="input" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="10-digit mobile" inputMode="numeric" maxLength={13} />
                    </Field>
                    <Field label="Requirement" error={errors.requirement}>
                      <select className="input" value={form.requirement} onChange={(e) => update("requirement", e.target.value)}>
                        <option value="">Buy / Sell</option>
                        <option value="Buy">Buy</option>
                        <option value="Sell">Sell</option>
                      </select>
                    </Field>
                    <Field label="Property Type" error={errors.propertyType}>
                      <select className="input" value={form.propertyType} onChange={(e) => update("propertyType", e.target.value)}>
                        <option value="">Select type</option>
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Plot / Land</option>
                        <option>Industrial</option>
                        <option>Investment</option>
                      </select>
                    </Field>
                    <Field label="Location" error={errors.location}>
                      <input className="input" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Preferred location" />
                    </Field>
                    <Field label="Budget" error={errors.budget}>
                      <input className="input" value={form.budget} onChange={(e) => update("budget", e.target.value)} placeholder="e.g. 50,00,000" inputMode="numeric" />
                    </Field>
                    <Field label="Message" className="sm:col-span-2">
                      <textarea className="input min-h-[88px] resize-y" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Any additional details (optional)" />
                    </Field>
                  </div>
                  {submitError && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-center text-xs font-medium text-red-600">{submitError}</p>}
                  <button type="submit" disabled={submitting} className="btn-accent mt-5 w-full">
                    {submitting ? "Submitting..." : "Submit Property Requirement"}
                    {!submitting && <Icon name="arrow" className="h-4 w-4" />}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <CTA
        title="Looking to finance your property purchase?"
        subtitle="We can also assist with home loans and loans against property alongside your property requirement."
        primaryLabel="Apply for Loan"
        secondaryLabel="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}

function Field({ label, error, children, className = "" }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
