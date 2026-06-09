import { applicationToDb, mapApplicationRow } from "@/lib/data/mappers";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  addLocalApplication,
  getLocalApplications,
  removeLocalApplication,
} from "@/lib/storage";
import type { SpeakerApplication, SpeakerApplicationInput } from "@/lib/types";

export async function fetchApplications(): Promise<SpeakerApplication[]> {
  if (typeof window === "undefined") return [];

  if (!isSupabaseConfigured()) {
    return getLocalApplications();
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("speaker_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapApplicationRow);
}

export async function submitApplication(
  input: SpeakerApplicationInput
): Promise<SpeakerApplication> {
  if (!isSupabaseConfigured()) {
    return addLocalApplication(input);
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("speaker_applications")
    .insert(applicationToDb(input))
    .select("*")
    .single();

  if (error) throw error;
  return mapApplicationRow(data);
}

export async function deleteApplication(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    removeLocalApplication(id);
    return;
  }

  const supabase = createClient();
  const { error } = await supabase.from("speaker_applications").delete().eq("id", id);
  if (error) throw error;
}

export function subscribeToApplications(onChange: () => void): (() => void) | undefined {
  if (!isSupabaseConfigured()) return undefined;

  const supabase = createClient();
  const channel = supabase
    .channel("applications-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "speaker_applications" },
      () => onChange()
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
