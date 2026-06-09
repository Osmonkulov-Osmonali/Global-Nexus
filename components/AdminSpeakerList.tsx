"use client";

import { Trash2 } from "lucide-react";
import { getInitials } from "@/lib/data/mappers";
import type { Speaker } from "@/lib/types";

interface AdminSpeakerListProps {
  speakers: Speaker[];
  onRemove: (id: string) => Promise<void>;
}

export default function AdminSpeakerList({ speakers, onRemove }: AdminSpeakerListProps) {
  if (speakers.length === 0) {
    return <div className="glass rounded-2xl p-6 text-center text-slate-500">No speakers yet</div>;
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">Speakers ({speakers.length})</h2>
      <ul className="divide-y divide-white/5">
        {speakers.map((speaker) => (
          <li key={speaker.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-cyan-500/15 font-mono text-xs text-cyan-300">
              {speaker.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={speaker.photoUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                getInitials(speaker.name)
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">
                {speaker.name}{" "}
                <span className="text-slate-500">({speaker.country})</span>
              </p>
              <p className="truncate text-sm text-slate-500">
                {speaker.role} · {speaker.company} · {speaker.topic}
              </p>
            </div>
            <button
              onClick={() => onRemove(speaker.id)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
              aria-label={`Remove ${speaker.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
