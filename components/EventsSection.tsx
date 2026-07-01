"use client";

import { motion } from "framer-motion";
import { Calendar, ExternalLink, MapPin, MonitorPlay } from "lucide-react";
import type { EventItem } from "@/lib/types";

interface EventsSectionProps {
  events: EventItem[];
}

const formatLabels: Record<EventItem["format"], string> = {
  online: "Online",
  offline: "In person",
  hybrid: "Hybrid",
};

export default function EventsSection({ events }: EventsSectionProps) {
  if (events.length === 0) return null;

  return (
    <section id="events" className="relative px-6 py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 text-sm text-blue-400">
            <Calendar className="h-4 w-4" />
            Official Events
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Upcoming Events
          </h2>
          <p className="mt-3 text-slate-400">
            Live sessions, panels, and meetups organized as part of the initiative.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
              className="glass flex flex-col rounded-2xl p-6 transition-colors hover:border-blue-500/25"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-300">
                  <MonitorPlay className="h-3 w-3" />
                  {formatLabels[event.format]}
                </span>
                {event.date && (
                  <span className="text-xs text-slate-500">{event.date}</span>
                )}
              </div>

              <h3 className="text-base font-semibold text-white">{event.title}</h3>
              {event.description && (
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
                  {event.description}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                {event.location ? (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </span>
                ) : (
                  <span />
                )}
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 transition hover:text-blue-300"
                  >
                    Details
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
