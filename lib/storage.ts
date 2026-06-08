import type { Speaker } from "./types";

export const STORAGE_KEY = "global-nexus-speakers";
export const GOAL = 1000;

const seedData: Omit<Speaker, "id" | "createdAt">[] = [
  { name: "Sarah Chen", role: "CEO", company: "NovaStack", topic: "Scaling AI products from zero to enterprise", photoUrl: "", country: "US" },
  { name: "Marcus Weber", role: "Founder", company: "FinBridge", topic: "Raising Series A in a downturn", photoUrl: "", country: "DE" },
  { name: "Priya Sharma", role: "CTO", company: "CloudPulse", topic: "Building resilient infra at scale", photoUrl: "", country: "IN" },
  { name: "James Okonkwo", role: "Partner", company: "Horizon VC", topic: "What investors look for in 2025", photoUrl: "", country: "NG" },
  { name: "Elena Vasquez", role: "VP Product", company: "DataMesh", topic: "Finding product-market fit in 90 days", photoUrl: "", country: "ES" },
  { name: "Kenji Tanaka", role: "Founder", company: "RoboFlow", topic: "Deep tech commercialization playbook", photoUrl: "", country: "JP" },
  { name: "Amira Hassan", role: "CMO", company: "GrowthForge", topic: "Global go-to-market without a big budget", photoUrl: "", country: "AE" },
  { name: "Lucas Ferreira", role: "Head of Engineering", company: "DevScale", topic: "Engineering culture in hypergrowth teams", photoUrl: "", country: "BR" },
  { name: "Sophie Laurent", role: "CEO", company: "HealthNova", topic: "HealthTech expansion across borders", photoUrl: "", country: "FR" },
  { name: "David Kim", role: "Investor", company: "Summit Capital", topic: "Term sheets founders should understand", photoUrl: "", country: "KR" },
  { name: "Isabella Rossi", role: "CPO", company: "MobileFirst", topic: "Mobile product metrics that matter", photoUrl: "", country: "IT" },
  { name: "Ahmed Al-Rashid", role: "Founder", company: "PropTech Global", topic: "PropTech and the future of real estate", photoUrl: "", country: "SA" },
  { name: "Nina Petrov", role: "CTO", company: "SecureLayer", topic: "Cybersecurity for fast-growing startups", photoUrl: "", country: "RU" },
  { name: "Tom Bradley", role: "VP Sales", company: "EnterpriseX", topic: "Enterprise sales from scratch", photoUrl: "", country: "UK" },
  { name: "Yuki Nakamura", role: "Founder", company: "GameForge", topic: "Gamedev as a sustainable business", photoUrl: "", country: "JP" },
  { name: "Fatima Diallo", role: "CEO", company: "EduLeap", topic: "EdTech monetization and retention", photoUrl: "", country: "SN" },
  { name: "Oliver Schmidt", role: "Head of Data", company: "Analytics Pro", topic: "Data-driven decisions for CEOs", photoUrl: "", country: "DE" },
  { name: "Maria Santos", role: "Founder", company: "AgriTech Labs", topic: "AgTech innovation in emerging markets", photoUrl: "", country: "MX" },
  { name: "Ryan O'Connor", role: "COO", company: "LogiChain", topic: "Operational excellence in startups", photoUrl: "", country: "IE" },
  { name: "Chloe Wang", role: "Board Member", company: "Corporate Ventures", topic: "Corporate innovation and intrapreneurship", photoUrl: "", country: "SG" },
  { name: "Viktor Novak", role: "CTO", company: "CloudScale", topic: "Infrastructure at planetary scale", photoUrl: "", country: "CZ" },
  { name: "Aisha Mohammed", role: "CEO", company: "FinTech Africa", topic: "Financial inclusion through technology", photoUrl: "", country: "KE" },
  { name: "Daniel Park", role: "Founder", company: "TravelNexus", topic: "Solving the marketplace cold-start problem", photoUrl: "", country: "KR" },
  { name: "Emma Wilson", role: "CFO", company: "UnitOps", topic: "Unit economics and financial modeling", photoUrl: "", country: "AU" },
];

const seedSpeakers: Speaker[] = seedData.map((item, i) => ({
  ...item,
  id: String(i + 1),
  createdAt: new Date(2025, 0, 5 + i).toISOString(),
}));

/*
 * Supabase (uncomment when ready):
 *
 * import { createClient } from '@supabase/supabase-js';
 * const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
 *
 * export async function fetchSpeakers(): Promise<Speaker[]> {
 *   const { data } = await supabase.from('speakers').select('*').order('created_at', { ascending: false });
 *   return data ?? [];
 * }
 */

export function getSpeakers(): Speaker[] {
  if (typeof window === "undefined") return seedSpeakers;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedSpeakers));
      return seedSpeakers;
    }
    return JSON.parse(raw) as Speaker[];
  } catch {
    return seedSpeakers;
  }
}

export function saveSpeakers(speakers: Speaker[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(speakers));
}

export function addSpeaker(input: Omit<Speaker, "id" | "createdAt">): Speaker {
  const speakers = getSpeakers();
  const newSpeaker: Speaker = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  saveSpeakers([newSpeaker, ...speakers]);
  return newSpeaker;
}

export function removeSpeaker(id: string): void {
  saveSpeakers(getSpeakers().filter((s) => s.id !== id));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
