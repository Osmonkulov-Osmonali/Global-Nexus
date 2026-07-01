import type {
  AdminEventInput,
  AdminSpeakerInput,
  EventItem,
  Speaker,
  SpeakerApplication,
  SpeakerApplicationInput,
} from "@/lib/types";
import { GOAL, getInitials } from "@/lib/data/mappers";

export { GOAL, getInitials };

export const STORAGE_KEY = "global-nexus-speakers";
export const APPLICATIONS_KEY = "global-nexus-applications";
export const EVENTS_KEY = "global-nexus-events";

const seedData: Omit<Speaker, "id" | "createdAt">[] = [
  { name: "Sarah Chen", role: "CEO", company: "NovaStack", topic: "Scaling AI products from zero to enterprise", photoUrl: "", country: "US", status: "featured" },
  { name: "Marcus Weber", role: "Founder", company: "FinBridge", topic: "Raising Series A in a downturn", photoUrl: "", country: "DE", status: "featured" },
  { name: "Priya Sharma", role: "CTO", company: "CloudPulse", topic: "Building resilient infra at scale", photoUrl: "", country: "IN", status: "featured" },
  { name: "James Okonkwo", role: "Partner", company: "Horizon VC", topic: "What investors look for in 2025", photoUrl: "", country: "NG", status: "featured" },
  { name: "Elena Vasquez", role: "VP Product", company: "DataMesh", topic: "Finding product-market fit in 90 days", photoUrl: "", country: "ES", status: "featured" },
  { name: "Kenji Tanaka", role: "Founder", company: "RoboFlow", topic: "Deep tech commercialization playbook", photoUrl: "", country: "JP", status: "featured" },
  { name: "Amira Hassan", role: "CMO", company: "GrowthForge", topic: "Global go-to-market without a big budget", photoUrl: "", country: "AE", status: "featured" },
  { name: "Lucas Ferreira", role: "Head of Engineering", company: "DevScale", topic: "Engineering culture in hypergrowth teams", photoUrl: "", country: "BR", status: "featured" },
  { name: "Sophie Laurent", role: "CEO", company: "HealthNova", topic: "HealthTech expansion across borders", photoUrl: "", country: "FR", status: "featured" },
  { name: "David Kim", role: "Investor", company: "Summit Capital", topic: "Term sheets founders should understand", photoUrl: "", country: "KR", status: "featured" },
  { name: "Isabella Rossi", role: "CPO", company: "MobileFirst", topic: "Mobile product metrics that matter", photoUrl: "", country: "IT", status: "featured" },
  { name: "Ahmed Al-Rashid", role: "Founder", company: "PropTech Global", topic: "PropTech and the future of real estate", photoUrl: "", country: "SA", status: "featured" },
  { name: "Nina Petrov", role: "CTO", company: "SecureLayer", topic: "Cybersecurity for fast-growing startups", photoUrl: "", country: "RU", status: "featured" },
  { name: "Tom Bradley", role: "VP Sales", company: "EnterpriseX", topic: "Enterprise sales from scratch", photoUrl: "", country: "UK", status: "featured" },
  { name: "Yuki Nakamura", role: "Founder", company: "GameForge", topic: "Gamedev as a sustainable business", photoUrl: "", country: "JP", status: "featured" },
  { name: "Fatima Diallo", role: "CEO", company: "EduLeap", topic: "EdTech monetization and retention", photoUrl: "", country: "SN", status: "featured" },
  { name: "Oliver Schmidt", role: "Head of Data", company: "Analytics Pro", topic: "Data-driven decisions for CEOs", photoUrl: "", country: "DE", status: "featured" },
  { name: "Maria Santos", role: "Founder", company: "AgriTech Labs", topic: "AgTech innovation in emerging markets", photoUrl: "", country: "MX", status: "featured" },
  { name: "Ryan O'Connor", role: "COO", company: "LogiChain", topic: "Operational excellence in startups", photoUrl: "", country: "IE", status: "featured" },
  { name: "Chloe Wang", role: "Board Member", company: "Corporate Ventures", topic: "Corporate innovation and intrapreneurship", photoUrl: "", country: "SG", status: "featured" },
  { name: "Viktor Novak", role: "CTO", company: "CloudScale", topic: "Infrastructure at planetary scale", photoUrl: "", country: "CZ", status: "featured" },
  { name: "Aisha Mohammed", role: "CEO", company: "FinTech Africa", topic: "Financial inclusion through technology", photoUrl: "", country: "KE", status: "featured" },
  { name: "Daniel Park", role: "Founder", company: "TravelNexus", topic: "Solving the marketplace cold-start problem", photoUrl: "", country: "KR", status: "featured" },
  { name: "Emma Wilson", role: "CFO", company: "UnitOps", topic: "Unit economics and financial modeling", photoUrl: "", country: "AU", status: "featured" },
];

export const seedSpeakers: Speaker[] = seedData.map((item, i) => ({
  ...item,
  id: String(i + 1),
  createdAt: new Date(2025, 0, 5 + i).toISOString(),
}));

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalSpeakers(): Speaker[] {
  const stored = readJson<Speaker[] | null>(STORAGE_KEY, null);
  if (!stored) {
    writeJson(STORAGE_KEY, seedSpeakers);
    return seedSpeakers;
  }
  // Older stored entries may predate the status field.
  return stored.map((s) => ({ ...s, status: s.status === "upcoming" ? "upcoming" : "featured" }));
}

export function addLocalSpeaker(input: AdminSpeakerInput): Speaker {
  const speakers = getLocalSpeakers();
  const newSpeaker: Speaker = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  writeJson(STORAGE_KEY, [newSpeaker, ...speakers]);
  return newSpeaker;
}

export function removeLocalSpeaker(id: string): void {
  writeJson(
    STORAGE_KEY,
    getLocalSpeakers().filter((s) => s.id !== id)
  );
}

export function getLocalApplications(): SpeakerApplication[] {
  return readJson<SpeakerApplication[]>(APPLICATIONS_KEY, []);
}

export function addLocalApplication(input: SpeakerApplicationInput): SpeakerApplication {
  const applications = getLocalApplications();
  const application: SpeakerApplication = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  writeJson(APPLICATIONS_KEY, [application, ...applications]);
  return application;
}

export function removeLocalApplication(id: string): void {
  writeJson(
    APPLICATIONS_KEY,
    getLocalApplications().filter((a) => a.id !== id)
  );
}

export function getLocalEvents(): EventItem[] {
  return readJson<EventItem[]>(EVENTS_KEY, []);
}

export function addLocalEvent(input: AdminEventInput): EventItem {
  const events = getLocalEvents();
  const event: EventItem = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  writeJson(EVENTS_KEY, [event, ...events]);
  return event;
}

export function removeLocalEvent(id: string): void {
  writeJson(
    EVENTS_KEY,
    getLocalEvents().filter((e) => e.id !== id)
  );
}
