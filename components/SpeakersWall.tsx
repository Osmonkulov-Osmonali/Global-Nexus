"use client";

import { motion } from "framer-motion";
import { CalendarClock, Users } from "lucide-react";
import SpeakerCard from "./SpeakerCard";
import type { Speaker } from "@/lib/types";

interface SpeakersWallProps {
  speakers: Speaker[];
}

export default function SpeakersWall({ speakers }: SpeakersWallProps) {
  const featured = speakers.filter((s) => s.status !== "upcoming");
  const upcoming = speakers.filter((s) => s.status === "upcoming");

  return (
    <section id="nexus-wall" className="relative px-6 py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 text-sm text-violet-400">
            <Users className="h-4 w-4" />
            The Nexus Wall
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Featured Global Leaders
          </h2>
          <p className="mt-3 text-slate-400">
            {featured.length} sessions recorded — building toward 1,000
          </p>
        </motion.div>

        {featured.length === 0 ? (
          <p className="text-center text-slate-500">No speakers yet. Add the first one in admin.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((speaker, index) => (
              <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
            ))}
          </div>
        )}

        {upcoming.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-24 mb-14 text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 text-sm text-amber-400">
                <CalendarClock className="h-4 w-4" />
                Coming Soon
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Upcoming Speakers
              </h2>
              <p className="mt-3 text-slate-400">
                Confirmed guests whose sessions are currently in preparation
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((speaker, index) => (
                <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
