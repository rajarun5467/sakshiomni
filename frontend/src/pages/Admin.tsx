import { useEffect, useMemo, useState, type FormEvent } from "react";
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
  budget?: string;
  message?: string;
  city?: string;
  employment?: string;
  purpose?: string;
  income?: string;
  tenure?: string;
  status?: Status;
  createdAt: string;
  [key: string]: unknown;
};

type Summary = {
  counts: Record<string, number>;
  recent: Submission[];
};

const tabs: { key: Collection; label: string; icon: string; color: string }[] = [
  { key: "enquiries", label: "Loan Enquiries", icon: "chat", color: "#F58220" },
  { key: "applications", label: "Applications", icon: "doc", color: "#2F6BE0" },
  { key: "propertyEnquiries", label: "Property Leads", icon: "building", color: "#1FA372" },
  { key: "contactMessages", label: "Contact Messages", icon: "mail", color: "#7C3AED" },
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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [mobileSidebar, setMobileSidebar] = useState(false);

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
      setSubmissions((items) => items.map((entry) => (entry.id === item.id ? response.submission : entry)));
      setSelected(response.submission);
      await loadDashboard();
    } catch (error) {
      setDataError(error instanceof Error ? error.message : "Unable to update status");
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return submissions.filter((item) => {
      const status = item.status || "new";
      if (statusFilter !== "all" && status !== statusFilter) return false;
      if (!q) return true;
      return (
        (item.name || "").toLowerCase().includes(q) ||
        (item.email || "").toLowerCase().includes(q) ||
        (item.mobile || "").toLowerCase().includes(q) ||
        (item.phone || "").toLowerCase().includes(q) ||
        (item.loanType || "").toLowerCase().includes(q) ||
        (item.propertyType || "").toLowerCase().includes(q) ||
        (item.requirement || "").toLowerCase().includes(q)
      );
    });
  }, [submissions, search, statusFilter]);

  if (checking) return <AdminLoader />;
  if (!authenticated) return <LoginScreen email={email} password={password} error={loginError} setEmail={setEmail} setPassword={setPassword} onSubmit={login} />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-slate-200 bg-white shadow-soft lg:flex">
        <div className="p-6">
          <Logo variant="dark" className="h-9" />
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Admin Workspace</p>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto px-4 pb-6">
          <div className="mb-3 px-3 text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Leads</div>
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold transition-all ${
                  active
                    ? "bg-brand-navy text-white shadow-soft"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                    active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-brand-navy"
                  }`}
                >
                  <Icon name={tab.icon} className="h-5 w-5" />
                </span>
                <span>{tab.label}</span>
                {active && <span className="ml-auto h-2 w-2 rounded-full bg-brand-green" />}
              </button>
            );
          })}
        </div>

        <div className="border-t border-slate-100 p-4">
          <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600">
            <Icon name="close" className="h-5 w-5" /> Sign out
          </button>
        </div>
      </aside>

      {mobileSidebar && <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileSidebar(false)} />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform flex-col border-r border-slate-200 bg-white shadow-card transition-transform lg:hidden ${
          mobileSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5">
          <Logo variant="dark" className="h-8" />
          <button onClick={() => setMobileSidebar(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 space-y-1 px-4 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActiveTab(tab.key);
                setMobileSidebar(false);
              }}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold ${
                activeTab === tab.key ? "bg-brand-navy text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon name={tab.icon} className="h-5 w-5" /> {tab.label}
            </button>
          ))}
        </div>
        <div className="border-t border-slate-100 p-4">
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50">
            <Icon name="close" className="h-5 w-5" /> Sign out
          </button>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileSidebar(true)} className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden">
                <Icon name="menu" className="h-5 w-5" />
              </button>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-brand-orange">Sakshionmi Group</p>
                <h1 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-brand-mist text-sm font-bold text-brand-navy sm:flex">
                {email.slice(0, 2).toUpperCase()}
              </div>
              <button
                onClick={() => {
                  loadDashboard();
                  loadSubmissions(activeTab);
                }}
                className="btn-outline flex items-center gap-2 px-4 py-2.5 text-xs"
              >
                <Icon name="arrow" className="h-4 w-4 -rotate-45" /> Refresh
              </button>
            </div>
          </div>
        </header>

        <div className="container-x py-8">
          {dataError && (
            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600">
              <Icon name="close" className="h-4 w-4" /> {dataError}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Total Leads" value={summary?.counts.total ?? 0} icon="chart" gradient="from-slate-900 to-slate-700" />
            <StatCard label="New" value={summary?.counts.new ?? 0} icon="sparkles" gradient="from-brand-orange to-orange-500" />
            <StatCard label="Enquiries" value={summary?.counts.enquiries ?? 0} icon="chat" gradient="from-blue-600 to-blue-400" />
            <StatCard label="Applications" value={summary?.counts.applications ?? 0} icon="doc" gradient="from-brand-royal to-indigo-500" />
            <StatCard label="Property" value={summary?.counts.propertyEnquiries ?? 0} icon="building" gradient="from-brand-green to-emerald-400" />
          </div>

          <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
            <div className="border-b border-slate-100 p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900 sm:text-xl">{tabs.find((tab) => tab.key === activeTab)?.label}</h2>
                  <p className="text-sm text-slate-500">Manage and track customer records.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative">
                    <Icon name="search" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search leads..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 sm:w-56"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
                    className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15"
                  >
                    <option value="all">All status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-orange" />
                <p className="mt-4 text-sm font-medium text-slate-500">Loading records...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Icon name="doc" className="h-7 w-7" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-700">No records found</p>
                <p className="text-xs text-slate-400">Try changing filters or wait for new submissions.</p>
              </div>
            ) : (
              <div className="grid xl:grid-cols-[1.4fr_0.6fr]">
                <div className="divide-y divide-slate-100">
                  {filtered.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelected(item)}
                      style={{ animationDelay: `${index * 40}ms` }}
                      className={`flex w-full items-start gap-4 p-5 text-left transition hover:bg-slate-50 ${selected?.id === item.id ? "bg-brand-mist" : ""} animate-fade-up`}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 text-sm font-bold text-slate-700">
                        {item.name ? item.name.slice(0, 2).toUpperCase() : "—"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <div className="truncate font-semibold text-slate-900">{item.name || "Unnamed lead"}</div>
                          <StatusBadge status={item.status || "new"} />
                        </div>
                        <div className="mt-1 truncate text-xs text-slate-500">{item.email || item.mobile || item.phone || "No contact details"}</div>
                        <div className="mt-2 flex items-center gap-3 text-[0.7rem] font-semibold text-slate-400">
                          <span className="flex items-center gap-1">
                            <Icon name="clock" className="h-3.5 w-3.5" /> {formatDate(item.createdAt)}
                          </span>
                          {item.loanType && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">{item.loanType}</span>}
                          {item.propertyType && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">{item.propertyType}</span>}
                        </div>
                      </div>
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

function LoginScreen({
  email,
  password,
  error,
  setEmail,
  setPassword,
  onSubmit,
}: {
  email: string;
  password: string;
  error: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-gradient px-5 py-12">
      <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:32px_32px] opacity-40" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-orange/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-accent/15 blur-3xl" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-white/95 p-8 shadow-card backdrop-blur-2xl sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy to-brand-royal text-white shadow-soft">
          <Icon name="shield" className="h-8 w-8" />
        </div>
        <div className="mt-7 text-center">
          <span className="eyebrow">Secure Admin Access</span>
          <h1 className="mt-4 font-display text-3xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to manage customer enquiries and leads.</p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Admin Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              placeholder="Enter password"
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
              <Icon name="close" className="h-4 w-4" /> {error}
            </div>
          )}
          <button type="submit" className="btn-primary w-full justify-center shadow-soft">
            Sign in <Icon name="arrow" className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

function SubmissionDetail({ item, onStatusChange }: { item: Submission | null; onStatusChange: (status: Status) => void }) {
  if (!item) {
    return (
      <div className="hidden flex-col items-center justify-center border-l border-slate-100 bg-slate-50 p-8 text-center text-sm text-slate-400 xl:flex">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-soft">
          <Icon name="chat" className="h-6 w-6 text-slate-300" />
        </div>
        <p className="mt-4 font-medium text-slate-500">Select a record to view details</p>
      </div>
    );
  }

  const excluded = new Set(["id", "status", "createdAt", "updatedAt"]);
  const entries = Object.entries(item).filter(([key]) => !excluded.has(key));

  return (
    <div className="border-t border-slate-100 bg-slate-50 p-6 xl:border-l xl:border-t-0">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Lead details</p>
          <h3 className="mt-1 font-display text-lg font-bold text-slate-900">{item.name || "Customer enquiry"}</h3>
        </div>
        <StatusBadge status={item.status || "new"} />
      </div>

      <div className="space-y-3">
        {entries.map(([key, value]) => (
          <div key={key} className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">{formatKey(key)}</div>
            <div className="mt-1 break-words text-sm font-medium text-slate-700">{String(value || "—")}</div>
          </div>
        ))}
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Received</div>
          <div className="mt-1 text-sm font-medium text-slate-700">{formatDate(item.createdAt)}</div>
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Update status</label>
        <select className="input" value={item.status || "new"} onChange={(e) => onStatusChange(e.target.value as Status)}>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, gradient }: { label: string; value: number; icon: string; gradient: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-soft`}>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="text-[0.65rem] font-bold uppercase tracking-widest opacity-80">{label}</div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
            <Icon name={icon} className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3 font-display text-3xl font-extrabold">{value}</div>
      </div>
      <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-orange-50 text-orange-600 ring-orange-200",
    contacted: "bg-blue-50 text-blue-600 ring-blue-200",
    "in-progress": "bg-emerald-50 text-emerald-700 ring-emerald-200",
    closed: "bg-slate-100 text-slate-500 ring-slate-200",
  };
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[0.65rem] font-bold capitalize ring-1 ${styles[status] || styles.new}`}
    >
      {status.replace("-", " ")}
    </span>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function formatKey(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

function AdminLoader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-orange" />
      <p className="mt-4 text-sm font-semibold text-slate-600">Loading admin panel...</p>
    </div>
  );
}
