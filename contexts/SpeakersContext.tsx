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
  addSpeaker as addSpeakerToStorage,
  getSpeakers,
  removeSpeaker as removeSpeakerFromStorage,
  STORAGE_KEY,
} from "@/lib/storage";
import type { AdminSpeakerInput, Speaker } from "@/lib/types";

interface SpeakersContextValue {
  speakers: Speaker[];
  count: number;
  isLoaded: boolean;
  addSpeaker: (input: AdminSpeakerInput) => Speaker;
  removeSpeaker: (id: string) => void;
  refresh: () => void;
}

const SpeakersContext = createContext<SpeakersContextValue | null>(null);

export function SpeakersProvider({ children }: { children: ReactNode }) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const refresh = useCallback(() => {
    setSpeakers(getSpeakers());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === STORAGE_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refresh]);

  const addSpeaker = useCallback((input: AdminSpeakerInput) => {
    const speaker = addSpeakerToStorage(input);
    setSpeakers(getSpeakers());
    return speaker;
  }, []);

  const removeSpeaker = useCallback((id: string) => {
    removeSpeakerFromStorage(id);
    setSpeakers(getSpeakers());
  }, []);

  return (
    <SpeakersContext.Provider
      value={{ speakers, count: speakers.length, isLoaded, addSpeaker, removeSpeaker, refresh }}
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
