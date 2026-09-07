import "dotenv/config";
import cors from "cors";
import express from "express";
import { appendSubmission } from "./store.js";

const app = express();
const port = Number(process.env.PORT) || 4000;
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Origin not allowed"));
    },
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "sakshionmi-backend" });
});

app.post("/api/enquiries", async (req, res) => {
  const data = sanitize(req.body);
  const missing = requiredFields(data, ["name", "mobile", "email", "loanType", "amount", "city", "employment"]);

  if (missing.length > 0) {
    return res.status(400).json({ ok: false, message: `Missing fields: ${missing.join(", ")}` });
  }

  const enquiry = await appendSubmission("enquiries", data);
  return res.status(201).json({ ok: true, message: "Enquiry received", id: enquiry.id });
});

app.post("/api/applications", async (req, res) => {
  const data = sanitize(req.body);
  const missing = requiredFields(data, ["name", "mobile", "email", "city", "loanType", "amount", "tenure", "employment", "income", "purpose"]);

  if (missing.length > 0) {
    return res.status(400).json({ ok: false, message: `Missing fields: ${missing.join(", ")}` });
  }

  const application = await appendSubmission("applications", data);
  return res.status(201).json({ ok: true, message: "Application received", id: application.id });
});

app.post("/api/property-enquiries", async (req, res) => {
  const data = sanitize(req.body);
  const missing = requiredFields(data, ["name", "phone", "requirement", "propertyType", "location", "budget"]);

  if (missing.length > 0) {
    return res.status(400).json({ ok: false, message: `Missing fields: ${missing.join(", ")}` });
  }

  const enquiry = await appendSubmission("propertyEnquiries", data);
  return res.status(201).json({ ok: true, message: "Property enquiry received", id: enquiry.id });
});

app.post("/api/contact-messages", async (req, res) => {
  const data = sanitize(req.body);
  const missing = requiredFields(data, ["name", "mobile", "email", "message"]);

  if (missing.length > 0) {
    return res.status(400).json({ ok: false, message: `Missing fields: ${missing.join(", ")}` });
  }

  const contactMessage = await appendSubmission("contactMessages", data);
  return res.status(201).json({ ok: true, message: "Contact message received", id: contactMessage.id });
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Sakshionmi backend listening on port ${port}`);
});

function sanitize(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return {};
  return Object.fromEntries(
    Object.entries(body).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim().slice(0, 2000) : value,
    ])
  );
}

function requiredFields(data, fields) {
  return fields.filter((field) => !data[field]);
}

