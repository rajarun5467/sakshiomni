import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dataDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), "data");
const dataFile = path.join(dataDirectory, "submissions.json");
const emptyStore = {
  enquiries: [],
  applications: [],
  propertyEnquiries: [],
  contactMessages: [],
};

export async function appendSubmission(collection, data) {
  const store = await loadStore();
  const record = {
    ...data,
    id: crypto.randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  store[collection].push(record);
  await saveStore(store);
  return record;
}

export async function listSubmissions(collection) {
  const store = await loadStore();
  return store[collection] || [];
}

export async function updateSubmission(collection, id, updates) {
  const store = await loadStore();
  const index = store[collection]?.findIndex((item) => item.id === id) ?? -1;
  if (index < 0) return null;

  store[collection][index] = {
    ...store[collection][index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await saveStore(store);
  return store[collection][index];
}

async function saveStore(store) {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(dataFile, JSON.stringify(store, null, 2), "utf8");
}

async function loadStore() {
  try {
    const content = await readFile(dataFile, "utf8");
    const parsed = JSON.parse(content);
    return { ...emptyStore, ...parsed };
  } catch {
    return structuredClone(emptyStore);
  }
}
