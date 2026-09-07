import { useMemo, useState } from "react";
import { formatINR, formatNumber } from "../lib/validate";
import Icon from "./Icon";

export default function LoanCalculator() {
  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(20);

  const { emi, totalInterest, totalPayable, principalPct } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const emiVal = r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emiVal * n;
    const interest = total - amount;
    return {
      emi: Math.round(emiVal),
      totalInterest: Math.round(interest),
      totalPayable: Math.round(total),
      principalPct: Math.round((amount / total) * 100),
    };
  }, [amount, rate, tenure]);

  const interestPct = 100 - principalPct;

  return (
    <div className="grid gap-6 rounded-3xl border border-brand-line bg-white p-6 shadow-card sm:p-8 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        <RangeField
          label="Loan Amount"
          value={amount}
          min={100000}
          max={50000000}
          step={50000}
          onChange={setAmount}
          display={formatINR(amount)}
        />
        <RangeField
          label="Interest Rate (p.a.)"
          value={rate}
          min={4}
          max={24}
          step={0.05}
          onChange={setRate}
          display={`${rate.toFixed(2)}%`}
        />
        <RangeField
          label="Tenure"
          value={tenure}
          min={1}
          max={30}
          step={1}
          onChange={setTenure}
          display={`${tenure} Years`}
        />
      </div>

      <div className="lg:col-span-2">
        <div className="flex h-full flex-col rounded-2xl bg-navy-gradient p-6 text-white">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/70">
            <Icon name="calculator" className="h-4 w-4" /> Estimated EMI
          </div>
          <div className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            {formatINR(emi)}
            <span className="text-base font-semibold text-white/60"> /month</span>
          </div>

          {/* Donut */}
          <div className="mt-6 flex items-center gap-5">
            <div className="relative h-28 w-28 shrink-0">
              <svg viewBox="0 0 36 36" className="h-28 w-28 -rotate-90">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#F58220"
                  strokeWidth="4"
                  strokeDasharray={`${principalPct} ${100 - principalPct}`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#1FA372"
                  strokeWidth="4"
                  strokeDasharray={`${interestPct} ${100 - interestPct}`}
                  strokeDashoffset={`-${principalPct}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[0.6rem] uppercase tracking-wider text-white/60">Principal</span>
                <span className="text-sm font-bold">{principalPct}%</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <Legend color="#F58220" label="Principal" value={formatINR(amount)} />
              <Legend color="#1FA372" label="Total Interest" value={formatINR(totalInterest)} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/15 pt-5 text-sm">
            <div>
              <div className="text-white/60">Principal</div>
              <div className="font-semibold">{formatNumber(amount)}</div>
            </div>
            <div>
              <div className="text-white/60">Total Interest</div>
              <div className="font-semibold">{formatNumber(totalInterest)}</div>
            </div>
            <div className="col-span-2">
              <div className="text-white/60">Total Amount Payable</div>
              <div className="font-display text-lg font-bold text-brand-orange">{formatINR(totalPayable)}</div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-slate-500 lg:col-span-5">
        This calculator provides an illustrative estimate only. Actual EMI, interest rate, tenure and
        eligibility may vary based on the lender, your profile and prevailing policies.
      </p>
    </div>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-brand-navy">{label}</label>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-32 rounded-lg border border-brand-line px-3 py-1.5 text-right text-sm font-semibold text-brand-navy outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
        />
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full"
        aria-label={label}
      />
      <div className="mt-1.5 flex justify-between text-xs text-slate-400">
        <span>{formatNumber(min)}</span>
        <span className="font-semibold text-brand-royal">{display}</span>
        <span>{formatNumber(max)}</span>
      </div>
    </div>
  );
}

function Legend({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full" style={{ background: color }} />
      <span className="text-white/70">{label}</span>
      <span className="ml-auto font-semibold">{value}</span>
    </div>
  );
}
