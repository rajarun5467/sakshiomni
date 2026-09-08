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

const tabs: { key: Collection; label: string; icon: string }[] = [
  { key: "enquiries", label: "Enquiries", icon: "chat" },
  { key: "applications", label: "Applications", icon: "doc" },
  { key: "propertyEnquiries", label: "Property Leads", icon: "building" },
  { key: "contactMessages", label: "Messages", icon: "mail" },
];

const statusOrder: Status[] = ["new", "contacted", "in-progress", "closed"];

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
  const [mobileNav, setMobileNav] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  function openDetail(item: Submission) {
    setSelected(item);
    setDrawerOpen(true);
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return submissions.filter((item) => {
      const status = item.status || "new";
      if (statusFilter !== "all" && status !== statusFilter) return false;
      if (!q) return true;
      return [item.name, item.email, item.mobile, item.phone, item.loanType, item.propertyType, item.requirement, item.city]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [submissions, search, statusFilter]);

  if (checking) return <AdminLoader />;
  if (!authenticated) return <LoginScreen email={email} password={password} error={loginError} setEmail={setEmail} setPassword={setPassword} onSubmit={login} />;

  const activeLabel = tabs.find((tab) => tab.key === activeTab)?.label ?? "";

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-slate-100 px-5">
          <Logo variant="dark" className="h-8" />
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          <div className="px-3 pb-2 text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400">Workspace</div>
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            const count = tab.key === "enquiries" ? summary?.counts.enquiries : tab.key === "applications" ? summary?.counts.applications : tab.key === "propertyEnquiries" ? summary?.counts.propertyEnquiries : summary?.counts.contactMessages;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                  active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon name={tab.icon} className="h-4 w-4 shrink-0" />
                <span className="flex-1">{tab.label}</span>
                {count !== undefined && (
                  <span className={`rounded-md px-1.5 py-0.5 text-[0.65rem] font-bold ${active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"}`}>{count}</span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-slate-100 p-3">
          <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600">
            <Icon name="close" className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile nav */}
      {mobileNav && <div className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden" onClick={() => setMobileNav(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white transition-transform lg:hidden ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Logo variant="dark" className="h-8" />
          <button onClick={() => setMobileNav(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-0.5 px-3 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActiveTab(tab.key);
                setMobileNav(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${activeTab === tab.key ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Icon name={tab.icon} className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-100 p-3">
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50">
            <Icon name="close" className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="min-h-screen lg:pl-60">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl sm:px-8">
          <button onClick={() => setMobileNav(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden">
            <Icon name="menu" className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-slate-400">Admin</span>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-900">{activeLabel}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => {
                loadDashboard();
                loadSubmissions(activeTab);
              }}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <Icon name="arrow" className="h-3.5 w-3.5 -rotate-45" /> Refresh
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              {(email || "AD").slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          {dataError && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              <Icon name="close" className="h-4 w-4 shrink-0" /> {dataError}
            </div>
          )}

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Total Leads" value={summary?.counts.total ?? 0} sub="All categories" icon="chart" />
            <StatTile label="New" value={summary?.counts.new ?? 0} sub="Awaiting action" icon="sparkles" accent />
            <StatTile label="This Period" value={summary?.counts.total ?? 0} sub="All time" icon="clock" />
            <StatTile label="Closed" value={(summary?.counts.total ?? 0) - (summary?.counts.new ?? 0)} sub="Processed" icon="check" />
          </div>

          {/* Section header */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">{activeLabel}</h2>
              <p className="text-sm text-slate-500">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, email, phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 sm:w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
                className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                <option value="all">All status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in-progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-16">
                <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-slate-200 border-t-slate-900" />
                <p className="mt-4 text-sm font-medium text-slate-500">Loading records...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-16">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                  <Icon name="doc" className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-700">No records found</p>
                <p className="text-xs text-slate-400">Try adjusting filters or search.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Name</th>
                      <th className="hidden px-5 py-3 font-semibold md:table-cell">Contact</th>
                      <th className="hidden px-5 py-3 font-semibold lg:table-cell">Details</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                      <th className="hidden px-5 py-3 font-semibold sm:table-cell">Date</th>
                      <th className="px-5 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => openDetail(item)}
                        className="cursor-pointer transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                              {(item.name || "?").slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate font-semibold text-slate-900">{item.name || "Unnamed"}</div>
                              <div className="truncate text-xs text-slate-400">{item.email || item.mobile || item.phone || "—"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-5 py-4 md:table-cell">
                          <div className="text-slate-700">{item.mobile || item.phone || "—"}</div>
                          <div className="text-xs text-slate-400">{item.email || "—"}</div>
                        </td>
                        <td className="hidden px-5 py-4 lg:table-cell">
                          <div className="text-slate-700">{item.loanType || item.propertyType || item.requirement || "—"}</div>
                          <div className="text-xs text-slate-400">{item.amount || item.budget || item.city || "—"}</div>
                        </td>
                        <td className="px-5 py-4">
                          <StatusPill status={item.status || "new"} />
                        </td>
                        <td className="hidden px-5 py-4 text-slate-500 sm:table-cell">{formatDate(item.createdAt)}</td>
                        <td className="px-5 py-4 text-right">
                          <Icon name="chevron" className="ml-auto h-4 w-4 -rotate-90 text-slate-400" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Detail drawer */}
      {drawerOpen && selected && (
        <>
          <div className="fixed inset-0 z-50 bg-slate-900/40" onClick={() => setDrawerOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h3 className="font-display text-base font-bold text-slate-900">Lead Details</h3>
              <button onClick={() => setDrawerOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-700">
                  {(selected.name || "?").slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-display text-lg font-bold text-slate-900">{selected.name || "Unnamed lead"}</h4>
                  <p className="text-sm text-slate-500">{selected.email || selected.mobile || selected.phone || "No contact"}</p>
                </div>
                <StatusPill status={selected.status || "new"} />
              </div>

              <div className="mt-6 space-y-3">
                {Object.entries(selected)
                  .filter(([key]) => !["id", "status", "createdAt", "updatedAt"].includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{formatKey(key)}</span>
                      <span className="text-right text-sm font-medium text-slate-700">{String(value || "—")}</span>
                    </div>
                  ))}
                <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Received</span>
                  <span className="text-right text-sm font-medium text-slate-700">{formatDate(selected.createdAt)}</span>
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Update Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {statusOrder.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => changeStatus(selected, status)}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold capitalize transition ${
                        (selected.status || "new") === status
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
                      }`}
                    >
                      {status.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
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
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-navy-gradient p-12 lg:flex">
        <div className="absolute inset-0 bg-hero-grid bg-[length:28px_28px] opacity-30" />
        <div className="relative">
          <Logo variant="light" className="h-10" />
        </div>
        <div className="relative">
          <h2 className="font-display text-4xl font-bold leading-tight text-white">
            Manage your leads with confidence.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            A secure workspace to track enquiries, loan applications, property leads, and customer messages — all in one place.
          </p>
          <div className="mt-8 flex gap-6">
            <div>
              <div className="font-display text-2xl font-bold text-white">{`>`} 4</div>
              <div className="text-xs font-medium uppercase tracking-wider text-white/50">Categories</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-white">Secure</div>
              <div className="text-xs font-medium uppercase tracking-wider text-white/50">HttpOnly session</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-white">Live</div>
              <div className="text-xs font-medium uppercase tracking-wider text-white/50">Real-time</div>
            </div>
          </div>
        </div>
        <div className="relative text-xs text-white/40">© {new Date().getFullYear()} Sakshionmi Group. All rights reserved.</div>
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="lg:hidden"><Logo variant="dark" className="h-9" /></div>
          <div className="mt-8 lg:mt-0">
            <h1 className="font-display text-2xl font-bold text-slate-900">Sign in to admin</h1>
            <p className="mt-1.5 text-sm text-slate-500">Enter your credentials to access the dashboard.</p>
          </div>
          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
              <input
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
                placeholder="admin@sakshionmi.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Password</label>
              <input
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">
                <Icon name="close" className="h-4 w-4 shrink-0" /> {error}
              </div>
            )}
            <button type="submit" className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800">
              Sign in <Icon name="arrow" className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value, sub, icon, accent }: { label: string; value: number; sub: string; icon: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${accent ? "bg-orange-50 text-orange-600" : "bg-slate-100 text-slate-500"}`}>
          <Icon name={icon} className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 font-display text-3xl font-bold text-slate-900">{value}</div>
      <div className="mt-0.5 text-xs text-slate-400">{sub}</div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-orange-50 text-orange-700 ring-orange-200",
    contacted: "bg-blue-50 text-blue-700 ring-blue-200",
    "in-progress": "bg-emerald-50 text-emerald-700 ring-emerald-200",
    closed: "bg-slate-100 text-slate-600 ring-slate-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${styles[status] || styles.new}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status.replace("-", " ")}
    </span>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function formatKey(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

function AdminLoader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC]">
      <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-slate-200 border-t-slate-900" />
      <p className="mt-4 text-sm font-semibold text-slate-600">Loading admin panel...</p>
    </div>
  );
}
