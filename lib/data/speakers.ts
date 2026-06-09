import { mapSpeakerRow, speakerToDb } from "@/lib/data/mappers";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  addLocalSpeaker,
  getLocalSpeakers,
  removeLocalSpeaker,
  seedSpeakers,
} from "@/lib/storage";
import type { AdminSpeakerInput, Speaker } from "@/lib/types";

export async function fetchSpeakers(): Promise<Speaker[]> {
  if (typeof window === "undefined") return seedSpeakers;

  if (!isSupabaseConfigured()) {
    return getLocalSpeakers();
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("speakers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapSpeakerRow);
}

export async function createSpeaker(input: AdminSpeakerInput): Promise<Speaker> {
  if (!isSupabaseConfigured()) {
    return addLocalSpeaker(input);
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("speakers")
    .insert(speakerToDb(input))
    .select("*")
    .single();

  if (error) throw error;
  return mapSpeakerRow(data);
}

export async function deleteSpeaker(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    removeLocalSpeaker(id);
    return;
  }

  const supabase = createClient();
  const { error } = await supabase.from("speakers").delete().eq("id", id);
  if (error) throw error;
}

export function subscribeToSpeakers(onChange: () => void): (() => void) | undefined {
  if (!isSupabaseConfigured()) return undefined;

  const supabase = createClient();
  const channel = supabase
    .channel("speakers-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "speakers" },
      () => onChange()
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
