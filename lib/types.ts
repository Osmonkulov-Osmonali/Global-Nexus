export type SpeakerStatus = "featured" | "upcoming";

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  topic: string;
  photoUrl: string;
  country: string;
  status: SpeakerStatus;
  createdAt: string;
}

export interface SpeakerApplication {
  id: string;
  name: string;
  companyRole: string;
  socialLink: string;
  topic: string;
  createdAt: string;
}

export interface SpeakerApplicationInput {
  name: string;
  companyRole: string;
  socialLink: string;
  topic: string;
}

export interface AdminSpeakerInput {
  name: string;
  role: string;
  company: string;
  topic: string;
  photoUrl: string;
  country: string;
  status: SpeakerStatus;
}

export type EventFormat = "online" | "offline" | "hybrid";

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  format: EventFormat;
  link: string;
  createdAt: string;
}

export interface AdminEventInput {
  title: string;
  description: string;
  date: string;
  location: string;
  format: EventFormat;
  link: string;
}

export interface DbSpeakerRow {
  id: string;
  name: string;
  role: string;
  company: string;
  topic: string;
  photo_url: string;
  country: string;
  status?: string | null;
  created_at: string;
}

export interface DbApplicationRow {
  id: string;
  name: string;
  company_role: string;
  social_link: string;
  topic: string;
  created_at: string;
}

export interface DbEventRow {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  format: string;
  link: string;
  created_at: string;
}
