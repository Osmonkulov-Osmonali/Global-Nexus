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
