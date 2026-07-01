import type {
  AdminEventInput,
  AdminSpeakerInput,
  DbApplicationRow,
  DbEventRow,
  DbSpeakerRow,
  EventFormat,
  EventItem,
  Speaker,
  SpeakerApplication,
  SpeakerApplicationInput,
  SpeakerStatus,
} from "@/lib/types";

export const GOAL = 1000;

function normalizeStatus(value: string | null | undefined): SpeakerStatus {
  return value === "upcoming" ? "upcoming" : "featured";
}

function normalizeFormat(value: string | null | undefined): EventFormat {
  if (value === "offline" || value === "hybrid") return value;
  return "online";
}

export function mapSpeakerRow(row: DbSpeakerRow): Speaker {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    company: row.company,
    topic: row.topic,
    photoUrl: row.photo_url,
    country: row.country,
    status: normalizeStatus(row.status),
    createdAt: row.created_at,
  };
}

export function mapApplicationRow(row: DbApplicationRow): SpeakerApplication {
  return {
    id: row.id,
    name: row.name,
    companyRole: row.company_role,
    socialLink: row.social_link,
    topic: row.topic,
    createdAt: row.created_at,
  };
}

export function mapEventRow(row: DbEventRow): EventItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    date: row.date,
    location: row.location,
    format: normalizeFormat(row.format),
    link: row.link,
    createdAt: row.created_at,
  };
}

export function speakerToDb(input: AdminSpeakerInput) {
  return {
    name: input.name,
    role: input.role,
    company: input.company,
    topic: input.topic,
    photo_url: input.photoUrl,
    country: input.country,
    status: input.status,
  };
}

export function applicationToDb(input: SpeakerApplicationInput) {
  return {
    name: input.name,
    company_role: input.companyRole,
    social_link: input.socialLink,
    topic: input.topic,
  };
}

export function eventToDb(input: AdminEventInput) {
  return {
    title: input.title,
    description: input.description,
    date: input.date,
    location: input.location,
    format: input.format,
    link: input.link,
  };
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
