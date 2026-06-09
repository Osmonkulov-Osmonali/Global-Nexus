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
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { STORAGE_KEY } from "@/lib/storage";
import type {
  AdminSpeakerInput,
  Speaker,
  SpeakerApplication,
  SpeakerApplicationInput,
} from "@/lib/types";

interface SpeakersContextValue {
  speakers: Speaker[];
  applications: SpeakerApplication[];
  count: number;
  isLoaded: boolean;
  usesSupabase: boolean;
  addSpeaker: (input: AdminSpeakerInput) => Promise<Speaker>;
  removeSpeaker: (id: string) => Promise<void>;
  submitSpeakerApplication: (input: SpeakerApplicationInput) => Promise<SpeakerApplication>;
  removeApplication: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const SpeakersContext = createContext<SpeakersContextValue | null>(null);

export function SpeakersProvider({ children }: { children: ReactNode }) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [applications, setApplications] = useState<SpeakerApplication[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const usesSupabase = isSupabaseConfigured();

  const refresh = useCallback(async () => {
    const [nextSpeakers, nextApplications] = await Promise.all([
      fetchSpeakers(),
      fetchApplications(),
    ]);
    setSpeakers(nextSpeakers);
    setApplications(nextApplications);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const unsubscribeSpeakers = subscribeToSpeakers(() => {
      fetchSpeakers().then(setSpeakers);
    });
    const unsubscribeApplications = subscribeToApplications(() => {
      fetchApplications().then(setApplications);
    });

    return () => {
      unsubscribeSpeakers?.();
      unsubscribeApplications?.();
    };
  }, []);

  useEffect(() => {
    if (usesSupabase) return;

    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === STORAGE_KEY) {
        fetchSpeakers().then(setSpeakers);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [usesSupabase]);

  const addSpeaker = useCallback(async (input: AdminSpeakerInput) => {
    const speaker = await createSpeaker(input);
    if (!usesSupabase) {
      setSpeakers(await fetchSpeakers());
    }
    return speaker;
  }, [usesSupabase]);

  const removeSpeaker = useCallback(async (id: string) => {
    await deleteSpeaker(id);
    if (!usesSupabase) {
      setSpeakers(await fetchSpeakers());
    }
  }, [usesSupabase]);

  const submitSpeakerApplication = useCallback(async (input: SpeakerApplicationInput) => {
    const application = await submitApplication(input);
    if (!usesSupabase) {
      setApplications(await fetchApplications());
    }
    return application;
  }, [usesSupabase]);

  const removeApplication = useCallback(async (id: string) => {
    await deleteApplication(id);
    if (!usesSupabase) {
      setApplications(await fetchApplications());
    }
  }, [usesSupabase]);

  return (
    <SpeakersContext.Provider
      value={{
        speakers,
        applications,
        count: speakers.length,
        isLoaded,
        usesSupabase,
        addSpeaker,
        removeSpeaker,
        submitSpeakerApplication,
        removeApplication,
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
