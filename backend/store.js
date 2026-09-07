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
    createdAt: new Date().toISOString(),
  };
  store[collection].push(record);
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(dataFile, JSON.stringify(store, null, 2), "utf8");
  return record;
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
