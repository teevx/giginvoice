import { CompanyProfile } from "./types";

const PROFILE_KEY = "giginvoice_profile";
const CLIENTS_KEY = "giginvoice_clients";
const INVOICE_NUM_KEY = "giginvoice_next_num";

export function saveProfile(profile: CompanyProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadProfile(): CompanyProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CompanyProfile;
  } catch {
    return null;
  }
}

export function saveClient(clientName: string): void {
  if (typeof window === "undefined") return;
  const clients = loadClients();
  const filtered = clients.filter(
    (c) => c.toLowerCase() !== clientName.toLowerCase(),
  );
  filtered.unshift(clientName);
  localStorage.setItem(
    CLIENTS_KEY,
    JSON.stringify(filtered.slice(0, 20)),
  );
}

export function loadClients(): string[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CLIENTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function getNextInvoiceNumber(): string {
  if (typeof window === "undefined") return "1";
  const raw = localStorage.getItem(INVOICE_NUM_KEY);
  const num = raw ? parseInt(raw, 10) : 1;
  return String(num);
}

export function incrementInvoiceNumber(): void {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem(INVOICE_NUM_KEY);
  const num = raw ? parseInt(raw, 10) : 1;
  localStorage.setItem(INVOICE_NUM_KEY, String(num + 1));
}
