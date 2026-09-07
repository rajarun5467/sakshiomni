import { useState, type FormEvent } from "react";
import Icon from "./Icon";
import { company, loanTypes, employmentTypes } from "../data/site";
import { isEmail, isIndianMobile, required } from "../lib/validate";

interface Errors {
  [k: string]: string | undefined;
}

const initial = {
  name: "",
  mobile: "",
  email: "",
  loanType: "",
  amount: "",
  city: "",
  employment: "",
  message: "",
};

const trustBadges = [
  { icon: "clock", text: "Quick response" },
  { icon: "shield", text: "Your data is safe" },
  { icon: "chat", text: "No documents needed" },
];

export default function EnquiryCard({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!required(form.name)) e.name = "Please enter your full name";
    if (!required(form.mobile)) e.mobile = "Please enter your mobile number";
    else if (!isIndianMobile(form.mobile)) e.mobile = "Enter a valid 10-digit Indian mobile number";
    if (!required(form.email)) e.email = "Please enter your email";
    else if (!isEmail(form.email)) e.email = "Enter a valid email address";
    if (!required(form.loanType)) e.loanType = "Please select a loan type";
    if (!required(form.amount)) e.amount = "Please enter the required loan amount";
    if (!required(form.city)) e.city = "Please enter your city";
    if (!required(form.employment)) e.employment = "Please select employment type";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (validate()) {
      // Backend-ready: replace with API call (e.g. POST /api/enquiry)
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card">
        <div className="flex flex-col items-center px-6 py-14 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/15 text-brand-green animate-fade-up">
            <Icon name="check" className="h-8 w-8" />
          </span>
          <h3 className="mt-5 font-display text-2xl font-bold text-brand-navy">Thank you!</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
            Your enquiry has been received. Our team will contact you shortly to understand your requirement
            and guide you on suitable financing options.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${company.primaryPhone}`} className="btn-primary">
              <Icon name="phone" className="h-4 w-4" /> Call Now
            </a>
            <a href={company.social.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-green">
              <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
            </a>
          </div>
          <button
            type="button"
            onClick={() => {
              setForm(initial);
              setSubmitted(false);
            }}
            className="mt-5 text-sm font-semibold text-brand-accent hover:underline"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card ${
        compact ? "" : "lg:grid lg:grid-cols-12"
      }`}
    >
      {/* Left info panel — only on non-compact / large screens */}
      {!compact && (
        <div className="relative hidden overflow-hidden bg-navy-gradient p-8 text-white lg:col-span-4 lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-accent/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-brand-green/20 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]">
              <Icon name="sparkles" className="h-3.5 w-3.5" /> Quick Enquiry
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold leading-tight">
              Tell Us What You Need
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Share your requirement and our team will get in touch to help you explore suitable financing
              options — no documents needed at this stage.
            </p>
          </div>

          <div className="relative mt-8 space-y-3">
            {trustBadges.map((b) => (
              <div key={b.text} className="flex items-center gap-3 text-sm text-white/85">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  <Icon name={b.icon} className="h-5 w-5" />
                </span>
                {b.text}
              </div>
            ))}
          </div>

          <div className="relative mt-8 border-t border-white/15 pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Prefer to talk?</p>
            <div className="mt-3 flex flex-col gap-2">
              <a href={`tel:${company.people[0].tel}`} className="flex items-center gap-2.5 text-sm font-semibold text-white hover:text-brand-orange">
                <Icon name="phone" className="h-4 w-4 text-brand-orange" />
                {company.people[0].name} — {company.people[0].phone}
              </a>
              <a href={`tel:${company.people[1].tel}`} className="flex items-center gap-2.5 text-sm font-semibold text-white hover:text-brand-green">
                <Icon name="phone" className="h-4 w-4 text-brand-green" />
                {company.people[1].name} — {company.people[1].phone}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Right form panel */}
      <div className={`p-6 sm:p-8 ${compact ? "" : "lg:col-span-8"}`}>
        {/* Mobile header (compact mode or small screens) */}
        <div className="mb-5 flex items-center gap-3 lg:hidden">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange to-brand-orangeDark text-white shadow-soft">
            <Icon name="sparkles" className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-brand-navy">Tell Us What You Need</h3>
            <p className="text-xs text-slate-500">Quick enquiry — no documents needed at this stage.</p>
          </div>
        </div>

        {/* Desktop header (non-compact only) */}
        {!compact && (
          <div className="mb-6 hidden lg:block">
            <h3 className="font-display text-xl font-bold text-brand-navy">Share Your Requirement</h3>
            <p className="mt-1 text-sm text-slate-500">Fill in the details below and we'll get back to you.</p>
          </div>
        )}

        <form onSubmit={onSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" error={errors.name} icon="users">
              <input className="input pl-10" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
            </Field>
            <Field label="Mobile Number" error={errors.mobile} icon="phone">
              <input
                className="input pl-10"
                value={form.mobile}
                onChange={(e) => update("mobile", e.target.value)}
                placeholder="10-digit mobile"
                inputMode="numeric"
                maxLength={13}
              />
            </Field>
            <Field label="Email" error={errors.email} icon="mail">
              <input className="input pl-10" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" type="email" />
            </Field>
            <Field label="Loan Type" error={errors.loanType} icon="briefcase">
              <select className="input pl-10" value={form.loanType} onChange={(e) => update("loanType", e.target.value)}>
                <option value="">Select loan type</option>
                {loanTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Required Loan Amount" error={errors.amount} icon="rupee">
              <input className="input pl-10" value={form.amount} onChange={(e) => update("amount", e.target.value)} placeholder="e.g. 25,00,000" inputMode="numeric" />
            </Field>
            <Field label="City" error={errors.city} icon="pin">
              <input className="input pl-10" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Your city" />
            </Field>
            <Field label="Employment Type" error={errors.employment} icon="briefcase" className="sm:col-span-2">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {employmentTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => update("employment", t)}
                    className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${
                      form.employment === t
                        ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                        : "border-brand-line bg-white text-slate-600 hover:border-brand-accent/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Message" error={errors.message} className="sm:col-span-2">
              <textarea className="input min-h-[80px] resize-y" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us a bit about your requirement (optional)" />
            </Field>
          </div>

          <button type="submit" className="btn-accent mt-6 w-full py-3.5 text-base">
            Get Expert Assistance
            <Icon name="arrow" className="h-4 w-4" />
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
            {trustBadges.map((b) => (
              <span key={b.text} className="flex items-center gap-1.5">
                <Icon name={b.icon} className="h-3.5 w-3.5 text-brand-green" />
                {b.text}
              </span>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">
            By submitting, you agree to be contacted regarding your enquiry. We respect your privacy.
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
  icon,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  icon?: string;
}) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      <div className="relative">
        {icon && (
          <Icon
            name={icon}
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          />
        )}
        {children}
      </div>
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
