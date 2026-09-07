import { useState, type FormEvent } from "react";
import Icon from "./Icon";
import { loanTypes, employmentTypes } from "../data/site";
import { isEmail, isIndianMobile, required } from "../lib/validate";
import { submitToApi } from "../lib/api";

interface Errors {
  [k: string]: string | undefined;
}

const steps = ["Personal", "Loan", "Details", "Review"] as const;

const initial = {
  name: "",
  mobile: "",
  email: "",
  city: "",
  loanType: "",
  amount: "",
  tenure: "",
  employment: "",
  income: "",
  existingLoan: "No",
  purpose: "",
  message: "",
};

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validateStep(): boolean {
    const e: Errors = {};
    if (step === 0) {
      if (!required(form.name)) e.name = "Required";
      if (!required(form.mobile)) e.mobile = "Required";
      else if (!isIndianMobile(form.mobile)) e.mobile = "Enter a valid 10-digit Indian mobile";
      if (!required(form.email)) e.email = "Required";
      else if (!isEmail(form.email)) e.email = "Enter a valid email";
      if (!required(form.city)) e.city = "Required";
    }
    if (step === 1) {
      if (!required(form.loanType)) e.loanType = "Required";
      if (!required(form.amount)) e.amount = "Required";
      if (!required(form.tenure)) e.tenure = "Required";
      if (!required(form.employment)) e.employment = "Required";
    }
    if (step === 2) {
      if (!required(form.income)) e.income = "Required";
      if (!required(form.purpose)) e.purpose = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next(ev: FormEvent) {
    ev.preventDefault();
    if (validateStep()) setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }
  async function submit(ev: FormEvent) {
    ev.preventDefault();
    if (!validateStep()) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      await submitToApi("/api/applications", form);
      setDone(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit your application right now");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="card flex flex-col items-center p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-brand-navy">Thank you. Your enquiry has been received.</h3>
        <p className="mt-3 max-w-md text-sm text-slate-600">
          Our team will contact you shortly to understand your requirement and guide you on the next steps.
          Loan approval is subject to the respective lender's policies and eligibility.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card p-6 sm:p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    i < step
                      ? "bg-brand-green text-white"
                      : i === step
                      ? "bg-brand-navy text-white"
                      : "bg-brand-mist text-slate-400"
                  }`}
                >
                  {i < step ? <Icon name="check" className="h-4 w-4" /> : i + 1}
                </span>
                <span className={`mt-1.5 text-[0.7rem] font-semibold ${i <= step ? "text-brand-navy" : "text-slate-400"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-2 h-0.5 flex-1 rounded-full bg-brand-mist">
                  <div className={`h-full rounded-full bg-brand-green transition-all duration-300 ${i < step ? "w-full" : "w-0"}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {step === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" error={errors.name}>
            <input className="input" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
          </Field>
          <Field label="Mobile Number" error={errors.mobile}>
            <input className="input" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="10-digit mobile" inputMode="numeric" maxLength={13} />
          </Field>
          <Field label="Email" error={errors.email}>
            <input className="input" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
          </Field>
          <Field label="City" error={errors.city}>
            <input className="input" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Your city" />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Loan Type" error={errors.loanType}>
            <select className="input" value={form.loanType} onChange={(e) => update("loanType", e.target.value)}>
              <option value="">Select loan type</option>
              {loanTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Amount Required" error={errors.amount}>
            <input className="input" value={form.amount} onChange={(e) => update("amount", e.target.value)} placeholder="e.g. 25,00,000" inputMode="numeric" />
          </Field>
          <Field label="Preferred Tenure" error={errors.tenure}>
            <input className="input" value={form.tenure} onChange={(e) => update("tenure", e.target.value)} placeholder="e.g. 15 years" />
          </Field>
          <Field label="Employment Type" error={errors.employment}>
            <select className="input" value={form.employment} onChange={(e) => update("employment", e.target.value)}>
              <option value="">Select employment type</option>
              {employmentTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Monthly Income" error={errors.income}>
            <input className="input" value={form.income} onChange={(e) => update("income", e.target.value)} placeholder="e.g. 80,000" inputMode="numeric" />
          </Field>
          <Field label="Existing Loan">
            <select className="input" value={form.existingLoan} onChange={(e) => update("existingLoan", e.target.value)}>
              <option>No</option>
              <option>Yes</option>
            </select>
          </Field>
          <Field label="Purpose" error={errors.purpose} className="sm:col-span-2">
            <input className="input" value={form.purpose} onChange={(e) => update("purpose", e.target.value)} placeholder="e.g. Purchase a home, business expansion..." />
          </Field>
          <Field label="Message" className="sm:col-span-2">
            <textarea className="input min-h-[80px] resize-y" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Anything else we should know (optional)" />
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-brand-navy">Review your details</h3>
          <div className="grid gap-3 rounded-2xl border border-brand-line bg-brand-mist/50 p-5 sm:grid-cols-2">
            <ReviewItem label="Name" value={form.name} />
            <ReviewItem label="Mobile" value={form.mobile} />
            <ReviewItem label="Email" value={form.email} />
            <ReviewItem label="City" value={form.city} />
            <ReviewItem label="Loan Type" value={form.loanType} />
            <ReviewItem label="Amount" value={form.amount} />
            <ReviewItem label="Tenure" value={form.tenure} />
            <ReviewItem label="Employment" value={form.employment} />
            <ReviewItem label="Monthly Income" value={form.income} />
            <ReviewItem label="Existing Loan" value={form.existingLoan} />
            <ReviewItem label="Purpose" value={form.purpose} />
          </div>
          <p className="text-xs text-slate-500">
            By submitting, you confirm the information is accurate to the best of your knowledge. Loan approval
            is subject to the lender's eligibility, documentation and policies.
          </p>
        </div>
      )}

      {submitError && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-center text-xs font-medium text-red-600">{submitError}</p>}
      <div className="mt-7 flex items-center justify-between gap-3">
        <button type="button" onClick={back} disabled={step === 0 || submitting} className="btn-outline">
          Back
        </button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="btn-primary">
            Continue
            <Icon name="arrow" className="h-4 w-4" />
          </button>
        ) : (
          <button type="submit" disabled={submitting} className="btn-accent">
            {submitting ? "Submitting..." : "Submit Application"}
            {!submitting && <Icon name="check" className="h-4 w-4" />}
          </button>
        )}
      </div>
    </form>
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

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-brand-navy">{value || "—"}</div>
    </div>
  );
}
