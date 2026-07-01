"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  createSpeaker,
  deleteSpeaker,
  fetchSpeakers,
  subscribeToSpeakers,
} from "@/lib/data/speakers";
import {
  deleteApplication,
  fetchApplications,
  submitApplication,
  subscribeToApplications,
} from "@/lib/data/applications";
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  subscribeToEvents,
} from "@/lib/data/events";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { STORAGE_KEY } from "@/lib/storage";
import type {
  AdminEventInput,
  AdminSpeakerInput,
  EventItem,
  Speaker,
  SpeakerApplication,
  SpeakerApplicationInput,
} from "@/lib/types";

interface SpeakersContextValue {
  speakers: Speaker[];
  applications: SpeakerApplication[];
  events: EventItem[];
  count: number;
  isLoaded: boolean;
  usesSupabase: boolean;
  addSpeaker: (input: AdminSpeakerInput) => Promise<Speaker>;
  removeSpeaker: (id: string) => Promise<void>;
  submitSpeakerApplication: (input: SpeakerApplicationInput) => Promise<SpeakerApplication>;
  removeApplication: (id: string) => Promise<void>;
  addEvent: (input: AdminEventInput) => Promise<EventItem>;
  removeEvent: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const SpeakersContext = createContext<SpeakersContextValue | null>(null);

export function SpeakersProvider({ children }: { children: ReactNode }) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [applications, setApplications] = useState<SpeakerApplication[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const usesSupabase = isSupabaseConfigured();

  const refresh = useCallback(async () => {
    const [nextSpeakers, nextApplications, nextEvents] = await Promise.all([
      fetchSpeakers().catch(() => [] as Speaker[]),
      fetchApplications().catch(() => [] as SpeakerApplication[]),
      fetchEvents().catch(() => [] as EventItem[]),
    ]);
    setSpeakers(nextSpeakers);
    setApplications(nextApplications);
    setEvents(nextEvents);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const unsubscribeSpeakers = subscribeToSpeakers(() => {
      fetchSpeakers().then(setSpeakers).catch(() => {});
    });
    const unsubscribeApplications = subscribeToApplications(() => {
      fetchApplications().then(setApplications).catch(() => {});
    });
    const unsubscribeEvents = subscribeToEvents(() => {
      fetchEvents().then(setEvents).catch(() => {});
    });

    return () => {
      unsubscribeSpeakers?.();
      unsubscribeApplications?.();
      unsubscribeEvents?.();
    };
  }, []);

  useEffect(() => {
    if (usesSupabase) return;

    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === STORAGE_KEY) {
        fetchSpeakers().then(setSpeakers).catch(() => {});
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [usesSupabase]);

  const addSpeaker = useCallback(async (input: AdminSpeakerInput) => {
    const speaker = await createSpeaker(input);
    setSpeakers(await fetchSpeakers());
    return speaker;
  }, []);

  const removeSpeaker = useCallback(async (id: string) => {
    await deleteSpeaker(id);
    setSpeakers(await fetchSpeakers());
  }, []);

  const submitSpeakerApplication = useCallback(async (input: SpeakerApplicationInput) => {
    const application = await submitApplication(input);
    if (!usesSupabase) {
      setApplications(await fetchApplications());
    }
    return application;
  }, [usesSupabase]);

  const removeApplication = useCallback(async (id: string) => {
    await deleteApplication(id);
    setApplications(await fetchApplications());
  }, []);

  const addEvent = useCallback(async (input: AdminEventInput) => {
    const event = await createEvent(input);
    setEvents(await fetchEvents());
    return event;
  }, []);

  const removeEvent = useCallback(async (id: string) => {
    await deleteEvent(id);
    setEvents(await fetchEvents());
  }, []);

  return (
    <SpeakersContext.Provider
      value={{
        speakers,
        applications,
        events,
        count: speakers.filter((s) => s.status !== "upcoming").length,
        isLoaded,
        usesSupabase,
        addSpeaker,
        removeSpeaker,
        submitSpeakerApplication,
        removeApplication,
        addEvent,
        removeEvent,
        refresh,
      }}
    >
      {children}
    </SpeakersContext.Provider>
  );
}

export function useSpeakers() {
  const ctx = useContext(SpeakersContext);
  if (!ctx) throw new Error("useSpeakers must be used within SpeakersProvider");
  return ctx;
}
