import "dotenv/config";
import cors from "cors";
import express from "express";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { appendSubmission, listSubmissions, updateSubmission } from "./store.js";

const app = express();
const port = Number(process.env.PORT) || 4000;
const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || "";
const sessionSecret = process.env.ADMIN_SESSION_SECRET || "";
const sessionCookie = "sakshionmi_admin";
const collections = ["enquiries", "applications", "propertyEnquiries", "contactMessages"];
const allowedStatuses = ["new", "contacted", "in-progress", "closed"];
const configuredOrigins = [process.env.FRONTEND_URL, process.env.ALLOWED_ORIGINS]
  .filter(Boolean)
  .flatMap((value) => value.split(","))
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);
const allowedOrigins = configuredOrigins.length ? configuredOrigins : ["http://localhost:5173"];

app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Origin not allowed"));
    },
    methods: ["GET", "POST", "PATCH"],
  })
);
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "sakshionmi-backend" });
});

app.post("/api/enquiries", async (req, res) => {
  const data = sanitize(req.body);
  const missing = requiredFields(data, ["name", "mobile", "email", "loanType", "amount", "city", "employment"]);
  if (missing.length > 0) return res.status(400).json({ ok: false, message: `Missing fields: ${missing.join(", ")}` });
  const enquiry = await appendSubmission("enquiries", data);
  return res.status(201).json({ ok: true, message: "Enquiry received", id: enquiry.id });
});

app.post("/api/applications", async (req, res) => {
  const data = sanitize(req.body);
  const missing = requiredFields(data, ["name", "mobile", "email", "city", "loanType", "amount", "tenure", "employment", "income", "purpose"]);
  if (missing.length > 0) return res.status(400).json({ ok: false, message: `Missing fields: ${missing.join(", ")}` });
  const application = await appendSubmission("applications", data);
  return res.status(201).json({ ok: true, message: "Application received", id: application.id });
});

app.post("/api/property-enquiries", async (req, res) => {
  const data = sanitize(req.body);
  const missing = requiredFields(data, ["name", "phone", "requirement", "propertyType", "location", "budget"]);
  if (missing.length > 0) return res.status(400).json({ ok: false, message: `Missing fields: ${missing.join(", ")}` });
  const enquiry = await appendSubmission("propertyEnquiries", data);
  return res.status(201).json({ ok: true, message: "Property enquiry received", id: enquiry.id });
});

app.post("/api/contact-messages", async (req, res) => {
  const data = sanitize(req.body);
  const missing = requiredFields(data, ["name", "mobile", "email", "message"]);
  if (missing.length > 0) return res.status(400).json({ ok: false, message: `Missing fields: ${missing.join(", ")}` });
  const contactMessage = await appendSubmission("contactMessages", data);
  return res.status(201).json({ ok: true, message: "Contact message received", id: contactMessage.id });
});

// Admin authentication
app.post("/api/admin/login", (req, res) => {
  if (!adminEmail || !adminPassword || !sessionSecret) {
    return res.status(503).json({ ok: false, message: "Admin authentication is not configured" });
  }

  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  if (!safeEqual(email, adminEmail) || !safeEqual(password, adminPassword)) {
    return res.status(401).json({ ok: false, message: "Invalid admin credentials" });
  }

  const token = createSession(email);
  res.setHeader("Set-Cookie", serializeCookie(sessionCookie, token, 8 * 60 * 60));
  return res.json({ ok: true, user: { email } });
});

app.post("/api/admin/logout", (_req, res) => {
  res.setHeader("Set-Cookie", serializeCookie(sessionCookie, "", 0));
  res.json({ ok: true });
});

app.get("/api/admin/me", requireAdmin, (req, res) => {
  res.json({ ok: true, user: { email: req.admin.email } });
});

app.get("/api/admin/summary", requireAdmin, async (_req, res) => {
  const values = await Promise.all(collections.map((collection) => listSubmissions(collection)));
  const [enquiries, applications, propertyEnquiries, contactMessages] = values;
  const all = values.flat();
  res.json({
    ok: true,
    counts: {
      total: all.length,
      enquiries: enquiries.length,
      applications: applications.length,
      propertyEnquiries: propertyEnquiries.length,
      contactMessages: contactMessages.length,
      new: all.filter((item) => (item.status || "new") === "new").length,
    },
    recent: all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
  });
});

app.get("/api/admin/submissions", requireAdmin, async (req, res) => {
  const collection = String(req.query.type || "enquiries");
  if (!collections.includes(collection)) return res.status(400).json({ ok: false, message: "Invalid submission type" });
  const submissions = await listSubmissions(collection);
  res.json({ ok: true, collection, submissions: submissions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
});

app.patch("/api/admin/submissions/:collection/:id", requireAdmin, async (req, res) => {
  const { collection, id } = req.params;
  const status = String(req.body?.status || "");
  if (!collections.includes(collection)) return res.status(400).json({ ok: false, message: "Invalid submission type" });
  if (!allowedStatuses.includes(status)) return res.status(400).json({ ok: false, message: "Invalid status" });

  const updated = await updateSubmission(collection, id, { status });
  if (!updated) return res.status(404).json({ ok: false, message: "Submission not found" });
  res.json({ ok: true, submission: updated });
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Sakshionmi backend listening on port ${port}`);
});

function requireAdmin(req, res, next) {
  const token = parseCookies(req.headers.cookie || "")[sessionCookie];
  const session = token ? verifySession(token) : null;
  if (!session) return res.status(401).json({ ok: false, message: "Admin authentication required" });
  req.admin = session;
  return next();
}

function createSession(email) {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function verifySession(token) {
  if (!sessionSecret) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return parsed.exp > Date.now() ? parsed : null;
  } catch {
    return null;
  }
}

function sign(value) {
  return createHmac("sha256", sessionSecret).update(value).digest("base64url");
}

function safeEqual(left, right) {
  const a = createHash("sha256").update(String(left)).digest();
  const b = createHash("sha256").update(String(right)).digest();
  return timingSafeEqual(a, b);
}

function serializeCookie(name, value, maxAge) {
  const secure = process.env.COOKIE_SECURE === "true" || process.env.NODE_ENV === "production";
  const sameSite = secure ? "None" : "Lax";
  return `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=${sameSite}${secure ? "; Secure" : ""}`;
}

function parseCookies(header) {
  return Object.fromEntries(
    header.split(";").filter(Boolean).map((part) => {
      const [key, ...value] = part.trim().split("=");
      return [key, decodeURIComponent(value.join("="))];
    })
  );
}

function sanitize(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return {};
  return Object.fromEntries(Object.entries(body).map(([key, value]) => [key, typeof value === "string" ? value.trim().slice(0, 2000) : value]));
}

function requiredFields(data, fields) {
  return fields.filter((field) => !data[field]);
}
