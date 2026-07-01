import { eventToDb, mapEventRow } from "@/lib/data/mappers";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { addLocalEvent, getLocalEvents, removeLocalEvent } from "@/lib/storage";
import type { AdminEventInput, EventItem } from "@/lib/types";

export async function fetchEvents(): Promise<EventItem[]> {
  if (typeof window === "undefined") return [];

  if (!isSupabaseConfigured()) {
    return getLocalEvents();
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapEventRow);
}

export async function createEvent(input: AdminEventInput): Promise<EventItem> {
  if (!isSupabaseConfigured()) {
    return addLocalEvent(input);
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("events")
    .insert(eventToDb(input))
    .select("*")
    .single();

  if (error) throw error;
  return mapEventRow(data);
}

export async function deleteEvent(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    removeLocalEvent(id);
    return;
  }

  const supabase = createClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}

export function subscribeToEvents(onChange: () => void): (() => void) | undefined {
  if (!isSupabaseConfigured()) return undefined;

  const supabase = createClient();
  const channel = supabase
    .channel("events-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "events" },
      () => onChange()
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
