"use client";

import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import SpeakersWall from "@/components/SpeakersWall";
import SupportSection from "@/components/SupportSection";
import { useSpeakers } from "@/contexts/SpeakersContext";

export default function HomePage() {
  const { speakers, events, count, isLoaded } = useSpeakers();

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <HeroSection count={count} isLoaded={isLoaded} />
        <AboutSection />
        <SpeakersWall speakers={speakers} />
        <EventsSection events={events} />
        <SupportSection />
        <footer className="border-t border-white/5 px-6 py-10 text-center text-sm text-slate-600">
          © 2026 Global Nexus. An independent media initiative featuring 1,000 global
          leaders in IT and business. All rights reserved.
        </footer>
      </main>
    </>
  );
}
