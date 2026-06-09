import type {
  AdminSpeakerInput,
  DbApplicationRow,
  DbSpeakerRow,
  Speaker,
  SpeakerApplication,
  SpeakerApplicationInput,
} from "@/lib/types";

export const GOAL = 1000;

export function mapSpeakerRow(row: DbSpeakerRow): Speaker {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    company: row.company,
    topic: row.topic,
    photoUrl: row.photo_url,
    country: row.country,
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

export function speakerToDb(input: AdminSpeakerInput) {
  return {
    name: input.name,
    role: input.role,
    company: input.company,
    topic: input.topic,
    photo_url: input.photoUrl,
    country: input.country,
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

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
