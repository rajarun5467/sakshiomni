import { useEffect, useState, type FormEvent } from "react";
import Icon from "../components/Icon";
import Logo from "../components/Logo";
import { apiRequest } from "../lib/api";

type Collection = "enquiries" | "applications" | "propertyEnquiries" | "contactMessages";
type Status = "new" | "contacted" | "in-progress" | "closed";

type Submission = {
  id: string;
  name?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  loanType?: string;
  propertyType?: string;
  requirement?: string;
  amount?: string;
  message?: string;
  status?: Status;
  createdAt: string;
  [key: string]: unknown;
};

type Summary = {
  counts: Record<string, number>;
  recent: Submission[];
};

const tabs: { key: Collection; label: string; icon: string }[] = [
  { key: "enquiries", label: "Loan Enquiries", icon: "chat" },
  { key: "applications", label: "Applications", icon: "doc" },
  { key: "propertyEnquiries", label: "Property Leads", icon: "building" },
  { key: "contactMessages", label: "Contact Messages", icon: "mail" },
];

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Collection>("enquiries");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    apiRequest<{ ok: boolean }>("/api/admin/me")
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    loadDashboard();
  }, [authenticated]);

  useEffect(() => {
    if (!authenticated) return;
    loadSubmissions(activeTab);
  }, [activeTab, authenticated]);

  async function login(event: FormEvent) {
    event.preventDefault();
    setLoginError("");
    try {
      await apiRequest("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setAuthenticated(true);
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Unable to sign in");
    }
  }

  async function logout() {
    await apiRequest("/api/admin/logout", { method: "POST" }).catch(() => undefined);
    setAuthenticated(false);
    setSummary(null);
    setSubmissions([]);
  }

  async function loadDashboard() {
    setDataError("");
    try {
      const response = await apiRequest<Summary & { ok: boolean }>("/api/admin/summary");
      setSummary(response);
    } catch (error) {
      setDataError(error instanceof Error ? error.message : "Unable to load dashboard");
    }
  }

  async function loadSubmissions(collection: Collection) {
    setLoading(true);
    setDataError("");
    try {
      const response = await apiRequest<{ submissions: Submission[] }>(`/api/admin/submissions?type=${collection}`);
      setSubmissions(response.submissions);
      setSelected(null);
    } catch (error) {
      setDataError(error instanceof Error ? error.message : "Unable to load submissions");
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(item: Submission, status: Status) {
    try {
      const response = await apiRequest<{ submission: Submission }>(`/api/admin/submissions/${activeTab}/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setSubmissions((items) => items.map((entry) => entry.id === item.id ? response.submission : entry));
      setSelected(response.submission);
      await loadDashboard();
    } catch (error) {
      setDataError(error instanceof Error ? error.message : "Unable to update status");
    }
  }

  if (checking) return <AdminLoader />;
  if (!authenticated) return <LoginScreen email={email} password={password} error={loginError} setEmail={setEmail} setPassword={setPassword} onSubmit={login} />;

  return (
    <div className="min-h-screen bg-brand-mist text-brand-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-brand-navy p-6 text-white lg:flex">
        <Logo variant="light" />
        <div className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Admin Workspace</div>
        <nav className="mt-4 space-y-1">
          {tabs.map((tab) => (
            <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${activeTab === tab.key ? "bg-white/15 text-white" : "text-white/65 hover:bg-white/10 hover:text-white"}`}>
              <Icon name={tab.icon} className="h-5 w-5" /> {tab.label}
            </button>
          ))}
        </nav>
        <button type="button" onClick={logout} className="mt-auto flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-white/65 hover:bg-white/10 hover:text-white">
          <Icon name="close" className="h-5 w-5" /> Sign out
        </button>
      </aside>

      <main className="lg:pl-64">
        <div className="border-b border-brand-line bg-white px-5 py-5 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">Sakshionmi Group</p>
              <h1 className="mt-1 font-display text-2xl font-bold text-brand-navy sm:text-3xl">Admin Dashboard</h1>
            </div>
            <button type="button" onClick={logout} className="btn-outline px-3 py-2 text-xs lg:hidden">Sign out</button>
          </div>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {tabs.map((tab) => <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold ${activeTab === tab.key ? "bg-brand-navy text-white" : "bg-brand-mist text-brand-navy"}`}>{tab.label}</button>)}
          </div>
        </div>

        <div className="container-x py-8">
          {dataError && <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{dataError}</div>}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <Stat label="Total Leads" value={summary?.counts.total ?? 0} icon="chart" />
            <Stat label="New" value={summary?.counts.new ?? 0} icon="sparkles" tone="orange" />
            <Stat label="Loan Enquiries" value={summary?.counts.enquiries ?? 0} icon="chat" />
            <Stat label="Applications" value={summary?.counts.applications ?? 0} icon="doc" />
            <Stat label="Property Leads" value={summary?.counts.propertyEnquiries ?? 0} icon="building" />
          </div>

          <section className="mt-8 overflow-hidden rounded-2xl border border-brand-line bg-white shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-line p-5 sm:p-6">
              <div>
                <h2 className="font-display text-xl font-bold text-brand-navy">{tabs.find((tab) => tab.key === activeTab)?.label}</h2>
                <p className="mt-1 text-sm text-slate-500">Review and update incoming customer records.</p>
              </div>
              <button type="button" onClick={() => { loadDashboard(); loadSubmissions(activeTab); }} className="btn-outline px-3 py-2 text-xs"><Icon name="arrow" className="h-4 w-4 -rotate-45" /> Refresh</button>
            </div>

            {loading ? <div className="p-10 text-center text-sm text-slate-500">Loading submissions...</div> : submissions.length === 0 ? <div className="p-10 text-center text-sm text-slate-500">No submissions in this category yet.</div> : (
              <div className="grid gap-0 xl:grid-cols-[1.3fr_0.7fr]">
                <div className="divide-y divide-brand-line">
                  {submissions.map((item) => (
                    <button key={item.id} type="button" onClick={() => setSelected(item)} className={`flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-brand-mist/60 ${selected?.id === item.id ? "bg-brand-mist" : ""}`}>
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-brand-navy">{item.name || "Unnamed enquiry"}</div>
                        <div className="mt-1 truncate text-xs text-slate-500">{item.email || item.mobile || item.phone || "No contact details"}</div>
                        <div className="mt-2 text-xs text-slate-400">{formatDate(item.createdAt)}</div>
                      </div>
                      <StatusBadge status={item.status || "new"} />
                    </button>
                  ))}
                </div>
                <SubmissionDetail item={selected} onStatusChange={(status) => selected && changeStatus(selected, status)} />
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function LoginScreen({ email, password, error, setEmail, setPassword, onSubmit }: { email: string; password: string; error: string; setEmail: (v: string) => void; setPassword: (v: string) => void; onSubmit: (e: FormEvent) => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-gradient px-5 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white p-7 shadow-card sm:p-9">
        <div className="flex justify-center"><Logo /></div>
        <div className="mt-8 text-center"><span className="eyebrow">Secure Admin Access</span><h1 className="mt-4 font-display text-3xl font-bold text-brand-navy">Welcome back</h1><p className="mt-2 text-sm text-slate-500">Sign in to manage customer enquiries.</p></div>
        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div><label className="label">Admin Email</label><input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required placeholder="admin@example.com" /></div>
          <div><label className="label">Password</label><input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required placeholder="Enter password" /></div>
          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600">{error}</p>}
          <button type="submit" className="btn-primary w-full">Sign in <Icon name="arrow" className="h-4 w-4" /></button>
        </form>
      </div>
    </div>
  );
}

function SubmissionDetail({ item, onStatusChange }: { item: Submission | null; onStatusChange: (status: Status) => void }) {
  if (!item) return <div className="hidden border-l border-brand-line bg-brand-mist/40 p-6 text-sm text-slate-500 xl:block">Select a submission to view details.</div>;
  const excluded = new Set(["id", "status", "createdAt", "updatedAt"]);
  return <div className="border-t border-brand-line bg-brand-mist/40 p-6 xl:border-l xl:border-t-0"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Submission details</p><h3 className="mt-1 font-display text-lg font-bold text-brand-navy">{item.name || "Customer enquiry"}</h3></div><StatusBadge status={item.status || "new"} /></div><div className="mt-5 space-y-3">{Object.entries(item).filter(([key]) => !excluded.has(key)).map(([key, value]) => <div key={key}><div className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400">{formatKey(key)}</div><div className="mt-0.5 break-words text-sm text-slate-700">{String(value || "—")}</div></div>)}</div><label className="label mt-6">Update status</label><select className="input" value={item.status || "new"} onChange={(e) => onStatusChange(e.target.value as Status)}><option value="new">New</option><option value="contacted">Contacted</option><option value="in-progress">In progress</option><option value="closed">Closed</option></select></div>;
}

function Stat({ label, value, icon, tone = "blue" }: { label: string; value: number; icon: string; tone?: "blue" | "orange" }) { return <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone === "orange" ? "bg-brand-orange/15 text-brand-orange" : "bg-brand-mist text-brand-royal"}`}><Icon name={icon} className="h-5 w-5" /></div><div className="mt-4 font-display text-3xl font-extrabold text-brand-navy">{value}</div><div className="mt-1 text-xs font-semibold text-slate-500">{label}</div></div>; }
function StatusBadge({ status }: { status: string }) { const styles: Record<string, string> = { new: "bg-brand-orange/15 text-brand-orange", contacted: "bg-brand-accent/15 text-brand-accent", "in-progress": "bg-brand-green/15 text-brand-greenDark", closed: "bg-slate-100 text-slate-500" }; return <span className={`shrink-0 rounded-full px-2.5 py-1 text-[0.65rem] font-bold capitalize ${styles[status] || styles.new}`}>{status.replace("-", " ")}</span>; }
function formatDate(value: string) { return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)); }
function formatKey(value: string) { return value.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()); }
function AdminLoader() { return <div className="flex min-h-screen items-center justify-center bg-brand-mist text-sm font-semibold text-brand-navy">Loading admin panel...</div>; }
