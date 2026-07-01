"use client";

import { Calendar, MapPin, Trash2 } from "lucide-react";
import type { EventItem } from "@/lib/types";

interface AdminEventListProps {
  events: EventItem[];
  onRemove: (id: string) => Promise<void>;
}

export default function AdminEventList({ events, onRemove }: AdminEventListProps) {
  if (events.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 text-center text-slate-500">
        No events yet
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">Events ({events.length})</h2>
      <ul className="divide-y divide-white/5">
        {events.map((event) => (
          <li key={event.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white">{event.title}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {event.date || "—"}
                </span>
                {event.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.location}
                  </span>
                )}
                <span className="capitalize">{event.format}</span>
              </p>
              {event.description && (
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">{event.description}</p>
              )}
            </div>
            <button
              onClick={() => onRemove(event.id)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
              aria-label={`Remove event ${event.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
