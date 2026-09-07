import { useState, type FormEvent } from "react";
import Icon from "./Icon";
import { isEmail, isIndianMobile, required } from "../lib/validate";
import { submitToApi } from "../lib/api";

const initial = { name: "", mobile: "", email: "", message: "" };

type Errors = Record<string, string | undefined>;

export default function ContactMessageForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function update(key: keyof typeof initial, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitError("");
  }

  function validate() {
    const next: Errors = {};
    if (!required(form.name)) next.name = "Please enter your name";
    if (!required(form.mobile)) next.mobile = "Please enter your mobile number";
    else if (!isIndianMobile(form.mobile)) next.mobile = "Enter a valid 10-digit Indian mobile number";
    if (!required(form.email)) next.email = "Please enter your email";
    else if (!isEmail(form.email)) next.email = "Enter a valid email address";
    if (!required(form.message)) next.message = "Please enter your message";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      await submitToApi("/api/contact-messages", form);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to send your message right now");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card flex flex-col items-center p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-brand-navy">Message sent successfully</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Thank you for reaching out. Our team will contact you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(initial);
            setSubmitted(false);
          }}
          className="btn-outline mt-5"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy text-white shadow-soft">
          <Icon name="mail" className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold text-brand-navy">Tell Us How We Can Help</h3>
          <p className="text-xs text-slate-500">We usually respond to enquiries shortly.</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name} icon="users">
          <input className="input pl-10" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
        </Field>
        <Field label="Mobile Number" error={errors.mobile} icon="phone">
          <input className="input pl-10" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="10-digit mobile" inputMode="numeric" maxLength={13} />
        </Field>
        <Field label="Email" error={errors.email} icon="mail" className="sm:col-span-2">
          <input className="input pl-10" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
        </Field>
        <Field label="Message" error={errors.message} className="sm:col-span-2" icon="chat">
          <textarea className="input min-h-[120px] resize-y" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="How can we help you?" />
        </Field>
      </div>

      {submitError && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-center text-xs font-medium text-red-600">{submitError}</p>}
      <button type="submit" disabled={submitting} className="btn-accent mt-5 w-full">
        {submitting ? "Sending..." : "Send Message"}
        {!submitting && <Icon name="arrow" className="h-4 w-4" />}
      </button>
      <p className="mt-3 text-center text-xs text-slate-400">Your information will only be used to respond to your enquiry.</p>
    </form>
  );
}

function Field({ label, error, children, className = "", icon }: { label: string; error?: string; children: React.ReactNode; className?: string; icon: string }) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      <div className="relative">
        <Icon name={icon} className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        {children}
      </div>
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
