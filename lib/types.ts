export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  topic: string;
  photoUrl: string;
  country: string;
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
}

export interface DbSpeakerRow {
  id: string;
  name: string;
  role: string;
  company: string;
  topic: string;
  photo_url: string;
  country: string;
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
