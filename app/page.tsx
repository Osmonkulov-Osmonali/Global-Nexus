"use client";

import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import SpeakersWall from "@/components/SpeakersWall";
import { useSpeakers } from "@/contexts/SpeakersContext";

export default function HomePage() {
  const { speakers, count, isLoaded } = useSpeakers();

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <HeroSection count={count} isLoaded={isLoaded} />
        <SpeakersWall speakers={speakers} />
        <footer className="border-t border-white/5 px-6 py-10 text-center text-sm text-slate-600">
          © 2025 Global Nexus — A media challenge for the next generation of leaders.
        </footer>
      </main>
    </>
  );
}
