"use client";

import { motion } from "framer-motion";
import { Globe, Mic2 } from "lucide-react";
import { getInitials } from "@/lib/data/mappers";
import type { Speaker } from "@/lib/types";

interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
}

export default function SpeakerCard({ speaker, index }: SpeakerCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group glass relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:border-cyan-500/25 hover:shadow-glow"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

      <div className="relative flex items-start gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-blue-600/10">
          {speaker.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={speaker.photoUrl} alt={speaker.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs font-semibold text-cyan-300">
              {getInitials(speaker.name)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-white">{speaker.name}</h3>
            <span className="flex shrink-0 items-center gap-0.5 rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400">
              <Globe className="h-2.5 w-2.5" />
              {speaker.country}
            </span>
            {speaker.status === "upcoming" && (
              <span className="shrink-0 rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-300">
                Upcoming
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-sm text-slate-400">
            {speaker.role} at {speaker.company}
          </p>
          <div className="mt-3 flex items-start gap-2">
            <Mic2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
            <p className="line-clamp-2 text-sm leading-relaxed text-slate-300">{speaker.topic}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
